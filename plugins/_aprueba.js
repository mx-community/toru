import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione el nombre del usuario en YouTube para ver sus detalles.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Lol_Human` }, { quoted: m })
await m.react("⏰")
try {
let data = await fetch(`https://api.soymaycol.icu/youtubestalk?username=${text}&apikey=soymaycol%3C3`)
let toru = await data.json()

if (!toru?.status || !toru?.data) {
return conn.sendMessage(m.chat, { text: `📍  La API no obtuvo respuestas, intentalo en un minuto...` }, { quoted: m })
}

const toruc = toru.data.channel
let toruWa = `· ┄ · ⊸ 𔓕 *YouTube  :  Stalk*

${toruc.description}

\t＃ *Usuario* : ${toruc.username}
\t＃ *Suscriptores* : ${toruc.subscriberCount}
\t＃ *Videos* : ${toruc.videoCount}
\t＃ *Canal* : ${toruc.channelUrl}

> ${textbot}`

await conn.sendMessage(m.chat, { text: toruWa, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: botname, body: textbot, containsAutoReply: true, mediaType: 1, thumbnailUrl: toruc.avatarUrl, sourceUrl: toruc.channelUrl }}}, { quoted: m })
//conn.sendMessage(m.chat, { text: toruWa }, { quoted: m })
//conn.sendMessage(m.chat, { image: { url: toru.url }, caption: `${botname}\n> ${textbot}` }, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["stalk-yt"]
export default handler
  
    
