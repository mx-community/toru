
import axios from 'axios'
import crypto from 'crypto'
import { Buffer } from 'buffer'

const SECRET = "GAMESKINBOFFIDCHECKERSECURITYPROTOCOL"
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

async function generateToken(uid) {
const timestamp = Date.now()
const timeStep = Math.floor(timestamp / 30000).toString()

// HMAC-SHA256(Key=SECRET, Data=TimeStep)
const hmac1 = crypto.createHmac('sha256', SECRET)
hmac1.update(timeStep)
const derivedKeyHex = hmac1.digest('hex').substring(0, 32)

// Step 2: Sign the data
const dataToSign = `${uid}|${timestamp}`
const hmac2 = crypto.createHmac('sha256', derivedKeyHex)
hmac2.update(dataToSign)
const signature = hmac2.digest('hex')

// Step 3: Base64 Encode Combined String
const combined = `${uid}|${timestamp}|${signature}`
return Buffer.from(combined).toString('base64')
}

async function stalkFreeFire(uid) {
const client = axios.create({
baseURL: 'https://gameskinbo.com',
headers: {
'User-Agent': USER_AGENT,
'Referer': 'https://gameskinbo.com/free_fire_id_checker',
'Origin': 'https://gameskinbo.com',
'x-api-client': 'gameskinbo-web',
'Accept': 'application/json'
}
})

try {
// 1. Generate Token
const token = await generateToken(uid)

// 2. Make API Request
const url = `/api/ff_id_checker?uid=${uid}&token=${encodeURIComponent(token)}`
const response = await client.get(url)

if (response.data) {
return response.data
} else {
 throw new Error('La API no devolvió datos válidos.')
}

} catch (error) {
if (error.response) {
throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`)
} else {
throw new Error(error.message)
}
}
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una UID de FreeFire para buscar.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 12345678` }, { quoted: m })
await m.react('⏰')
try {
const data = await stalkFreeFire(args[0])

let txt = `· ┄ · ⊸ 𔓕 *Stalk  :  FreeFire*

\t⧡ *Nombre* : ${data.name || "undefined"}
\t⧡ *UID* : ${data.uid || args[0]}
\t⧡ *Region* : ${data.region || "undefined"}
\t⧡ *Nivel* : #${data.level || "undefined"} *(${data.likes || "?"} likes)*

\t⧡ *Creado* : ${data.created_at || "undefined"}
\t⧡ *Ultima conexión* : ${data.last_login || "undefined"}

\t⧡ *BR Rank:* : ${data.br_rank_point || "N/A"}
\t⧡ *CS Rank* : ${data.cs_rank_point || "N/A"}
\t⧡ *Guild* : ${data.guild_name || "N/A"}

> ${textbot}`

//await m.reply(txt.trim())
conn.sendMessage(m.chat, { text: txt, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true, title: `${data.name || botname}`, body: `${data.uid || textbot}`, containsAutoReply: true, mediaType: 1, thumbnailUrl: "https://files.catbox.moe/x9c1zz.jpg", sourceUrl: null }}}, { quoted: m })
await m.react('✅')
} catch (e) {
console.error(e)
await m.reply(`${e.message}`)
}
}
handler.command = ['ffstalk']

export default handler

