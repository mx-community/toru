import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

const fotoEx = Buffer.from(await (await fetch(`https://files.catbox.moe/1pajnq.jpg`)).arrayBuffer())
let user = global.db.data.users[m.sender]
if (user.torupesc >= 10) {

const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/7l8152.jpg`)).arrayBuffer())

user.torucoin = user.torucoin || 0
user.toruexp = user.toruexp || 0
user.torucora = user.torucora || 0
user.toruvela = user.toruvela || 0
user.boletos = user.torucora || 0
user.torullave = user.torullave || 0

let ganado = Math.floor(Math.random() * 60) 
let ganado2 = Math.floor(Math.random() * 55) 
let ganado3 = Math.floor(Math.random() * 15) 
let ganado4 = Math.floor(Math.random() * 15) 
let ganado5 = Math.floor(Math.random() * 15) 
//let ganado6 = Math.floor(Math.random() * 2) 
user.torucoin += ganado
user.toruexp += ganado2
user.torucora += ganado3
user.toruvela += ganado4
user.boletos += ganado5
user.torullave += 2

let respuesta = `\t〩  *M E R C A D E R : R P G*
- ¡Gracias por los 10 pescados! Toma tu recompensa.

⚶ *Balance:*
\t𔓕 ${currency} : *+${ganado.toLocaleString()}*
\t✩ ${currency2} : *+${ganado2.toLocaleString()}*

⚶ *Recursos:*
\t❤️ Corazones : *+${ganado3.toLocaleString()}*
\t🕯️ Velas : *+${ganado4.toLocaleString()}*
\t🧧 Boletos : *+${ganado5.toLocaleString()}*
\t🗝️ Llaves : *+2*

> 🐟 _Consigue mas pescados para mas recompensas._`
 user.torupesc -= 10
await m.react("🐟")
await conn.sendMessage(m.chat, { text: respuesta, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々 P E S C A D E R O 々", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else {
let noXd = `Aun te falta pescados, solo tienes *[ 🐟 ${user.torupesc} pescados ]* en tu inventario.\n- Reune 🐟 *10 pescados* para mi y te doy la recompensa.`
return conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "El mercader pescadero.", body: "¡Tengo clientes que atender, reune 10 pescados y vuelve!", thumbnail: fotoEx, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 }
}

handler.command = ['mercader', 'pescadero']
handler.group = true

export default handler

function formatTime(totalSec) {
const h = Math.floor(totalSec / 3600)
const m = Math.floor((totalSec % 3600) / 60)
const s = totalSec % 60
const txt = []
if (h > 0) txt.push(`${h} hora${h !== 1 ? 's' : ''}`)
if (m > 0 || h > 0) txt.push(`${m} minuto${m !== 1 ? 's' : ''}`)
txt.push(`${s} segundo${s !== 1 ? 's' : ''}`)
return txt.join(' ')
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

