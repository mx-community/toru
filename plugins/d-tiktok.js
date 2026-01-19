import fetch from 'node-fetch'
import yts from 'yt-search'
import baileys from '@whiskeysockets/baileys'


async function sendAlbumMessage(jid, medias, options = {}) {
if (typeof jid !== "string") { throw new TypeError(`jid must be string, received: ${jid}`) }
if (!Array.isArray(medias) || medias.length < 2) { throw new RangeError("Minimum 2 media required") }
for (const media of medias) {
if (!media.type || (media.type !== "image" && media.type !== "video")) { throw new TypeError(`Invalid media type: ${media.type}`) }
if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) { throw new TypeError(`Invalid media data`) }}
const caption = options.text || options.caption || ""
const delay = !isNaN(options.delay) ? options.delay : 500
delete options.text
delete options.caption
delete options.delay
const album = baileys.generateWAMessageFromContent(jid, {
messageContextInfo: {},
albumMessage: {
expectedImageCount: medias.filter(m => m.type === "image").length,
expectedVideoCount: medias.filter(m => m.type === "video").length,
...(options.quoted ? { contextInfo: { remoteJid: options.quoted.key.remoteJid, fromMe: options.quoted.key.fromMe, stanzaId: options.quoted.key.id, participant: options.quoted.key.participant || options.quoted.key.remoteJid, quotedMessage: options.quoted.message }} : {}),
}}, {})
await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id })
for (let i = 0; i < medias.length; i++) {
const { type, data } = medias[i]
const mediaMsg = await baileys.generateWAMessage(album.key.remoteJid, { [type]: data, ...(i === 0 ? { caption } : {}) }, { upload: conn.waUploadToServer })
mediaMsg.message.messageContextInfo = { messageAssociation: { associationType: 1, parentMessageKey: album.key }, }
await conn.relayMessage(mediaMsg.key.remoteJid, mediaMsg.message, { messageId: mediaMsg.key.id })
await baileys.delay(delay) }
return album
}


let handler = async (m, { conn, usedPrefix, command, text }) => {
if (command === "tiktok" || command === "tt") {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de TikTok.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://vm.tiktok.com/xxxx/` }, { quoted: m })
let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
let match = m.text.match(regex)
if (!match) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })
let url = match[0]
let api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}?hd=1`
try {
let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
let dp = await d2.json()
let res = await fetch(api)
let json = await res.json()
if (!json || json.code !== 0 || !json.data) return conn.sendMessage(m.chat, { text: `No se han encontrado resultados en el enlace.` }, { quoted: m })
const data = json.data
const { id, region, title, cover, origin_cover, duration, play, wmplay, music, music_info, play_count, digg_count, comment_count, share_count, download_count, author, images, create_time } = data
await m.react("⏰")
await conn.sendMessage(m.chat, { video: { url: play }, caption: `${botname}\n> ${textbot}`, gifPlayback: false, jpegThumbnail: Buffer.from(await (await fetch(cover)).arrayBuffer()) }, { quoted: m })
const doc = { audio: { url: dp.results.audio }, mimetype: 'audio/mp4', fileName: `ttbykeni.mp3`, };
await conn.sendMessage(m.chat, doc, { quoted: m });
await m.react("✅")
} else {
//let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
//let dp = await d2.json()
if (images && images.length > 0) {
for (let i = 0; i < images.length; i++) {
await conn.sendMessage(m.chat, { image: { url: images[i] }, caption: null }, m)
}
const doc = { audio: { url: dp.results.audio }, mimetype: 'audio/mp4', fileName: `ttbykeni.mp3`, };
await conn.sendMessage(m.chat, doc, { quoted: m });
} catch (err) {
console.error(err)
await conn.sendMessage(m.chat, { text: `${err.message}` }, { quoted: m })
}}

if (command === "a-tt" || command === "a-tiktok") {
if (!text) return conn.reply(m.chat, `ᗢ Proporcione un enlace de TikTok.\n\n\t⚶ Por ejemplo:\n${usedPrefix + command} https://vm.tiktok.com/xxxx/`, m);
try {
conn.sendMessage(m.chat, { react: { text: "⏰", key: m.key } });
let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
let dp = await d2.json()
const doc = {
audio: { url: dp.results.audio },
mimetype: 'audio/mp4',
fileName: `ttbykeni.mp3`,
};
await conn.sendMessage(m.chat, doc, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch (err) {
await conn.sendMessage(m.chat, { text: `${err.message}` }, { quoted: m });
}}

}

handler.command = ["tiktok", "tt", "a-tt", "a-tiktok"]
export default handler
 

