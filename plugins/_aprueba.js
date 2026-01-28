import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!global.db.data.chats[m.chat].fAis && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ inteligencia artificial ]* estan desactivados...` }, { quoted: m })
}

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para generar un video.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Gato bailando con otros gatos con sombrero.` }, { quoted: m })
await m.react("⏰")
try {
let data = await fetch(`https://api.soymaycol.icu/ai-veo3?q=${text}&aspect_ratio=16%3A9&duration=5&quality=480p&apikey=soymaycol%3C3`)
let toru = await data.json()

if (!toru?.status || !toru?.video) {
return conn.sendMessage(m.chat, { text: `📍  La API no obtuvo respuestas, intentalo en un minuto...` }, { quoted: m })
}

let toruWa = `· ┄ · ⊸ 𔓕 *Generador  :  Video*

\t＃ *Titulo* : ${text}
\t＃ *Ratio* : 16:9
\t＃ *Calidad* : 480p
\t＃ *Duración* : 5 segundos

> ${textbot}`

await conn.sendMessage(m.chat, { video: { url: toru.video }, caption: toruWa }, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["aivid3"]
export default handler
  
