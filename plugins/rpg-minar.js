import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let monedas, experiencia, fragmentos, puntoss
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/bt96yl.jpg`)).arrayBuffer())
let user = global.db.data.users[m.sender]
const cooldown = 2 * 60 * 1000
user.lastmining = user.lastmining || 0

if (Date.now() < user.lastmining) {
const tiempoRestante = formatTime(user.lastmining - Date.now())
return conn.sendMessage(m.chat, { text: `Debes esperar *${tiempoRestante}* para volver a usar el comando.` }, { quoted: m })
}
monedas = Math.floor(Math.random() * 10) 
experiencia = Math.floor(Math.random() * 5) 
fragmentos = Math.floor(Math.random() * 35) 
puntoss = Math.floor(Math.random() * 35) 
user.lastmining = Date.now() + cooldown
user.torucoin += monedas
user.toruexp += experiencia
user.tawbot += fragmentos
user.puntos += puntoss
let minResultado = `\t〩  *M I N I N G  :  R P G*
- *${pickRandom(mineral)}*

\t𔓕 ${currency} : *+${monedas.toLocaleString()}*
\t✩ ${currency2} : *+${experiencia.toLocaleString()}*
\t💠 Fragmentos : *+${fragmentos.toLocaleString()}*
\t🌀 Puntos : *+${puntoss.toLocaleString()}*

> ${textbot}`
await conn.sendMessage(m.chat, { text: minResultado, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  P E S C A R  々", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.command = ['mining', 'minar']
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
const mineral = [
"Has minado en una cueva profunda con muchas cosas.",
"Minaste en un lugar donde es posible encontrar varias cosas.",
"Has minado en una cueva con varias ventajas.",
"Minaste todo el dia en la cueva profunda."
]
  
