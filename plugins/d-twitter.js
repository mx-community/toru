import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `ᗢ Proporciona un enlace de Twitter.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://x.com/xxx/xxx/xxx` }, { quoted: m })
if (!/^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\//i.test(args[0])) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })
try {
await m.react("⏰")
let data = await vxtwitter(args[0])
let { metadata, download } = data
let uploadedDate = new Date(metadata.uploaded);
let formattedDate = uploadedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric',month: 'long', day: 'numeric' })

for (let media of download) {
if (media.tipo === "image/jpg") {
await conn.sendMessage(m.chat, { image: { url: media.dl_url }, caption: "" }, { quoted: m })
await m.react("✅")
} else if (media.tipo === "video/mp4") {
await conn.sendMessage(m.chat, { video: { url: media.dl_url }, caption: "" }, { quoted: m })
await m.react("✅")
}}} catch (error) {
console.error(error)
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m })
}}

handler.help = ['twitter + [link]']
handler.tags = ['dl']
handler.command = ['tw', 'twitter', 'x']

export default handler

async function vxtwitter(url) {
if (/x.com/.test(url)) {
url = url.replace("x.com", "twitter.com");
}

let { data } = await axios.get(url.replace("twitter.com", "api.vxtwitter.com")).catch(e => e.response);

return {
metadata: {
title: data.text,
id: data.tweetID,
likes: data.likes.toLocaleString(),
replies: data.replies.toLocaleString(),
retweets: data.retweets.toLocaleString(),
uploaded: new Date(data.date),
author: data.user_name
},
download: data.media_extended.map((a) => ({
tipo: a.type === "image" ? "image/jpg" : "video/mp4", 
dl_url: a.url 
}))
}
}

function toNum(number) {
if (number >= 1000 && number < 1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number >= 1000000) { return (number / 1000000).toFixed(1) + 'M' } else if (number <= -1000 && number > -1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number <= -1000000) { return (number / 1000000).toFixed(1) + 'M' } else { return number.toString() }}


/*import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, text, command }) => {
let itoru = global.db.data.chats[conn.user.jid]?.itoru || torukk
if (!text) return conn.sendMessage(m.chat, { text: `${itoru} Proporcione un enlace de Twitter.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://x.com/xxx/xxx/xxx` }, { quoted: m })
try {
await m.react("⏰")
const result = await twitterScraper(text);
if (!result.status) return conn.sendMessage(m.chat, { text: `No se ha podido obtener el contenido del enlace.` }, { quoted: m })
if (result.data.type === 'video') {
let videoText = `🎬*twitter.mp4*`
conn.sendFile(m.chat, result.data.dl[0].url, "video.mp4", videoText, m)
await m.react("✅")
} else {
await conn.sendMessage(m.chat, { image: { url: result.data.imageUrl },
caption: `🖼️*twitter.jpg*` }, { quoted: m })
await m.react("✅")
}} catch (e) {
return await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ["x", "twitter", "tw"]
handler.help = ["twitter"]
handler.tags = ["download"]

export default handler

async function twitterScraper(url) {
return new Promise(async (resolve, reject) => {
try {
const twitterUrlMatch = url.match(/(https:\/\/x.com\/[^?]+)/)
const tMatch = url.match(/t=([^&]+)/)
const twitterUrl = twitterUrlMatch ? twitterUrlMatch[1] : ''
const t = tMatch ? tMatch[1] : ''
const urlnya = encodeURIComponent(`${twitterUrl}?t=${t}&s=19`)
const response = await axios.post("https://savetwitter.net/api/ajaxSearch",
`q=${urlnya}&lang=en`)
const $ = cheerio.load(response.data.data)
const isVideo = $('.tw-video').length > 0
const twitterId = $('#TwitterId').val()
if (isVideo) {
const videoThumbnail = $('.tw-video .thumbnail .image-tw img').attr('src')
const data = []
$('.dl-action a').each((i, elem) => {
const quality = $(elem).text().trim()
const url = $(elem).attr('href')
if ($(elem).hasClass('action-convert')) {
const audioUrl = $(elem).attr('data-audioUrl')
data.push({
quality: quality,
url: audioUrl || 'URL not found',
})
} else {
data.push({
quality: quality,
url: url
})
}})
const title = $('.tw-middle h3').text().trim()
const videoDuration = $('.tw-middle p').text().trim()
resolve({
status: true,
data: {
type: "video",
title: title,
duration: videoDuration,
twitterId: twitterId,
videoThumbnail: videoThumbnail,
dl: data
}})
} else {
const imageUrl = $('.photo-list .download-items__thumb img').attr('src')
const downloadUrl = $('.photo-list .download-items__btn a').attr('href')
resolve({
status: true,
data: {
type: "image",
twitterId: twitterId,
imageUrl: imageUrl,
dl: downloadUrl
}})
}} catch (error) {
reject(error)
}})
}
*/

