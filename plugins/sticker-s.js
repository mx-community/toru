import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn }) => {
if (!global.db.data.chats[m.chat].fStickers && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ stickers ]* estan desactivados...` }, { quoted: m })
}

try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (!/image|video|webp/.test(mime))
return conn.sendMessage(m.chat, { text: `ᗢ Responda a una imagen o video para crear un sticker.` }, { quoted: m })

if (/video/.test(mime)) {
let dur = (q.msg || q).seconds || 0
if (dur > 7) return conn.sendMessage(m.chat, { text: `El video no debe durar mas de 7 segundos...` }, { quoted: m })
}

await conn.sendMessage(m.chat, { react: { text: '⏰', key: m.key }})
let media = await q.download()
if (!media) return conn.sendMessage(m.chat, { text: 'No se pudo obtener el archivo' }, { quoted: m })
let stiker = await sticker(media, global.packsticker || '', global.packsticker2 || '' )

    await conn.sendMessage(
      m.chat,
      { sticker: stiker },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })

  } catch (e) {
    conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
    //m.reply('Error al crear el sticker')
  }
}

handler.command = ['s', 'sticker']

export default handler
