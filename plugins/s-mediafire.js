import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una busqueda en Mediafire.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* One punch man` }, { quoted: m })
await m.react('⏰')
try {
let res = await fetch(`https://api.stellarwa.xyz/search/mediafire?query=${encodeURIComponent(text)}&key=this-xyz`)
let json = await res.json()
if (!json?.results?.length) {
return conn.sendMessage(m.chat, { text: `No se han encontrado resultados.` }, { quoted: m })
}
let txt = `· ┄ · ⊸ 𔓕 *Mediafire  :  Search*

\t＃ *Fuente* : Mediafire
\t＃ *Busqueda* : ${text}`.trim() + "\n\n"
json.results.forEach((f, i) => {
txt += `⧡ *${i + 1}* : ${f.filename || 'Undefined'}
⧡ *Tamaño* : ${f.filesize || 'Undefined'}
⧡ *Enlace* : ${f.url || 'Undefined'}\n\n`
})
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/293guw.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender], contextInfo: { externalAdReply: { title: "Mediafire : Search", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react("✅")
} catch (e) {
console.error(e)
conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
}

handler.command = ['fires', 'mfires']
export default handler

