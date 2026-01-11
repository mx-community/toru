let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let hola = `Hola...`
let ch = `120363424098891946@newsletter`
await conn.sendMessage(ch, { text: hola }, m)
}
handler.command = ["notch"]
export default handler
 
