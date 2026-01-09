//import emojis from './rpg-emojis.js'
import fetch from 'node-fetch'
let handler = async (m, { args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
if (!args[0]) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione la cantidad de *[ 💵 ${currency} ]* para transferir.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
if ((args[0]) < 1) return conn.sendMessage(m.chat, { text: `Debes ingresar una cantidad valida de *[ 💵 ${currency} ]* para depositar.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
if (args[0] == 'all') {
let count = parseInt(user.torucoin)
user.torucoin -= count * 1
user.bank += count * 1
await conn.sendMessage(m.chat, { text: `Depositaste todos tus *[ 💵 ${currency} ]* con exito.` }, { quoted: m })
return !0
}
if (!Number(args[0])) return conn.sendMessage(m.chat, { text: `Debes usar numeros para la cantidad de *[ 💵 ${currency} ]* para depositar.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
let count = parseInt(args[0])
if (!user.torucoin) return conn.sendMessage(m.chat, { text: `No tienes suficientes *[ 💵 ${currency} ]* para transferir.\n- Solo tienes 💵 *${user.torucoin} ${currency}* en tu inventario.` }, { quoted: m })
if (user.torucoin < count) return conn.sendMessage(m.chat, { text: `Solo tienes *[ 💵 ${user.torucoin} ${currency} ]* en tu inventario, no es suficiente.` }, { quoted: m })
user.torucoin -= count * 1
user.bank += count * 1
await conn.sendMessage(m.chat, { text: `Depositaste *[ 💵 ${count} ${currency} ]* con exito al banco.` }, { quoted: m })
}

handler.command = ['depositar', 'd', 'dep']
handler.group = true

export default handler
