const handler = async (m, { conn, text, usedPrefix, command, args, isROwner }) => {
if (!isROwner) return
const bot = conn.user.jid.split('@')[0]
const users = global.db.data.users
const chats = global.db.data.chats
function no(number) { return number.replace(/\s/g, '').replace(/([@+-])/g, '') }
try {
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : text ? no(text.split(' ')[0]) + '@s.whatsapp.net' : false
switch (command) {
case 'ban+': {
if (!who) return conn.sendMessage(m.chat, { text: `ᗢ Mencione a un usuario para banearlo del bot.` }, { quoted: m })
var reason = 'Sin Especificar'
if (mentionedJid && mentionedJid[0]) {
var mentionIdx = args.findIndex(arg => arg.startsWith('@'))
var reasonArgs = args.slice(mentionIdx + 1).join(' ')
if (reasonArgs.trim()) reason = reasonArgs.trim()
} else if (m.quoted) {
if (args.length) reason = args.join(' ')
} else if (text) {
var parts = text.trim().split(' ')
if (parts.length > 1) reason = parts.slice(1).join(' ')
}
if (who === conn.user.jid) return conn.sendMessage(m.chat, { text: `No puedes usar este comando contra el bot.` }, { quoted: m })
if (global.owner.some(function (x) { return who === x[0] + '@s.whatsapp.net' })) {
return conn.sendMessage(m.chat, { text: `No puedes usar este comando con el propietario del bot.` }, { quoted: m })
}
if (!users[who]) users[who] = {}
if (users[who].banned) return conn.sendMessage(m.chat, { text: `El usuario mencionado ya ha sido baneado anteriormente.` }, { quoted: m })
users[who].banned = true
users[who].bannedReason = reason
var nameBan = await conn.getName(who)
await conn.sendMessage(m.chat, { text: `✓  Listo.` }, { quoted: m })
break
}
case 'ban-': {
if (!who) return conn.sendMessage(m.chat, { text: `ᗢ Mencione a un usuario baneado del bot.` }, { quoted: m })
if (!users[who]) return conn.sendMessage(m.chat, { text: `Lo siento pero el usuario mencionado no esta registrado en la base de datos.` }, { quoted: m })
if (!users[who].banned) return conn.sendMessage(m.chat, { text: `El usuario mencionado no esta baneado.` }, { quoted: m })
users[who].banned = false
users[who].bannedReason = ''
let nameUnban = await conn.getName(who)
await conn.sendMessage(m.chat, { text: `✓  Listo` }, { quoted: m })
break
}
case 'block+': {
if (!who) return conn.sendMessage(m.chat, { text: `ᗢ Mencione a un usuario para bloquearlo del bot.` }, { quoted: m })
await conn.updateBlockStatus(who, 'block')
conn.sendMessage(m.chat, { text: `✓  Listo.` }, { quoted: m })
break
}
case 'block-': {
if (!who) return conn.sendMessage(m.chat, { text: `ᗢ Mencione a un usuario bloqueado del bot.` }, { quoted: m })
await conn.updateBlockStatus(who, 'unblock')
await conn.sendMessage(m.chat, { text: `✓  Listo.` }, { quoted: m })
break
}}} catch (e) {
return conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}

handler.command = ['ban+', 'ban-', 'block+', 'block-']
handler.owner = true
export default handler
