let handler = async (m, {conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text}) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = command.toLowerCase()
let isEnable = chat[type] !== undefined ? chat[type] : false
if (args[0] === 'on' || args[0] === 'enable') {
if (isEnable) return conn.sendMessage(m.chat, { text: `📍  El comando ya esta activo...` }, { quoted: m })
isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
if (!isEnable) return conn.sendMessage(m.chat, { text: `📍  El comando ya esta desactivado...` }, { quoted: m })
isEnable = false
} else {
let funciones = `\t〩  *F U N C I O N E S*

\t𝇈 📍 \`\`\`Funciones para el bot.\`\`\`

\t＃ *Tipo* Interactivo
\t＃ *Funciones* : *4* results

\t⚶ Por ejemplo:
*${usedPrefix command}* on

------- Funciones :
${readMore}
> ✎ *Bienvenidas:*  #c-welcome *(on/off)*
> ✎ *Modo Admin:*  #c-admin *(on/off)*
> ✎ *Detector:*  #c-detect *(on/off)*
> ✎ *Anti Enlaces:*  #c-link *(on/off)*

> ${textbot}`

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
}
chat[type] = isEnable

let toruAc = `${type} = ${isEnable ? 'true' : 'false'}`
await conn.sendMessage(m.chat, { text: toruAc }, { quoted: m })
}

handler.command = [
"c-welcome", "fc-welcome",
"c-admin", "fc-admin",
"c-link", "fc-link",
"c-welcome", "fc-welcome"
]

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
  
