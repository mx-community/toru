import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

const thumbNo = Buffer.from(await (await fetch(`https://files.catbox.moe/9rldx2.jpg`)).arrayBuffer())
let user = global.db.data.users[m.sender]
if (user.torupiesa >= 10) {

global.piesaImagen = [
"https://files.catbox.moe/hky7eb.jpg", "https://files.catbox.moe/v9ntjs.jpg", 
"https://files.catbox.moe/qj9hje.jpg", "https://files.catbox.moe/ucw1hj.jpg", 
"https://files.catbox.moe/v852yh.jpeg", "https://files.catbox.moe/wezfzz.jpg", 
"https://files.catbox.moe/bi7d3g.jpg"
].getRandom()

const thumb = Buffer.from(await (await fetch(`${global.piesaImagen}`)).arrayBuffer())

user.torucoin = user.torucoin || 0
user.toruexp = user.toruexp || 0
user.torucora = user.torucora || 0
user.toruvela = user.toruvela || 0
user.torullave = user.torullave || 0
user.boletos = user.boletos || 0
 
let ganado = Math.floor(Math.random() * 20) 
let ganado2 = Math.floor(Math.random() * 15) 
let ganado3 = Math.floor(Math.random() * 15) 
let ganado4 = Math.floor(Math.random() * 15) 
let ganado5 = Math.floor(Math.random() * 2) 
let ganado6 = Math.floor(Math.random() * 20) 
user.torucoin += ganado
user.toruexp += ganado2
user.torucora += ganado3
user.toruvela += ganado4
user.torullave += ganado5
user.boletos += ganado6

let piesaXd = `\t〩  *P I E S A  :  A R M A D O*
- ¡Has logrado reunir 10 piesas y revelar la imagen!

⚶ *Balance:*
\t𔓕 ${currency} : *+${ganado.toLocaleString()}*
\t✩ ${currency2} : *+${ganado2.toLocaleString()}*

⚶ *Recursos:*
\t❤️ Corazones : *+${ganado3.toLocaleString()}*
\t🕯️ Velas : *+${ganado4.toLocaleString()}*
\t🗝️ Llaves : *+${ganado5.toLocaleString()}*
\t🧧 Boletos : *+${ganado6.toLocaleString()}*

> 🧩 _Reune mas piesas para ganar mas recompensas._`
user.torupiesa -= 10
await m.react("🧩")
await conn.sendMessage(m.chat, { image: { url: thumb }, caption: piesaXd }, { quoted: m })
} else {
let noXd = `Solo tienes *[ 🧩 ${user.torupiesa} piesas ]* en tu inventario.\n- Reune *🧩 10 piesas* para revelar una imagen y obtener una recompensa.`
return conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "Piesas de recompensa.", body: "¡Tienes que reunir 10 piesas para ver la imagen!", thumbnail: thumbNo, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 }
}

handler.command = ['revelar', 'piesas']
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

