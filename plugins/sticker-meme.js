import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, {conn, text, usedPrefix, command}) => {
let user = global.db.data.users[m.sender]
let f = user.packsticker || global.packsticker2
let g = user.packsticker && user.packsticker2 ? user.packsticker : user.packsticker2 && !user.packsticker ? '' : global.packsticker2
let [atas, bawah] = text.split`,`
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Ingrese el comando y responda a una imagen y agregue dos textos separados por coma.\n\n• Por ejemplo:\n*${usedPrefix + command}* Hola, Xd`, m)
if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, `📍  Solo puedes responder imagenes.`, m)
await m.react("⏰")
let img = await q.download()
let url = await uploadImage(img)
let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
let stiker = await sticker(false, meme, f, g)
if (stiker) await conn.sendFile(m.chat, stiker, '', botname, m, '', {asSticker: 1})
await m.react("✅")
}
handler.help = ['smeme (teks|teks)']
handler.tags = ['sticker']
handler.command = ["stext", "st"]


export default handler
  
