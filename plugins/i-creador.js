import fetch from 'node-fetch'
const handler = async (m, { conn, usedPrefix, command }) => {
const name = await conn.getName(m.sender)
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let xd = `👋🏻  Hola usuario *${name}*.
- Por el momento el contacto del creador permanece oculto, vuelva pronto.`

await conn.sendMessage(m.chat, { text: xd, mentions: conn.parseMention(xd), contextInfo: { externalAdReply: { 
title: botname, 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator'];
export default handler;