import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una busqueda en TikTok.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* trends de baile.` }, { quoted: m })
const isUrl = /(?:https:?\/{2})?(?:www\.|vm\.|vt\.|t\.)?tiktok\.com\/([^\s&]+)/gi.test(text)
try {
await m.react('⏰')
const res = await axios({ method: 'POST', url: 'https://tikwm.com/api/feed/search', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Cookie': 'current_language=en', 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' }, data: { keywords: text, count: 20, cursor: 0, HD: 1 }})
const results = res.data?.data?.videos?.filter(v => v.play) || []
if (results.length < 2) return conn.reply(m.chat, 'Se requiere al menos 2 resultados.', m)
const medias = results.slice(0, 10).map(v => ({ type: 'video', data: { v.play } }))
let respuesta = `· ┄ · ⊸ 𔓕 *TikTok  :  Search*

⏍ *Tipo* : Search
⏍ *Fuente* : TikTok
⏍ *Resultados* : *10* videos

> ${textbot}`
await sendAlbumMessage(m.chat, medias, { caption: respuesta, quoted: m })
await m.react('✅')
} catch (e) {
await await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ['tiktoks', 'tts']
export default handler

