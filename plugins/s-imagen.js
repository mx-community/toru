import axios from 'axios'
const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para buscar imágenes.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Arboles` }, { quoted: m })
try {
await m.react('⏰')
const res = await getGoogleImageSearch(text)
const urls = await res.getAll()
if (urls.length < 2) return conn.sendMessage(m.chat, { text: `No hay suficientes imagenes.` }, { quoted: m })
const medias = urls.slice(0, 10).map(url => ({ type: 'image', data: { url } }))
const respuesta = `· ┄ · ⊸ 𔓕 *Images  :  Search*

\t＃ *Busqueda* : ${text}
\t＃ *Imagenes* : *${urls.length}* images
\t＃ *Fuente* : Google

> ${textbot}`
await sendAlbumMessage(m.chat, medias, { caption: respuesta, quoted: m })
await m.react('✅')
} catch (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.command = ['imagen', 'image']

export default handler

function getGoogleImageSearch(query) {
const apis = [`https://delirius-apiofc.vercel.app/search/gimage?query=${encodeURIComponent(query)}`, `https://api.siputzx.my.id/api/images?query=${encodeURIComponent(query)}`]
return { getAll: async () => {
for (const url of apis) {
try {
const res = await axios.get(url)
const data = res.data
if (Array.isArray(data?.data)) {
const urls = data.data.map(d => d.url).filter(u => typeof u === 'string' && u.startsWith('http'))
if (urls.length) return urls
}} catch {}
}
return []
},
getRandom: async () => {
const all = await this.getAll()
return all[Math.floor(Math.random() * all.length)] || null
}}}
