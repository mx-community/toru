import fetch from 'node-fetch' 
let handler = async (m, { conn, command, usedPrefix }) => {
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
  let txt = `Prueba

prueba 

prueba`
await conn.sendMessage(m.chat, { text: txt, contextInfo:{ forwardingScore: 9999999, isForwarded: false,  "externalAdReply": { "showAdAttribution": true, "containsAutoReply": true, title: `PRUEBA`, body: textbot, "previewType": "PHOTO", thumbnailUrl: thumb, sourceUrl: botweb }}}, { quoted: m})
}

handler.command = ["prueba"]
export default handler


