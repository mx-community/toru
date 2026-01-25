import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!global.db.data.chats[m.chat].fAis && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ inteligencia artificial ]* estan desactivados...` }, { quoted: m })
}

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para generar una cancion tipo *[ Romantica ]*.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Eres la mas hermosa que he visto al nacer en este mundo.` }, { quoted: m })
await m.react("⏰")
try {
let data = await fetch(`https://api.soymaycol.icu/sunoai?prompt=${text}&tags=romantic&apikey=soymaycol%3C3`)
let toru = await data.json()

if (!toru?.status || !toru?.result.music_url) {
return conn.sendMessage(m.chat, { text: `📍  La api no obtuvo respuestas, intentalo en un minuto...` }, { quoted: m })
}
  await conn.sendMessage( m.chat, { audio: { url: toru.result.music_url }, fileName: `toru_bot_music_ai.mp3`, mimetype: 'audio/mpeg', ptt: false, null }, { quoted: m } )
  ///await conn.sendMessage(m.chat, { text: `· ┄ · ⊸ 𔓕 *Music  :  AI*\n\n\t＃ *Prompt* : ${text}\n\t＃ *Genero* : Romántico\n\t＃ *Mensaje* : Lyrics\n\n${toru.lyrics}\n\n> ${textbot}` }, { quoted: m })
//await conn.sendMessage(m.chat, { audio: { url: toru.music_url } }, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["romantic"]
export default handler
  
