import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
let imagen, noXd
if (!user) return conn.sendMessage(m.chat, { text: `El usuario no se encuentra en la base de datos.` }, { quoted: m })
if (user.health >= 100) {
return conn.sendMessage(m.chat, { text: `Tu salud esta llena, vuelve cuando tu salud se reduzca.` }, { quoted: m })
//conn.sendMessage(m.chat, { text: `Tu salud esta llena`, mentions: [m.sender], contextInfo: { externalAdReply: { title: "❤️ ¡Salud llena!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

if (user.torucora <= 0) return conn.sendMessage(m.chat, { text: `No tienes suficientes *[ ❤️ Corazones ]* para curarte.\n- Solo tienes ❤️ *${user.torucora} Corazones* en tu inventario.` }, { quoted: m })
const faltante = 100 - user.health
const disponible = Math.floor(user.torucora / 50)
const curable = Math.min(faltante, disponible)
user.health += curable
user.torucora -= curable * 50
user.lastHeal = Date.now()
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/oms7ij.jpg`)).arrayBuffer())
const info = `Tu salud ahora es de *[ ❤️ ${user.health}% ]* de recuperación.\n- Consigue mas corazones por las dudas.`
await conn.sendMessage(m.chat, { text: info, mentions: [m.sender], contextInfo: { externalAdReply: { title: "❤️ ¡Sanado!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.command = ['heal', 'curar']
handler.group = true

export default handler
                                                                                                      
