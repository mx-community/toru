import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ rpg ]* estan desactivados...` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
 const thumbNo = Buffer.from(await (await fetch(`https://files.catbox.moe/e9h7b2.jpg`)).arrayBuffer())
 
if (user.toruregal >= 1) {
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/vj49qn.jpg`)).arrayBuffer())
let monedas, experiencia, corazones, velas, piesas, boletoss, fragmentos, puntoss
monedas = Math.floor(Math.random() * 60) 
experiencia = Math.floor(Math.random() * 60) 
puntoss = Math.floor(Math.random() * 80) 
fragmentos = Math.floor(Math.random() * 80) 
corazones = Math.floor(Math.random() * 15) 
velas = Math.floor(Math.random() * 15)  
piesas = Math.floor(Math.random() * 15) 
boletoss = Math.floor(Math.random() * 15) 
user.torucoin += monedas
user.toruexp += experiencia
user.torucora += corazones
user.toruvela += velas
user.tawbot += fragmentos 
user.puntos += puntoss
user.torupiesa += piesas
user.boletos += boletoss
user.torullave += 3
let cofreXd = `\t〩  *R E G A L O  :  R P G*
> ¡Abriste un cofre, reclama tu recompensa!

⚶ *Balance:*
\t${toem} ${currency} : *+${monedas.toLocaleString()}*
\t${toem2} ${currency2} : *+${experiencia.toLocaleString()}*

⚶ *Necesario:*
\t💠 Fragmentos : *+${fragmentos.toLocaleString()}*
\t🌀 Puntos : *+${puntoss.toLocaleString()}*

⚶ *Recursos:*
\t❤️ Corazones : *+${corazones.toLocaleString()}*
\t🕯️ Velas : *+${velas.toLocaleString()}*
\t🧩 Piesas : *+${piesas.toLocaleString()}*
\t🧧 Boletos : *+${boletoss.toLocaleString()}*
\t🗝️ Llaves : *+3*

> 🎁 _Consigue mas regalos para mas recompensas._`
conn.sendMessage(m.chat, { text: cofreXd }, { quoted: m })
//conn.sendMessage(m.chat, { text: cofreXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  R E G A L O  々", body: "¡Abriste un regalo!", thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.toruregal -= 1
} else {
let noXd = `No tienes *[ 🎁 Regalos ]* para abrir.\n- Puedes comprar en la tienda usando *${usedPrefix}shop*.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
//conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "🎁 Sin regalos para abrir", body: botname, thumbnail: thumbNo, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 }
}

handler.command = ['regalo', 'caja']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
   }
  
