let handler = async (m, { conn, command, usedPrefix }) => {
let txt = `Prueba

prueba 

prueba`
await conn.sendMessage(m.chat, { text: txt, contextInfo:{ forwardingScore: 9999999, isForwarded: false,  "externalAdReply": { "showAdAttribution": true, "containsAutoReply": true, title: `PRUEBA`, body: textbot, "previewType": "PHOTO", thumbnailUrl: 'https://qu.ax/EQTd.jpg', sourceUrl: botweb }}}, { quoted: fkontak})
}

handler.command = ["prueba"]
export default handler


