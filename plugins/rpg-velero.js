import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
 const thumbNo = Buffer.from(await (await fetch(`https://files.catbox.moe/2cag9e.jpg`)).arrayBuffer())
 
if (user.toruvela >= 10) {
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/gy4sdx.jpg`)).arrayBuffer())
let monedas, experiencia, corazones, llaves, piesas, boletoss, fragmentos, puntoss
monedas = Math.floor(Math.random() * 30) 
experiencia = Math.floor(Math.random() * 30) 
puntoss = Math.floor(Math.random() * 30) 
fragmentos = Math.floor(Math.random() * 30) 
corazones = Math.floor(Math.random() * 5) 
llaves = Math.floor(Math.random() * 2)  
piesas = Math.floor(Math.random() * 5) 
boletoss = Math.floor(Math.random() * 5) 
user.torucoin += monedas
user.toruexp += experiencia
user.torucora += corazones
user.torullave += velas
user.tawbot += fragmentos 
user.puntos += puntoss
user.torupiesa += piesas
user.boletos += boletoss
let cofreXd = `\t〩  V E L E R O  :  R P G
> ¡Gracias por las 10 velas buen sujeto!

⚶ *Balance:*
\t💵 ${currency}  :  *+${monedas.toLocaleString()}*
\t🪙 ${currency2}  :  *+${experiencia.toLocaleString()}*

⚶ *Necesario:*
\t💠 Fragmentos : *+${fragmentos.toLocaleString()}*
\t🌀 Puntos : *+${puntoss.toLocaleString()}*

⚶ *Recursos:*
\t❤️ Corazones : *+${corazones.toLocaleString()}*
\t🗝️ Llaves : *+${llaves.toLocaleString()}*
\t🧩 Piesas : *+${piesas.toLocaleString()}*
\t🧧 Boletos : *+${boletoss.toLocaleString()}*

> 🕯️ _Consigue 10 velas mas para darte otra recompensa._`
await conn.sendMessage(m.chat, { text: cofreXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  V E L E R O  々", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.toruvela -= 10
} else {
let noXd = `No tienes suficientes *[ 🕯️ Velas ]* para venderlos al mercader.\n- Tienes 🕯️ *${user.toruvela.toLocaleString()} velas* en tu inventario.`
return await conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "🕯️ Velas insuficientes.", body: botname, thumbnail: thumbNo, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
// conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
 }
}

handler.command = ['velero', 'luminoso']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
