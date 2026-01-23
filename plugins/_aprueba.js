import axios from 'axios'
import fetch from 'node-fetch' 
let handler = async (m, { conn, usedPrefix, command, text }) => {
try {
let respuesta = `Hola Hola Hola Hola.`
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: respuesta, 
contextInfo: { forwardingScore: 1, isForwarded: false, 
externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: "Prueba", body: botname, containsAutoReply: true, mediaType: 1, thumbnailUrl: "https://files.catbox.moe/ber8mc.jpg", sourceUrl: null }}}, { quoted: m })
await m.react("✅")
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ["prueba"]
export default handler



