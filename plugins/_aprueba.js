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

let listado = toru.map(t => {
return `⧡ *ID* : ${t.id}
⧡ *Titulo* : ${t.title}
⧡ *Duracion* : ${t.duration}
⧡ *Enlace* : ${t.url}`
}).join('\n\n')
await conn.sendMessage(m.chat, { text: listado }, { quoted: m })
await m.react("✅")
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ['spys']
export default handler
