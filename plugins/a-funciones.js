let handler = async (m, {conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text}) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = command.toLowerCase()
let isEnable = chat[type] !== undefined ? chat[type] : false
if (args[0] === 'on' || args[0] === 'enable') {
if (isEnable) return conn.sendMessage(m.chat, { text: `📍  El comando *(${type})* ya esta activo para ${isAll ? 'todos los chats' : 'este chat'}.` }, { quoted: m })
isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
if (!isEnable) return conn.sendMessage(m.chat, { text: `📍  El comando *(${type})* ya esta desactivado para ${isAll ? 'todos los chats' : 'este chat'}.` }, { quoted: m })
isEnable = false
} else {
let funciones = `\t〩  *F U N C I O N E S*

\t𝇈 📍 \`\`\`Funciones para el bot.\`\`\`

\t\t⚶ Por ejemplo:
\t*#${command}* on

------- Funciones :
${readMore}
✎ *Bienvenidas:*
\t⧡ #c-welcome *(on/off)*

✎ *Modo Admin:*
\t⧡ #c-admin *(on/off)*

✎ *Detector:*
\t⧡ #c-detect *(on/off)*

✎ *Anti Enlaces:*
\t⧡ #c-link *(on/off)*

✎ *Modo RPG:*
\t⧡ #c-rpg *(on/off)*

✎ *Anti Privado:*
\t⧡ #c-priv *(on/off)*

✎ *Servidores:*
\t⧡ #c-server *(on/off)*`

return conn.sendMessage(m.chat, { text: funciones }, { quoted: m })
}
let isAll = false
switch (type) {
case 'c-welcome':
case 'fc-welcome': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
}
case 'c-admin':
case 'fc-admin': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fAdmin = isEnable
break
}
case 'c-view':
case 'fc-view': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fViewonce = isEnable
break
}
case 'c-priv':
case 'fc-priv': {
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.fPrivado = isEnable
break
}
case 'c-acept':
case 'fc-acept': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fAceptar = isEnable
break
}
case 'c-refuse':
case 'fc-refuse': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fRechazar = isEnable
break
}
case 'c-bot': 
case 'fc-bot': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fChatgp = isEnable
break
}
case 'c-dl':
case 'fc-dl': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fDescargas = isEnable
break
}
case 'c-detect':
case 'fc-detect': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
}
case 'c-link':
case 'fc-link': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fEnlaces = isEnable
break
}
case 'c-menu':
case 'fc-menu': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fMenu = isEnable
break
}
case 'c-rpg':
case 'fc-rpg': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fRpg = isEnable
break
}
case 'c-game':
case 'fc-game': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fJuegos = isEnable
break
}}
chat[type] = isEnable

let toruAc = `\t〩  *F U N C I O N*

𝇈 *Comando* : ${type}
𝇈 *Funcion* : ${isEnable ? 'activado' : 'desactivado'}
𝇈 *Para* : ${isAll ? 'todos los chats' : 'en este chat'}

> ${textbot}`
await conn.sendMessage(m.chat, { text: toruAc }, { quoted: m })
}

handler.command = [
"is",
"c-welcome", "fc-welcome",
"c-admin", "fc-admin",
"c-view", "fc-view",
"c-priv", "fc-priv",
"c-acept", "fc-acept",
"c-refuse", "fc-refuse",
"c-latam", "fc-latam",
"c-bot", "fc-bot",
"c-dl", "fc-dl",
"c-detect", "fc-detect",
"c-link", "fc-link",
"c-menu", "fc-menu",
"c-rpg", "fc-rpg",
"c-game", "fc-game",
"f-welcome", "fc-welcome"
]

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
  
