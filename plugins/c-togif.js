var handler = async (m, {conn, usedPrefix, command}) => {

if (!m.quoted) return conn.sendMessage(m.chat, { text: `ᗢ Responda a un video para convertirlo en gif.` }, { quoted: m })
const q = m.quoted || m
const mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.sendMessage(m.chat, { text: `ᗢ Solo puedes responder videos.` }, { quoted: m })
await m.react("⏰")
const media = await q.download()
conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: ''}, {quoted: m})
await m.react("✅")
}

handler.command = ['togif']
export default handler
