import yts from 'yt-search'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una busqueda en YouTube.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* So Will i 100 Billion x` }, { quoted: m })
await m.react("⏰")
  let results = await yts(text)
let tes = results.videos
let teks = `· ┄ · ⊸ 𔓕 *YouTube  :  Search*\n\n\t＃ Busqueda : *${text}*\n\n`
teks += tes.map(v => `⧡ *Titulo* : ${v.title}
⧡ *Duracion* : ${v.timestamp} (${v.ago}.ago)
⧡ *Vistas* : ${v.views.toLocaleString()}
⧡ *Enlace* : ${v.url}`.trim()).join('\n\n\n')
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/d9picr.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: teks, mentions: [m.sender], contextInfo: { externalAdReply: { title: "YouTube : Search", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react("✅")
}
handler.command = ['youtube', 'yts'] 

export default handler
