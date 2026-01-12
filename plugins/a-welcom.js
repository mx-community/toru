import fetch from 'node-fetch'
import fs from 'fs'
import { WAMessageStubType } from '@whiskeysockets/baileys'

async function generarBienvenida({ conn, sender, groupMetadata, chat }) {
const username = `@${m.sender.split(`@`)[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => `${global.toruImg}`)
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Buenos_Aires", day: 'numeric', month: 'long', year: 'numeric' })
const groupSize = groupMetadata.participants.length + 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sWelcome || 'Puedes editar con el comando *#welcome+*').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `*${groupMetadata.subject}*`).replace(/{desc}/g, `${desc}`)

const caption = `👋🏻  ${username}

_Bienvenido/a al grupo, espero que estes cómodo o cómoda en este chat, puedes usar *( #menu )* para ver la lista de categorías._

> ${textbot}`

return { pp, caption, mentions: [userId] }
}

async function generarDespedida({ conn, sender, groupMetadata, chat }) {
const username = `@${m.sender.split(`@`)[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => `${global.toruImg}`)
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Buenos_Aires", day: 'numeric', month: 'long', year: 'numeric' })
const groupSize = groupMetadata.participants.length - 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sBye || 'Puedes editar con el comando *#bye+*').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `${groupMetadata.subject}`).replace(/{desc}/g, `*${desc}*`)

const caption = `👋🏻  ${username}

_Damos la despedida a un miembro del grupo, se retiro del chat, esperamos y se encuentre bien._

> ${textbot}`

return { pp, caption, mentions: [userId] }
}


let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return !0
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const sender = m.messageStubParameters[0]
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())

if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
const { pp, caption, mentions } = await generarBienvenida({ conn, sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { text: caption, mentions: mentions, contextInfo: { externalAdReply: { title: botname, body: "¡Bienvenido/a!", thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m )
//await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentionedJid: mentions }, { quoted: null })
try { fs.unlinkSync(img) } catch {}
}

if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
const { pp, caption, mentions } = await generarDespedida({ conn, sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { text: caption, mentions: mentions, contextInfo: { externalAdReply: { title: botname, body: "¡Adios!", thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, m )
//await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentionedJid: mentions }, { quoted: null })
try { fs.unlinkSync(img) } catch {}
}
}

export { generarBienvenida, generarDespedida }
export default handler
  
