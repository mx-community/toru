import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!global.db.data.chats[m.chat].fAis && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ inteligencia artificial ]* estan desactivados...` }, { quoted: m })
}

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para generar una imagen.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Gato en un pasto verdoso durmiendo.` }, { quoted: m })
await m.react("⏰")
try {
let data = await fetch(`https://api.soymaycol.icu/ai-image?q=Imagina+${text}&apikey=soymaycol%3C3`)
let toru = await data.json()

if (!toru?.status || !toru?.url) {
return conn.sendMessage(m.chat, { text: `📍  La api no obtuvo respuestas, intentalo en un minuto...` }, { quoted: m })
}

await conn.sendMessage(m.chat, { video: { url: toru.url }, caption: `${botname}\n> ${textbot}` }, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["imagina2"]
export default handler
  
