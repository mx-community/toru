import fetch from 'node-fetch'
import axios from 'axios'

const MAX_FILE_SIZE_MB = 80
const CACHE_TIME = 10 * 60 * 1000
let spotifyCache = {}

function formatNumber(num) {
  return num.toLocaleString('en-US')
}

async function getSize(url) {
  try {
    const res = await axios.head(url)
    const len = res.headers['content-length']
    return len ? parseInt(len, 10) : 0
  } catch {
    return 0
  }
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

async function searchSpotify(query) {
  try {
    const api = `https://api.delirius.store/search/spotify?q=${encodeURIComponent(query)}&limit=10`
    const res = await fetch(api)
    const data = await res.json()
    
    if (data && data.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  } catch (e) {
    console.error('Error en búsqueda de Spotify:', e)
    return []
  }
}

async function downloadSpotify(url) {
  try {
    const api = `https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(url)}`
    const res = await fetch(api)
    const data = await res.json()
    
    if (data && data.data && data.data.download) {
      return {
        link: data.data.download,
        title: data.data.title || 'Unknown',
        artist: data.data.author || 'Unknown',
        thumbnail: data.data.image || null
      }
    }
    return null
  } catch (e) {
    console.error('Error al descargar:', e)
    return null
  }
}

var handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!global.db.data.chats[m.chat].fSearch && m.isGroup) {
    return conn.sendMessage(m.chat, { 
      text: `📍 Los comandos de *[ búsquedas ]* están desactivados...` 
    }, { quoted: m })
  }

  if (!text) {
    return conn.sendMessage(m.chat, { 
      text: `ᗢ Proporcione una búsqueda en Spotify.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Shape of You` 
    }, { quoted: m })
  }

  try {
    await m.react('⏰')
    
    const results = await searchSpotify(text)
    
    if (!results.length) {
      return conn.sendMessage(m.chat, { 
        text: `No se encontraron resultados para: *${text}*` 
      }, { quoted: m })
    }

    // Guardar en caché
    spotifyCache[m.sender] = { 
      results: results, 
      timestamp: Date.now() 
    }

    let caption = `· ┄ · ⊸ 𔓕 *Spotify  :  Search*\n\n`
    caption += `\t＃ *Búsqueda* : ${text}\n`
    caption += `\t＃ *Resultados* : *${results.length}* canciones\n`
    caption += `\t＃ *Fuente* : Spotify\n\n\n`

    for (let i = 0; i < results.length; i++) {
      const track = results[i]
      caption += `⧡ *${i + 1}* : ${track.title || track.id}\n`
      caption += `⧡ *Enlace* : ${track.url || 'Desconocido'}\n`
      caption += `⧡ *Duración* : ${track.duration || '¿?'}\n\n\n`
    }

    caption += `> Para descargar, responde con el número (1-${results.length})\n`
    caption += `> ${textbot}`

    const thumbnail = results[0].image || results[0].thumbnail || null
    
    if (thumbnail) {
      const thumbData = (await conn.getFile(thumbnail))?.data
      await conn.sendMessage(m.chat, { 
        text: caption, 
        mentions: [m.sender], 
        contextInfo: { 
          externalAdReply: { 
            title: "⧿ Spotify : Search ⧿", 
            body: botname, 
            thumbnail: thumbData, 
            sourceUrl: null, 
            mediaType: 1, 
            renderLargerThumbnail: false 
          }
        }
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
    }

    await m.react('✅')
  } catch (e) {
    console.error('Error en comando spotify:', e)
    await conn.sendMessage(m.chat, { 
      text: `❌ Error: ${e.message}` 
    }, { quoted: m })
    await m.react('❌')
  }
}

handler.before = async (m, { conn }) => {
  if (!m.text) return
  
  // Detectar si el mensaje es solo un número del 1 al 10
  const match = m.text.trim().match(/^(\d{1,2})$/i)
  if (!match) return

  const index = parseInt(match[1]) - 1

  const userCache = spotifyCache[m.sender]
  if (!userCache || !userCache.results[index] || Date.now() - userCache.timestamp > CACHE_TIME) {
    return conn.sendMessage(m.chat, { 
      text: `📍 La lista ha expirado o el número es inválido. Vuelva a usar el comando.` 
    }, { quoted: m })
  }

  const track = userCache.results[index]

  try {
    await m.react('⏰')

    const downloadData = await downloadSpotify(track.url)

    if (!downloadData) {
      return conn.sendMessage(m.chat, { 
        text: `❌ Error al descargar la canción. Intente con otra.` 
      }, { quoted: m })
    }

    const size = await getSize(downloadData.link)
    const mb = size / (1024 * 1024)
    const sendAsDoc = mb > MAX_FILE_SIZE_MB

    const caption = `🎵 *${downloadData.title}*\n👤 *${downloadData.artist}*\n\n${botname}\n> ${textbot}`

    if (sendAsDoc) {
      await conn.sendMessage(m.chat, { 
        document: { url: downloadData.link }, 
        fileName: `${downloadData.title} - ${downloadData.artist}.mp3`, 
        mimetype: 'audio/mpeg', 
        caption 
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, { 
        audio: { url: downloadData.link }, 
        fileName: `${downloadData.title} - ${downloadData.artist}.mp3`, 
        mimetype: 'audio/mpeg', 
        ptt: false, 
        caption 
      }, { quoted: m })
    }

    await m.react('✅')
  } catch (e) {
    console.error('Error al descargar:', e)
    await conn.sendMessage(m.chat, { 
      text: `❌ Error: ${e.message}` 
    }, { quoted: m })
    await m.react('❌')
  }
}

handler.command = ['spotify', 'sp', 'spmusic']
export default handler

