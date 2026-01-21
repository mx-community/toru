import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ rpg ]* estan desactivados...` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
 const thumbNo = Buffer.from(await (await fetch(`https://files.catbox.moe/8f71ne.jpg`)).arrayBuffer())
 
if (user.torullave >= 1) {
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/gpnejy.jpg`)).arrayBuffer())
let monedas, experiencia, velas, piesas, boletoss, fragmentos, puntoss
monedas = Math.floor(Math.random() * 30) 
experiencia = Math.floor(Math.random() * 30) 
puntoss = Math.floor(Math.random() * 30) 
fragmentos = Math.floor(Math.random() * 30) 
velas = Math.floor(Math.random() * 5)  
piesas = Math.floor(Math.random() * 5) 
boletoss = Math.floor(Math.random() * 5) 
user.torucoin += monedas
user.toruexp += experiencia
user.toruvela += velas
user.tawbot += fragmentos 
user.puntos += puntoss
user.torupiesa += piesas
user.boletos += boletoss
let cofreXd = `\t〩  C O F R E  :  R P G
> ¡Abriste un cofre, reclama tu recompensa!

⚶ *Balance:*
\t${toem} ${currency} : *+${monedas.toLocaleString()}*
\t${toem2} ${currency2} : *+${experiencia.toLocaleString()}*

⚶ *Necesario:*
\t💠 Fragmentos : *+${fragmentos.toLocaleString()}*
\t🌀 Puntos : *+${puntoss.toLocaleString()}*

⚶ *Recursos:*
\t🕯️ Velas : *+${velas.toLocaleString()}*
\t🧩 Piesas : *+${piesas.toLocaleString()}*
\t🧧 Boletos : *+${boletoss.toLocaleString()}*

> 🗝️ _Abre otro cofre si tienes una llave mas._`
conn.sendMessage(m.chat, { text: cofreXd }, { quoted: m })
//conn.sendMessage(m.chat, { text: cofreXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  C O F R E  々", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.torullave -= 1
} else {
let noXd = `No tienes suficientes *[ 🗝️ Llaves ]* para abrir un cofre.\n- Tienes 🗝️ *${user.torullave.toLocaleString()} llaves* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
await m.react("📍")
//conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "🗝️ Sin llaves para abrir", body: botname, thumbnail: thumbNo, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 }
}

handler.command = ['coffer', 'cofre']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
