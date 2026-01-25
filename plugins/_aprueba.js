import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!global.db.data.chats[m.chat].fAis && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ inteligencia artificial ]* estan desactivados...` }, { quoted: m })
}

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para generar un video.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Gato durmiendo en una cama cómodamente.` }, { quoted: m })
await m.react("⏰")
try {
let { data } = await axios.get(`https://api.soymaycol.icu/ai-pixverse?q=${encodeURIComponent(text)}`)
await conn.sendMessage(m.chat, { video: { url: data.video }, caption: `${botname}\n> ${textbot}`, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["videoai2"]
export default handler
  
