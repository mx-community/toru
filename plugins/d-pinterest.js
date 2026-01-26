import axios from 'axios'

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!global.db.data.chats[m.chat].fDescargas && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ descargas ]* estan desactivados...` }, { quoted: m })
}
 
 let pinterestRegex = /^(https?:\/\/)?([a-z]{2}\.)?pinterest\.(com|[a-z]{2,3})(\/pin\/\d+\/?).*$/i;
let pinItRegex = /^(https?:\/\/)?(www\.)?pin\.it\/[a-zA-Z0-9]+\/?$/i;
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de Pinterest.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://pin.it/xxxx` }, { quoted: m })
}
if (!pinterestRegex.test(args[0]) && !pinItRegex.test(args[0])) {
return conn.sendMessage(m.chat, { text: `El enlace no es valido.` }, { quoted: m })
}
try {
let res = await fetch(`https://api-hasumi.vercel.app/api/downloader/pindl?url=${args[0]}`)
let json = await res.json()
let { titulo, descripcion, imagen, videoUrl, creado, guardados } = json.data
let txt = `· ┄ · ⊸ 𔓕 *Pinterest  :  Download*

\t＃ *Titulo* : ${titulo}
\t＃ *Publicado* : ${creado}
\t＃ *Guardados* : ${guardados}
\t＃ *Fuente* : Pinterest

${descripcion}

> ${textbot}`
if (videoUrl) {
await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: 'video/mp4', fileName: `${titulo}.mp4`, caption: txt, contextInfo: { externalAdReply: { showAdAttribution: true, title: titulo, body: '', thumbnailUrl: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (imagen) {
await conn.sendMessage(m.chat, { image: { url: imagen }, caption: txt }, { quoted: m })
}} catch (error) {
console.error(error)
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ['pin', 'pinterest']
export default handler


 
