import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted || m
const mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.sendMessage(m.chat, { text: `ᗢ Debe de responder a un sticker sin movimiento.` }, { quoted: m })
await m.react("⏰")
const media = await q.download()
let out = (await webp2png(media).catch((_) => null)) || Buffer.alloc(0)

await conn.sendMessage(m.chat, { image: { url: out }, caption: null }, { quoted: m })
await m.react("✅")
}
handler.command = ['timg']
export default handler
