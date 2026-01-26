let handler = async (m, { conn, usedPrefix, command, text }) => {
let codeA = "〩 Comando en *[ mantenimiento ]*..."
let codeB = "〩 Comando en *[ eliminación ]*..."
let codeC = "〩 Comando en *[ desarrollo ]*..."
await conn.sendMessage(m.chat, { text: codeC }, { quoted: m })
}
handler.command = ["value!"]
export default handler
