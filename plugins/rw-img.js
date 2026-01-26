let handler = async (m, { conn, usedPrefix, command, text }) => {
let codeA = "Comando en *[ mantenimiento ]*..."
let codeB = "Comando en *[ eliminación ]*..."
let codeC = "Comando de *[ desarrollo ]*..."
await conn.sendMessage(m.chat, { text: codeC }, { quoted: m })
}
handler.command = ["img!", "c_img"]
export default handler
