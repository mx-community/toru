import { webp2png } from '../lib/webp2mp4.js'

var handler = async (m, { conn, usedPrefix, command }) => {

const notStickerMessage = `*⚠️ RESPONDA CON ${usedPrefix + command} AL STICKER QUE DESEE CONVERTIR EN IMAGEN*`
if (!m.quoted) return conn.reply(m.chat, notStickerMessage, m)
const q = m.quoted || m
let mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.reply(m.chat, notStickerMessage, m)
let media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
await conn.sendFile(m.chat, out, 'error.png', null, fkontak, m)

}
handler.help = ['toimg']
handler.tags = ['transformador']
handler.command = ['toimg', 'jpg', 'jpge', 'png']

export default handler
