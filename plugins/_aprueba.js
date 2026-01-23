import fetch from 'node-fetch' 
let handler = async (m, { conn, command, usedPrefix }) => {
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
  let txt = `Prueba

prueba 

prueba`
await conn.sendMessage(m.chat, { text: txt, contextInfo:{ forwardingScore: 999, isForwarded: false,  "externalAdReply": { "showAdAttribution": false, "containsAutoReply": false, title: `PRUEBA`, body: textbot, "previewType": "PHOTO", thumbnailUrl: thumb, sourceUrl: null }}}, { quoted: m})
}

handler.command = ["prueba"]
export default handler


