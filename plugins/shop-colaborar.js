let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!global.db.data.chats[m.chat].fTienda && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ tienda ]* estan desactivados...` }, { quoted: m })
}

let codeA = "〩 Comando en *[ mantenimiento ]*..."
let codeB = "〩 Comando en *[ eliminación ]*..."
let codeC = "〩 Comando en *[ desarrollo ]*..."
await conn.sendMessage(m.chat, { text: codeC }, { quoted: m })
}
handler.command = ["collabs", "colaborar"]
export default handler
