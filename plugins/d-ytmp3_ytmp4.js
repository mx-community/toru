import axios from "axios"
import fetch from "node-fetch"

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.sendMessage(
      m.chat,
      { text: `ᗢ Proporcione un texto o enlace de YouTube para descargarlo.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Yo te esperaré` },
      { quoted: m }
    )
  }

  try {
    await m.react("⏰")

    let type = "mp3"
    if (command === "ytmp4" || command === "ytv") type = "mp4"

    let videoId = nommYouTube(text)
    let query = videoId ? `https://youtu.be/${videoId}` : text

    let data = await ytdl(query, type)
    if (!data || !data.success) throw new Error(data?.error || "No se pudo descargar")

    let txt = `· ┄ · ⊸ 𔓕 *YouTube  :  Download*

＃ *Título* : ${data.searchResult.title}
＃ *Duración* : ${toruSeconds(data.searchResult.duration)}
＃ *Autor* : ${data.searchResult.uploader}
＃ *Vistas* : ${toNum(data.searchResult.viewCount)}

> ${textbot}`

    const thumb = (await conn.getFile(data.searchResult.thumbnail))?.data

    await conn.sendMessage(
      m.chat,
      {
        text: txt,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: "YouTube : Download",
            body: botname,
            thumbnail: thumb,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    )

    if (type === "mp3") {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: data.download.dl_url },
          mimetype: "audio/mpeg",
          fileName: data.download.filename
        },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: data.download.dl_url },
          mimetype: "video/mp4",
          fileName: data.download.filename
        },
        { quoted: m }
      )
    }

    await m.react("✅")

  } catch (error) {
    console.error(error)
    await conn.sendMessage(
      m.chat,
      { text: error.message || "Error al descargar" },
      { quoted: m }
    )
  }
}

handler.command = ["ytmp3", "yta", "ytmp4", "ytv"]
handler.help = ["ytmp3", "ytmp4"]
handler.tags = ["downloader"]

export default handler

function nommYouTube(input) {
  try {
    if (/youtu\.be\//i.test(input)) {
      return input.split("youtu.be/")[1].split(/[?&]/)[0]
    }

    if (/youtube\.com/i.test(input)) {
      let url = new URL(input)

      if (url.searchParams.get("v")) {
        return url.searchParams.get("v")
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/shorts/")[1].split(/[?&]/)[0]
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/embed/")[1].split(/[?&]/)[0]
      }
    }

    return null
  } catch {
    return null
  }
}

function toNum(number) {
  if (number >= 1000 && number < 1000000) return (number / 1000).toFixed(1) + "k"
  if (number >= 1000000) return (number / 1000000).toFixed(1) + "M"
  return number.toString()
}

function toruSeconds(seconds) {
  seconds = Number(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h ? h + "h:" : ""}${m ? m + "m:" : ""}${s}s`
}

async function ytdl(query, type) {
  try {
    const searchResponse = await axios.get(
      `https://yt-extractor.y2mp3.co/api/youtube/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "accept": "application/json",
          "user-agent": "Mozilla/5.0"
        },
        timeout: 30000
      }
    )

    if (!searchResponse.data.items || !searchResponse.data.items.length) {
      throw new Error("No se encontró el video")
    }

    const firstResult = searchResponse.data.items[0]

    const downloadResponse = await axios.post(
      "https://sv-190.y2mp3.co/",
      type === "mp3"
        ? {
            url: firstResult.id,
            downloadMode: "audio",
            brandName: "ytmp3.gg",
            audioFormat: "mp3",
            audioBitrate: "320"
          }
        : {
            url: firstResult.id,
            downloadMode: "video",
            brandName: "ytmp3.gg",
            videoQuality: "720",
            youtubeVideoContainer: "mp4"
          },
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0"
        },
        timeout: 45000
      }
    )

    return {
      success: true,
      searchResult: {
        title: firstResult.title,
        duration: firstResult.duration,
        uploader: firstResult.uploaderName,
        viewCount: firstResult.viewCount,
        thumbnail: firstResult.thumbnailUrl
      },
      download: {
        dl_url: downloadResponse.data.url,
        filename: downloadResponse.data.filename
      }
    }

  } catch (error) {
    return { success: false, error: error.message }
  }
        }
