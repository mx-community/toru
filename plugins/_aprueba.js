
import axios from 'axios'
import fetch from 'node-fetch'

// Objeto para almacenar las búsquedas activas con su tiempo de expiración
let activeSearches = {}

var handler = async (m, {conn, usedPrefix, command, text }) => {
  
  // Si no hay texto, mostrar uso
  if (!text) {
    return m.reply(`*🎵 Uso del comando:*\n\n` +
      `*Buscar:* ${usedPrefix + command} nombre de la canción\n` +
      `*Descargar:* Responde con un número del 1 al 10 al mensaje de resultados\n\n` +
      `Ejemplo: ${usedPrefix + command} Bad Bunny Monaco`)
  }

  // Si el mensaje cita otro mensaje (respuesta)
  if (m.quoted) {
    const quotedId = m.quoted.id
    
    // Verificar si existe una búsqueda activa para ese mensaje
    if (!activeSearches[quotedId]) {
      return m.reply('⏰ *El tiempo para seleccionar una canción ha expirado.*\n\nRealiza una nueva búsqueda.')
    }

    // Validar que el texto sea un número válido
    const selection = parseInt(text.trim())
    if (isNaN(selection) || selection < 1 || selection > activeSearches[quotedId].results.length) {
      return m.reply(`❌ Número inválido. Responde con un número del *1* al *${activeSearches[quotedId].results.length}*`)
    }

    // Obtener la canción seleccionada
    const selected = activeSearches[quotedId].results[selection - 1]
    
    m.reply(`⏳ *Descargando:*\n${selected.title}\n${selected.artist}\n\n_Espera un momento..._`)

    try {
      // Descargar el audio
      const downloadUrl = `https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(selected.url)}`
      const downloadRes = await fetch(downloadUrl)
      const downloadData = await downloadRes.json()

      if (!downloadData.data || !downloadData.data.url) {
        throw new Error('No se pudo obtener el enlace de descarga')
      }

      // Enviar el audio
      await conn.sendMessage(m.chat, {
        audio: { url: downloadData.data.url },
        mimetype: 'audio/mpeg',
        fileName: `${selected.title}.mp3`
      }, { quoted: m })

      // Limpiar la búsqueda activa después de descargar
      delete activeSearches[quotedId]

    } catch (error) {
      console.error(error)
      m.reply('❌ *Error al descargar la canción.*\n\nIntenta con otra opción o realiza una nueva búsqueda.')
    }

    return
  }

  // Buscar en Spotify
  m.reply('🔍 *Buscando en Spotify...*')

  try {
    const searchUrl = `https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=10`
    const response = await fetch(searchUrl)
    const data = await response.json()

    if (!data.data || data.data.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.')
    }

    // Formatear resultados
    let message = `*🎵 RESULTADOS DE SPOTIFY*\n\n`
    message += `🔎 Búsqueda: *${text}*\n\n`
    
    data.data.forEach((track, index) => {
      message += `*${index + 1}.* ${track.title}\n`
      message += `👤 ${track.artist}\n`
      message += `⏱️ ${track.duration}\n\n`
    })

    message += `\n📝 *Responde a este mensaje con el número de la canción que deseas descargar (1-${data.data.length})*\n`
    message += `⏰ Tienes *2 minutos* para seleccionar.`

    // Enviar resultados
    const sentMsg = await conn.reply(m.chat, message, m)

    // Guardar búsqueda activa con timeout de 2 minutos
    activeSearches[sentMsg.key.id] = {
      results: data.data,
      timestamp: Date.now()
    }

    // Eliminar búsqueda después de 2 minutos (120000 ms)
    setTimeout(() => {
      delete activeSearches[sentMsg.key.id]
    }, 120000)

  } catch (error) {
    console.error(error)
    m.reply('❌ *Error al buscar en Spotify.*\n\nIntenta de nuevo en unos momentos.')
  }
}

handler.command = ['spotify', 'sp', 'music']
handler.help = ['spotify <búsqueda>']
handler.tags = ['downloader']

export default handler
