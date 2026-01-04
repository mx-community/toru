import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `? Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let monedas, experiencia, pescado
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/j46q1b.jpg`)).arrayBuffer())
let user = global.db.data.users[m.sender]
const cooldown = 2 * 60 * 1000
user.lastfish = user.lastfish || 0

if (Date.now() < user.lastfish) {
const tiempoRestante = formatTime(user.lastfish - Date.now())
return conn.sendMessage(m.chat, { text: `Debes esperar *${tiempoRestante}* para volver a usar el comando.` }, { quoted: m })
}
monedas = Math.floor(Math.random() * 10) 
experiencia = Math.floor(Math.random() * 5) 
pescado = Math.floor(Math.random() * 3) 
user.lastfish = Date.now() + cooldown
user.torucoin += monedas
user.toruexp += experiencia
user.torupesc += pescado
let fishResultado = `\t©H  *F I S H I N G  :  R P G*
- *${pickRandom(pesca)}*

\t? ? ${currency} : *+${monedas.toLocaleString()}*
\t? ? ${currency2} : *+${experiencia.toLocaleString()}*
\t? ? Pescado *+${pescado.toLocaleString()}*

> ${textbot}`
await conn.sendMessage(m.chat, { text: fishResultado, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡©  P E S C A R  ¡©", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.command = ['pescar', 'fish']
handler.group = true

export default handler

function formatTime(ms) {
const totalSec = Math.ceil(ms / 1000)
const minutes = Math.floor((totalSec % 3600) / 60)
const seconds = totalSec % 60
const parts = []
if (minutes > 0) parts.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`)
parts.push(`${seconds} segundo${seconds !== 1 ? 's' : ''}`)
return parts.join(' ')
}
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}
const pesca = [
"Has pescado todo el dia y obtienes:",
"Has pescado desdel medio dia y obtienes de regreso:",
"Te fuiste a pescar y volviste a casa obteniendo:",
"Dia caluroso pero has pescado y obtienes:",
"Te fuiste a pescar y obtienes:"
]
