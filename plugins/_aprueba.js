import fetch from 'node-fetch'
import axios from 'axios'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Escribe para crear una imagen.` }, { quoted: m })
//const apiUrl = `https://optishield.uk//api?type=img2img?text=${text}&apikey=${apikey}`
await m.react('⏳')
let apikey = "ebe2e764b8a003d278472b711498aec7"
const url = `https://optishield.uk/api/?type=img2img?text=${text}&apikey=${apikey}`
const res = await fetch(url)
//const data = await res.json()
await conn.sendMessage(m.chat, { image: { url: res.img } }, { quoted: m })
//await conn.sendMessage(m.chat, {image: Buffer.from(response.data)}, {quoted: m})
await m.react('✅')

}

handler.command = ['xd']

export default handler
                                
