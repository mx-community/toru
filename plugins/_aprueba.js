import axios from 'axios'
let handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una petición para hablar con Claude AI.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola` }, { quoted: m })
await m.react("⏰")
try {
let { data } = await axios.get(`https://api-hasumi.vercel.app/api/ai/claude?text=${encodeURIComponent(text)}`)
let respuesta = `${data.texto}`
await conn.sendMessage(m.chat, { text: respuesta, 
contextInfo: { forwardingScore: 1, isForwarded: false, 
externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: "Claude AI", body: botname, containsAutoReply: true, mediaType: 1, thumbnailUrl: "https://files.catbox.moe/zjt0xe.jpg", sourceUrl: null }}}, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["claude"]
export default handler
