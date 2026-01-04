import fetch from 'node-fetch'

let handler = async (m, {conn, args, usedPrefix, command}) => {
let infoXd = `ᗢ Proporcione un enlace de Mediafire.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://www.mediafire.com/xxxx/xxxx`
if (!args[0]) return conn.sendMessage(m.chat, { text: infoXd }, { quoted: m })
const url = args[0]
if (!/^https?:\/\/(www\.)?mediafire\.com/i.test(url)) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es válido.` }, { quoted: m })
await m.react('⏰')
try {
const api = `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(url)}`
const res = await fetch(api)
if (!res.ok) throw new Error(`Error de la API: ${res.status} ${res.statusText}`)
const json = await res.json()
const data = json?.data || json?.result || json
const fileUrl = data?.url || data?.link || data?.download || data?.dl || data?.download_url
const fileTitle = data?.title || data?.filename || data?.name || 'archivo'
const fileSize = data?.size || data?.filesize || 'Desconocido'
const fileMime = data?.mime || data?.mimetype || 'application/octet-stream'
const thumbBot = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
if (!fileUrl) throw new Error('No se pudo obtener el enlace de descarga.')
const caption = `· ┄ · ⊸ 𔓕 *Mediafire  :  Download*

\t＃ Titulo  :  *${fileTitle}*
\t＃ Tamaño  :  ${fileSize}
\t＃ Paquete  :  ${fileMime}

> ${textbot}`.trim()

conn.sendFile(m.chat, fileUrl, fileTitle, caption, m, null, {mimetype: fileMime, asDocument: true})
await m.react('✅')
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
}

handler.command = ["mf", "mfire", "mediafire"]
export default handler
