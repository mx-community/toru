import fetch from 'node-fetch'
import axios from 'axios'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Escribe para crear una imagen.` }, { quoted: m })
await m.react('⏳')
const res = await global.sendOptishield({ type: "text2img", text: text})
console.log(res)
await m.react('✅')

}

handler.command = ['xd']

export default handler
                                
