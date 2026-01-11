import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!/image|video|webp/.test(mime)) {
      return m.reply('Responde a una imagen, gif, video o sticker')
    }

    if (/video/.test(mime)) {
      let dur = (q.msg || q).seconds || 0
      if (dur > 7) return m.reply('Duración máxima es de 7 segundos')
    }

    let mode = 'normal'
    if (args.includes('-v')) mode = 'vertical'
    else if (args.includes('-x')) mode = 'expand'
    else if (args.includes('-i')) mode = 'inflate'
    else if (args.includes('-c')) mode = 'circle'

    await conn.sendMessage(m.chat, {
      react: { text: '🕒', key: m.key }
    })

    let media = await q.download()
    if (!media) throw 'No se pudo descargar el archivo'

    let stiker = await sticker(
      media,
      global.packsticker || '',
      global.packsticker2 || '',
      mode
    )

    await conn.sendMessage(
      m.chat,
      { sticker: stiker },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })

  } catch (e) {
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    })
    m.reply(typeof e === 'string' ? e : 'Error al crear el sticker')
  }
}

handler.help = [
  's',
  's -v',
  's -x',
  's -i',
  's -c'
]

handler.tags = ['tools']
handler.command = ['s', 'sticker']

export default handler
