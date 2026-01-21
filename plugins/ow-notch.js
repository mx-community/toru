import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
if (!global.db.data.chats[m.chat].fOwners && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ owners ]* estan desactivados...` }, { quoted: m })
}

let ch, imagen, xd
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para el canal.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola, este es un nuevo anuncio.` }, { quoted: m })
try {
await m.react("⏰")
ch = `120363424098891946@newsletter`
xd = `${text}`
imagen = Buffer.from(await (await fetch(`${global.toruCh}`)).arrayBuffer())
await conn.sendMessage(ch, { text: xd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Hola!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
await conn.reply(m.chat, `Success`, m)
await m.react("✅")
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
 }
}
handler.command = ["notch"]
handler.owner = true
export default handler
 