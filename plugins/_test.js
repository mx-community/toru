import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let isAlan = /--alan|alan$/i.test(text || args[0])
let isFede = /--fede|fede$/i.test(text || args[0])

let ch, imagen, xd
if (!args[0] || (isAlan && !text.replace(/--alan|alan$/i, '').trim()) || (isFede && !text.replace(/--fede|fede$/i, '').trim())) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para el canal.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola, Anuncios, Para saber, Imagen(url)` }, { quoted: m })
}

ch = `120363424098891946@newsletter`

if (isAlan) {
xd = `${text}`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/a6tqz7.jpg`)).arrayBuffer())
await conn.sendMessage(ch, { text: xd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "@Farguts/", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
} else if (isFede) {
xd = `${text}`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/6iz72o.jpg`)).arrayBuffer())
await conn.sendMessage(ch, { text: xd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "@Fedevs_", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
} else {
xd = `${text}`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/se54kc.jpg`)).arrayBuffer())
await conn.sendMessage(ch, { text: xd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Hola!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
}
await conn.reply(m.chat, `Success`, m)
}
handler.command = ["notch"]
handler.owner = true
export default handler
 
 
