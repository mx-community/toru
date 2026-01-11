export axios from 'axios'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) return conn.sendMessage(m.chat, { text: `ᗢ Responda a un video para convertirlo en gif.` }, { quoted: m })
await react("⏰")
try {
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.sendMessage(m.chat, { text: `Solo puedes responder videos.` }, { quoted: m })
let media = await q.download()
const res = await global.sendOptishield({ type: media, text: null})
conn.sendMessage(m.chat, { video: res.result.url, gifPlayback: true, caption: null }, { quoted: m })
await m.react("✅")
} catch (error) {
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}
}
handler.command = ['vgif']
export default handler
                 
