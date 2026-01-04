import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let user = global.db.data.users[m.sender]
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/oms7ij.jpg`)).arrayBuffer())
if (!user) return conn.sendMessage(m.chat, { text: `El usuario no esta en la base de datos.` }, { quoted: m })
if (user.health >= 100) return conn.sendMessage(m.chat, { text: `Tu salud esta al maximo, no es necesario curarse.` }, { quoted: m })
if (user.torupasti <= 0) return conn.sendMessage(m.chat, { text: `No tienes suficientes *[ 💊 Pastillas ]* para curarte.\nSolo tienes 💊 *${user.torupasti.toLocaleString()} pastillas* en tu inventario.` }, { quoted: m })
const faltante = 100 - user.health
const disponible = Math.floor(user.torupasti / 50)
const curable = Math.min(faltante, disponible)
user.health += curable
user.torupasti -= curable * 50
user.lastHeal = Date.now()
const info = `\t〩  H E A L T H  :  R P G
> *¡Te has curado con exito!*

\t⧡ Salud : *${user.health}%*
\t⧡ Puntos : *+${curable} punto${curable !== 1 ? 's' : ''}*
\t⧡ Pastillas : *${user.torupasti.toLocaleString()} restantes*

> ${textbot}`
await conn.sendMessage(m.chat, { text: info, mentions: [m.sender], contextInfo: { externalAdReply: { title: "々  H E A L T H  々", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.command = ['heal', 'curar']
handler.group = true

export default handler