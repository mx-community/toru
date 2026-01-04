import axios from 'axios'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una petición para hablar con ChatGPT.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola` }, { quoted: m })
await m.react("⏰")
try {
let { data } = await axios.get(`https://api-hasumi.vercel.app/api/ai/chatgpt?text=${encodeURIComponent(text)}`)
let respuesta = `${data.text}`
await conn.sendMessage(m.chat, { text: respuesta, 
contextInfo: { forwardingScore: 1, isForwarded: false, 
externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: botname, body: "", containsAutoReply: true, mediaType: 1, thumbnailUrl: "https://files.catbox.moe/3rhs2g.jpg", sourceUrl: null }}}, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["chatgpt", "gpt"]
export default handler
