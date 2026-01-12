let handler = async (m, { args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
if (!args[0]) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una cantidad valida de tus *[ 💵 ${currency} ]* en el banco para retirarlo.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.torucoin += count * 1
await conn.sendMessage(m.chat, { text: `Has retirado todos tus *[ 💵 ${currency} ]* con exito.\n- Cantidad retirada: *$${count.toLocaleString()}* ${currency}` }, { quoted: m })
return !0
}
if (!Number(args[0])) return conn.sendMessage(m.chat, { text: `Debe de proporcionar un numero valido para tetirar sus *${currency}* en el banco.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
let count = parseInt(args[0])
if (!user.bank) return conn.sendMessage(m.chat, { text: `No tienes esa cantidad de *[ 💵 ${currency} ]* en el banco.` }, { quoted: m })
if (user.bank < count) return conn.sendMessage(m.chat, { text: `Cantidad insuficiente, solo tienes *[ 💵 ${user.bank} ${currency} ]* en tu banco.` }, { quoted: m })
user.bank -= count * 1
user.torucoin += count * 1
await conn.sendMessage(m.chat, { text: `Has retirado tus *[ 💵 ${currency} ]* con exito.\n- Cantidad retirada: *$${count.toLocaleString()}* ${currency}` }, { quoted: m })
}
handler.command = ['ret', 'retirar']
handler.group = true
export default handler
