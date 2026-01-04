import axios from 'axios'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporciona una petición para buscarlo en Wikipedia.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Arbol` }, { quoted: m })
try {
await m.react("⏰");
const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
const $ = cheerio.load(link.data)
let wik = $('#firstHeading').text().trim()
let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
let respuesta = `· ┄ · ⊸ 𔓕 *Search  :  Wiki*

\t＃ *Tema* : ${text}

${resultw}`
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/4yn2vo.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: respuesta, mentions: [m.sender], contextInfo: { externalAdReply: { title: "Wiki : Search", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react("✅")
} catch (e) {
conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
}
handler.command = ['wiki', 'wikipedia'] 

export default handler
