import axios from 'axios'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Escribe para crear una imagen.` }, { quoted: m })
await m.react('⏰')
const res = await global.sendOptishield({ type: "text2img", text: text})
await conn.sendMessage(m.chat, { image: { url: res.result.img }, caption: "generador-text2img.png" }, { quoted: m })
await m.react('✅')
}
handler.command = ['imagina']

export default handler

                                            
