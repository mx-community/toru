import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (command === "tiktok" || command === "tt") {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de TikTok.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://vm.tiktok.com/xxxx/` }, { quoted: m })
try {
let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
let match = m.text.match(regex)
if (!match) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })
let url = match[0]
let api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}?hd=1`
let res = await fetch(api)
let json = await res.json()
if (!json || json.code !== 0 || !json.data) return conn.sendMessage(m.chat, { text: `No se han encontrado resultados en el enlace.` }, { quoted: m })
const data = json.data
const { id, region, title, cover, origin_cover, duration, play, wmplay, music, music_info, play_count, digg_count, comment_count, share_count, download_count, author, images, create_time } = data
let titulott = `🎬  *TikTok.mp4*`
await m.react("⏰")
await conn.sendMessage(m.chat, { video: { url: play }, caption: titulott, gifPlayback: false, jpegThumbnail: Buffer.from(await (await fetch(cover)).arrayBuffer()) }, { quoted: m })
await m.react("✅")
} catch (err) {
console.error(err)
await conn.sendMessage(m.chat, { text: `${err.message}` }, { quoted: m })
}
}

if (command === "a-tt" || command === "a-tiktok") {
if (!text) return conn.reply(m.chat, `ᗢ Proporcione un enlace de TikTok.\n\n\t⚶ Por ejemplo:\n${usedPrefix + command} https://vm.tiktok.com/xxxx/`, m);
try {
conn.sendMessage(m.chat, { react: { text: "⏰", key: m.key } });
let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
let dp = await d2.json()
const doc = {
audio: { url: dp.results.audio },
mimetype: 'audio/mp4',
fileName: `ttbykeni.mp3`,
};
await conn.sendMessage(m.chat, doc, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch (err) {
await conn.sendMessage(m.chat, { text: `${err.message}` }, { quoted: m });
 
}
}

}

handler.command = ["tiktok", "tt", "a-tt", "a-tiktok"]
export default handler
 
