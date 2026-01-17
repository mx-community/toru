import fetch from 'node-fetch'
const handler = async (m, { conn, command, args, usedPrefix, text }) => {
const user = global.db.data.users[m.sender] || {};
const name = await conn.getName(m.sender);
const imwel = Buffer.from(await (await fetch(`https://files.catbox.moe/hnn3hp.jpg`)).arrayBuffer())
const imbye = Buffer.from(await (await fetch(`https://files.catbox.moe/tln7ks.jpg`)).arrayBuffer())
let hola = `Hola
xd`
await conn.sendMessage(m.chat, { text: hola, 
contextInfo: { forwardingScore: 1, 
isForwarded: true, 
externalAdReply: { 
showAdAttribution: true, 
renderLargerThumbnail: true, 
title: botname, 
body: textbot, 
containsAutoReply: true, 
mediaType: 1, 
thumbnailUrl: "https://files.catbox.moe/hnn3hp.jpg", 
sourceUrl: null }}}, { quoted: fkontak })
};
handler.command = ["dat"]

export default handler;
