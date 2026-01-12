import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
const args = text.split(',').map(arg => arg.trim())

if (args.length < 4) {
let requisitos = `- Texto\n- Titulo\n- Descripción \n- Imagen *(url)*`
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione varios requisitos para mandar un mensaje al canal.\n\n> 📍 *Requisitos:*\n${requisitos}\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola, Anuncios, Para saber, Imagen(url)` }, { quoted: m })
}

const [texto, titulo, descripcion, img ] = args

if (!texto) return conn.sendMessage(m.chat, { text: `Texto faltante, escriba un texto principal.` }, { quoted: m })
if (!titulo) return conn.sendMessage(m.chat, { text: `Titulo faltante, escriba el titulo de mensaje referente.` }, { quoted: m })
if (!descripcion) return conn.sendMessage(m.chat, { text: `Descripcion faltante, escriba una descripción.` }, { quoted: m })
if (!img.startsWith('http')) return conn.sendMessage(m.chat, { text: `Imagen faltante, proporciona un enlace.` }, { quoted: m })
ch = `120363424098891946@newsletter`
let imagen = Buffer.from(await (await fetch(`${img}`)).arrayBuffer())
await conn.sendMessage(ch, { text: texto, mentions: [m.sender], contextInfo: { externalAdReply: { title: titulo, body: descripcion, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m)
await conn.reply(m.chat, `Success`, m)
}
handler.command = ["notch"]
handler.owner = true
export default handler
 
 
