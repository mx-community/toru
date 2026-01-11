import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingresa un texto para el canal.` }, { quoted: m })
let imagen, ch
let xd = `${text}`
ch = `120363424098891946@newsletter`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/se54kc.jpg`)).arrayBuffer())
await conn.sendMessage(ch, { text: xd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Hola!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
await conn.reply(m.chat, `Success`, m)
}
handler.command = ["notch"]
export default handler
 
 
