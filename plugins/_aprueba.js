import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let who2 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false 
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => `${global.toruImg}`)
let me = await conn.profilePictureUrl(m.sender, 'image').catch(_ => `${global.toruImg}`)
let name = conn.getName(who)
let api = "https://api.delirius.store/canvas"
await conn.sendMessage(m.chat, { image: { url: api + "/gay?url=" + pp }, caption: "Gay" }, { quoted: m })
//conn.sendFile(m.chat, global.toru(nami, '/gay?url=', { avatar: pp }), 'toru.png', `🏳️‍🌈 Gay Card @${name}`, m)
}

handler.command = ['gay'] 
export default handler
  
