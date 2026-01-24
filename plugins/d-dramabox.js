import axios from 'axios'
import { URL } from 'url'

const HEADERS = {
'User-Agent':
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
Referer: 'https://www.dramaboxdb.com/',
Origin: 'https://www.dramaboxdb.com'
}

async function getBuildId(url) {
try {
const resp = await axios.get(url, { headers: HEADERS })
return (resp.data.match(/"buildId":"([^"]+)"/) || [])[1]
} catch {
return null
}
}

async function fetchInfo(url) {
let buildId = await getBuildId(url)
if (!buildId) buildId = await getBuildId('https://www.dramaboxdb.com/')
if (!buildId) throw new Error('No se pudo obtener el buildId de DramaBox.')

const u = new URL(url)
const pathname = u.pathname
const resp = await axios.get(
`https://www.dramaboxdb.com/_next/data/${buildId}/en${pathname}.json`,
{ headers: HEADERS }
)
return {
...resp.data.pageProps,
cid: (pathname.split('/').pop() || '').split('_')[0]
}
}

async function searchDrama(q) {
const bid = await getBuildId('https://www.dramaboxdb.com/')
if (!bid) throw new Error('No se pudo conectar con DramaBox.')

const r = await axios.get(
`https://www.dramaboxdb.com/_next/data/${bid}/en/search.json?searchValue=${encodeURIComponent(
q
)}`,
{ headers: HEADERS }
)
return r.data.pageProps?.bookList || []
}

const sendEpisodes = async (conn, m, episodes, dramaName) => {
if (episodes.length > 1 && conn.sendAlbunMessage) {
const medias = episodes.map((ep) => ({ type: 'video', data: { url: ep.mp4 }, caption: `· ┄ · ⊸ 𔓕 *Dramabox  :  Download*\n\n\t＃ *Nombre* : ${dramaName}\n\t＃ *Episodio* : ${ep.index + 1} = ${ep.name || ''}\n\t＃ *Fuente* : Dramabox`}))
const chunks = []
for (let i = 0; i < medias.length; i += 5) {
chunks.push(medias.slice(i, i + 5))
}
for (const chunk of chunks) {
await conn.sendAlbumMessage(m.chat, chunk, { quoted: m })
}
} else {
for (const ep of episodes) {
if (!ep.mp4) continue
await conn.sendMessagem.chat, { video: { url: ep.mp4 }, caption: `\t＃ *Nombre* : ${dramaName}\n\t＃ *Episodio* : ${ep.index + 1} = ${ep.name || ''}\n\t＃ *Fuente* : Dramabox\n\n> ${textbot}` }, { quoted: m })
}
}
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
conn.dramabox = conn.dramabox || {}

const args = text.trim().split(/\s+/)
const isUrl = /^https?:\/\/(www\.)?dramaboxdb\.com\/movie\//i.test(args[0])

