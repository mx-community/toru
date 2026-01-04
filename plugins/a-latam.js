let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin, isOwner }) => {
let chat = global.db.data.chats[m.chat]

if (command === 'f-latam') {
if (!m.isGroup) return conn.reply(m.chat, `📍  Solo puedes aplicar esta función en chats grupales.`, m)
if (!isAdmin && !isOwner) return conn.reply(m.chat, `📍  Solo los administradores pueden activar esta función.`, m)
if (!isBotAdmin) return conn.reply(m.chat, `📍  Solo funciona si el bot es administrador.\n- No aplica nada si la función solo es para administración.`, m)

let action = args[0]?.toLowerCase()

if (action === 'on') {
chat.fLatam = true
conn.reply(m.chat, `✅ \`\`\`Funcion activado con exito.\`\`\``, m)
} else if (action === 'off') {
chat.fLatam = false
conn.reply(m.chat, `✅ \`\`\`Funcion desactivado con exito.\`\`\``, m)

} else {
let status = chat.fLatam ? 'activo' : 'desactivado'
conn.reply(m.chat, `📍  La funcion ya esta ${status}.`, m)
}
}
}

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
if (!m.isGroup) return 

let chat = global.db.data.chats[m.chat]
if (!chat.fLatam) return

if (isBotAdmin && !isAdmin && !isOwner) {
let badPrefixes = ["212", "234", "92", "93", "967"]
let userNum = m.sender.split('@')[0]

for (let prefix of badPrefixes) {
if (userNum.startsWith(prefix)) {
try {
let soloXd = `\t〩  *SOLO  :  LATAM*

\t⸭ ✅ \`\`\`Un participante fue eliminado exitosamente.\`\`\``
await conn.reply(m.chat, soloXd, m)
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} catch(e) {
console.log(e)
}
return false
}
}
}
}

handler.command = ["c-latam"]
export default handler
