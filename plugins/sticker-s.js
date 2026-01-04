import { Sticker, StickerTypes } from 'wa-sticker-formatter'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (!/webp|image|video/g.test(mime) && !args[0]) return conn.sendMessage(m.chat, { text: `ᗢ Responda a un video, imagen, enlace o gif para crear un sticker.` }, { quoted: m })
await conn.sendMessage(m.chat, { react: { text: '⏰', key: m.key } })
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) {

if ((q.msg || q).seconds > 180) {
return conn.sendMessage(m.chat, { text: `El video debe durar maximo 3 minutos.\n- Puede recortar a 10 segundos para uso rapido.` }, { quoted: m })
}
}

let img = await q.download?.()
if (!img) throw new Error('Error al descargar')

const stickerOptions = {
type: StickerTypes.FULL,
quality: 70, 
}

const sticker = new Sticker(img, stickerOptions)
stiker = await sticker.toBuffer()

} else if (args[0]) {
if (isUrl(args[0])) {
const stickerOptions = { 
type: StickerTypes.FULL, 
quality: 70, 
}

const sticker = new Sticker(args[0], stickerOptions)
stiker = await sticker.toBuffer()
} else {
return conn.sendMessage(m.chat, { text: `El enlace no es compatible, debe tener una terminación de *jpg, jpeg o png*.` }, { quoted: m })
}
}

if (stiker) {
const fkontak = await makeFkontak()
await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: fkontak })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
} catch (error) {
console.error('Error en sticker:', error)
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}
}

async function makeFkontak() {
try {
const { default: fetch } = await import('node-fetch')
const res = await fetch('https://cdn.russellxz.click/64bba973.jpg')
const thumb2 = Buffer.from(await res.arrayBuffer())
return {
key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
message: { locationMessage: { name: '々 STICKERS 々', jpegThumbnail: thumb2 } },
participant: '0@s.whatsapp.net'
}
} catch {
return undefined
}
}

handler.help = ['sticker', 's']
handler.tags = ['tools']
handler.command = ['s', 'sticker']

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|webp)/, 'gi'))
}


