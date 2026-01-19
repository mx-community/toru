import fetch from 'node-fetch'
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de Spotify.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://open.spotify.com/xxx` }, { quoted: m })
try {
await m.react("⏰")
const res = await fetch(`https://api-hasumi.vercel.app/api/youtube/ytmp4v3?url=${text}`)
const json = await res.json()
const toru = json.data
if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu.be\.com)\//i.test(text)) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })

let mensaje = `· ┄ · ⊸ 𔓕 *YouTube  :  MP4*

\t＃ *Titulo* : ${toru.title}

> ${textbot}`
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/6lknyb.jpg`)).arrayBuffer())
//(await conn.getFile(toru.image))?.data
await conn.sendMessage(m.chat, { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⧿ YouTube : Download ⧿", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: toru.dl_url }, mimetype: "audio/mpeg", fileName: toru.title }, { quoted: m })
await m.react("✅")
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ['pru']
export default handler

  