if (isUrl && args.length > 1) {
const url = args[0]
const range = args[1]
await m.react("⏰")
try {
const data = await fetchInfo(url)
const list = data.chapterList || []
const dramaName = data.bookInfo?.bookName || 'DramaBox'

const e = new Set()
if (range.toLowerCase() === 'all') {
 return conn.sendMessage(m.chat, { text: `Son demaciados para descargar, usa de una al 5.\n> *Por ejemplo:* 1-5` }, { quoted: m })
} else {
range.split(',').forEach(p => {
if (p.includes('-')) {
const [a, b] = p.split('-').map(x => parseInt(x.trim()))
for (let i = a; i <= b; i++) e.add(i)
} else e.add(parseInt(p.trim()))
})
}

const targets = list.filter(c => e.has(c.index + 1))
if (!targets.length) return conn.sendMessage(m.chat, { text: `No hay mas episodios...` }, { quoted: m })

if (targets.length > 10) return conn.sendMessage(m.chat, { text: `No puedes descargar mas, el maximo es de 10 descargas por comando.` }, { quoted: m })

await sendEpisodes(conn, m, targets, dramaName)

} catch (e) {
conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
return
}

if (isUrl) {
await m.react('⏰')
try {
const data = await fetchInfo(args[0])
const list = data.chapterList || []
const dramaName = data.bookInfo?.bookName || 'DramaBox'

const targetCid = String(data.cid)
let targets = list.filter((c) => String(c.id) === targetCid)

if (!targets.length && list.length > 0) {
let txt = `· ┄ · ⊸ 𔓕 *Dramabox  :  Search*\n\n`
txt += `\t＃ *Nombre* : ${dramaName}\n`
txt += `\t＃ *Episodios* : ${data.bookInfo?.totalChapterNum || list.length}\n`
txt += `\t＃ *Info* : ${data.bookInfo?.synopsis || ''}\n\n`
txt += `📍 Responda este mensaje con el episodio que desea ver.\n`
txt += `*Por ejemplo: *1* o *1-5*\n\n> ${textbot}`

await conn.sendMessage(m.chat, { text: txt, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true, title: botname, body: textbot, containsAutoReply: true, mediaType: 1, thumbnailUrl: data.bookinfo?.cover, sourceUrl: null }}}, { quoted: m })
//conn.sendMessage(m.chat, { image: { url: data.bookInfo?.cover }, caption: txt }, { quoted: m })

conn.dramabox[m.sender] = { type: 'details', url: args[0], dramaName }
return
}

if (targets.length) {
await sendEpisodes(conn, m, targets, dramaName)
}

} catch (e) {
console.error(e)
m.reply(`Error: ${e.message}`)
}
return
}

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione el nombre del drama para buscar.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* my boss` }, { quoted: m })
await m.react("⏰")
try {
const results = await searchDrama(text)
if (!results.length) return conn.sendMessage(m.chat, { text: `El drama no existe o esta mal escrito...` }, { quoted: m })

let txt = `· ┄ · ⊸ 𔓕 *DramaBox  :  Search*\n\n\t＃ *Busqueda* : ${text}\n\t＃ *Resultados* : *${results.length}* results\n\t＃ *Fuente* : DramaBox\n\n📍  Responda a este mensaje con el numero del drama.\n\n`
results.slice(0, 10).forEach((b, i) => {
txt += `\t⧡ *Numero* : ${i + 1}\n\t⧡ *Nombre* : ${b.bookName}\n\t⧡ *Episodios* : ${b.totalChapterNum} eps\n`
})
txt += `\n*Responda con el número del drama para ver detalles y descargar.*`

const firstCover = results[0]?.cover
if (firstCover) {
await conn.sendMessage(m.chat, { text: txt, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: false, renderLargerThumbnail: true, title: botname, body: textbot, containsAutoReply: true, mediaType: 1, thumbnailUrl: firstCover, sourceUrl: null }}}, { quoted: m })
} else {
await conn.sendMessage(m.chat, { image: { url: firstCover }, caption: txt }, { quoted: m })
}

conn.dramabox[m.sender] = { type: 'search', list: results }

} catch (e) {
conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
}

handler.before = async (m, { conn }) => {
conn.dramabox = conn.dramabox || {}
const session = conn.dramabox[m.sender]
if (!session || !m.text) return

if (!/^[0-9,-]+$/.test(m.text.trim())) return

if (session.type === 'search') {
const index = parseInt(m.text.trim()) - 1
if (isNaN(index)) return

const item = session.list[index]
if (!item) return 

const link = `https://www.dramaboxdb.com/movie/${item.bookId}/${item.bookNameLower || 'v'}`
await m.react("⏰")
try {
const data = await fetchInfo(link)
const list = data.chapterList || []

let txt = `· ┄ · ⊸ 𔓕 *Dramabox  :  Search*\n\n`
txt += `\t＃ *Nombre* : ${item.bookName}\n`
txt += `\t＃ *Episodios* : ${data.bookInfo?.totalChapterNum || list.length}\n`
txt += `\t＃ *Info* : ${data.bookInfo?.synopsis || ''}\n\n`
txt += `📍 Responda este mensaje con el episodio que desea ver.\n`
txt += `*Por ejemplo: *1* o *1-5*\n\n> ${textbot}`

await conn.sendMessage(m.chat, { image: { url: data.bookInfo?.cover }, caption: txt }, { quoted: m })

conn.dramabox[m.sender] = { type: 'details', url: link, dramaName: item.bookName }
} catch (e) {
console.error(e)
m.reply('Error al obtener datos.')
}
return true
}

if (session.type === 'details') {
const range = m.text.trim()
await m.react("⏰")
try {

 const data = await fetchInfo(session.url)
 const list = data.chapterList || []
 const e = new Set()
 
 if (range.toLowerCase() === 'all') {
return m.reply('Mucho')
 } else {
 range.split(',').forEach(p => {
 if (p.includes('-')) {
 const [a, b] = p.split('-').map(x => parseInt(x.trim()))
 for (let i = a; i <= b; i++) e.add(i)
 } else e.add(parseInt(p.trim()))
 })
 }
 
 const targets = list.filter(c => e.has(c.index + 1))
 if (!targets.length) return m.reply('Sin resultados.')
 if (targets.length > 5) return m.reply('Maximo 5 episodios por descarga...') // Changed from 10 to 5 for safety
 
 await sendEpisodes(conn, m, targets, session.dramaName)
 
} catch(e) {
console.error(e)
m.reply(`${e.message}`)
}
}
}

handler.command = ["dramabox"]

export default handler
