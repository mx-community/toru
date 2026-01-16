import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let monedas, experiencia, fragmentos, puntoss, imagen, noXd
let user = global.db.data.users[m.sender]
const cooldown = 2 * 60 * 1000
user.lasthunting = user.lasthunting || 0
user.health = user.health || 100

if (user.health < 10) {
//imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/ozwfwe.jpg`)).arrayBuffer())
return conn.sendMessage(m.chat, { text: `No tienes la salud suficiente para buscar madera.\n- Tu salud es de *[ ❤️ ${user.health}% ]*, usa *${usedPrefix}curar* para sanar.` }, { quoted: m })
//conn.sendMessage(m.chat, { text: `No tienes la salud suficiente para cazar.\n- Tu salud es de *[ ❤️ ${user.health}% ]*, usa *${usedPrefix}curar* para sanar.`, mentions: [m.sender], contextInfo: { externalAdReply: { title: "❤️ ¡Salud insuficiente!", body: "Tienes poca salud, curate primero.", thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

if (Date.now() < user.lasthunting) {
const tiempoRestante = formatTime(user.lasthunting - Date.now())
return conn.sendMessage(m.chat, { text: `Debes esperar *${tiempoRestante}* para volver a usar el comando.` }, { quoted: m })
}

if (user.toruesp >= 10) {
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/36pk4m.jpg`)).arrayBuffer())
monedas = Math.floor(Math.random() * 25) 
experiencia = Math.floor(Math.random() * 25) 
fragmentos = Math.floor(Math.random() * 35) 
puntoss = Math.floor(Math.random() * 35) 
user.lasthunting = Date.now() + cooldown
user.torucoin += monedas
user.toruexp += experiencia
user.tawbot += fragmentos
user.puntos += puntoss
let minResultado = `\t〩  *H U N T  :  R P G*
- *${pickRandom(caseria)}*

⚶ *Balance:*
\t💵 ${currency} : *+${monedas.toLocaleString()}*
\t🪙 ${currency2} : *+${experiencia.toLocaleString()}*

⚶ *Recursos:*
\t💠 Fragmentos : *+${fragmentos.toLocaleString()}*
\t🌀 Puntos : *+${puntoss.toLocaleString()}*

> ${textbot}`
await conn.sendMessage(m.chat, { text: minResultado, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  H U N T I N G  々", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.health -= 10
user.toruesp -= 10
} else {
//imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/bt96yl.jpg`)).arrayBuffer())
noXd = `Te falta un *[ 🗡️ Espada ]* para cazar.\n- Compra con *${usedPrefix}rpg* por *[ 🪙 50 ${currency2} ]* en total.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
//conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⛏️ ¡Pico faltante para minar!", body: "Compra un pico para poder minar.", thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}
}

handler.command = ['hunt', 'cazar']
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
const caseria = [
"Fuiste al bosque a cazar conejos para un encargado y obtienes.",
"Fuiste al bosque a cazar un oso y vendiste su carne.",
"Fuiste a cazar venados y los vendiste para obtener:",
"Fuiste a cazar para vender y obtienes:"
]

