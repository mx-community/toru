import fetch from 'node-fetch'
const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una busqueda en Spotify.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Golden Brown` }, { quoted: m })
try {
await m.react("⏰")
const res = await fetch(`https://api.delirius.store/search/spotify?q=${text}&limit=10`)
const json = await res.json()
const toru = json.data
if (!toru || toru.length < 2) return conn.sendMessage(m.chat, { text: `No se han encontrado resultados en Spotify.` }, { quoted: m })
const maxItems = Math.min(toru.length, 10)

let mensaje = `· ┄ · ⊸ 𔓕 *Spotify  :  Search*\n\n\t＃ *Busqueda* : ${text}\n\t＃ *Resultados* : *${maxItems}* results\n\t＃ *Fuente* : Spotify \n\n\n`

let listado = toru.map(t => {
return `⧡ *ID* : ${t.id}
⧡ *Titulo* : ${t.title}
⧡ *Duracion* : ${t.duration}
⧡ *Enlace* : ${t.url}`
}).join('\n\n\n')
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/suuskr.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: mensaje + listado, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⧿ Spotify : Search ⧿", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react("✅")
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ['spys', 'spotifys']
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
  
