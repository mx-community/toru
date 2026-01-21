let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ rpg ]* estan desactivados...` }, { quoted: m })
}

let user = global.db.data.users[m.sender]
let info, imagen, noXd
if (!args[0]) {
info = `· ┄ · ⊸ 𔓕 *Shop  :  Herramientas*
- _Compra las herramientas necesarias con *(${currency2})*._

• ⛏️ *Pico* : $50
• 🗡️ *Espada* : $50
• 🪓 *Hacha* : $50

\t⚶ Por ejemplo:
*${usedPrefix + command}* hacha

> ${textbot}`
await conn.sendMessage(m.chat, { text: info }, { quoted: m })
} else if (args[0] === "pico") {
if (user.toruexp >= 50) {
user.toruexp -= 50
user.torupico += 50
info = `Has comprado *[ ⛏️ 1 Pico ]* por 50 *${currency2}* con exito.\n- Usa *${usedPrefix}pico* para ver los detalles.`
return conn.sendMessage(m.chat, { text: info }, { quoted: m })
} else {
noXd = `No tienes suficientes *[ ${toem2} ${currency2} ]* para comprar el item.\n- Solo tienes ${toem2} *${user.toruexp} ${currency2}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
 }
} else if (args[0] === "espada") {
if (user.toruexp >= 50) {
user.toruexp -= 50
user.toruesp += 50
info = `Has comprado *[ 🗡️ 1 Espada ]* por 50 *${currency2}* con exito.\n- Usa *${usedPrefix}espada* para ver los detalles.`
return conn.sendMessage(m.chat, { text: info }, { quoted: m })
} else {
noXd = `No tienes suficientes *[ ${toem2} ${currency2} ]* para comprar el item.\n- Solo tienes ${toem2} *${user.toruexp} ${currency2}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
 }
} else if (args[0] === "hacha") {
if (user.toruexp >= 50) {
user.toruexp -= 50
user.toruach += 50
info = `Has comprado *[ 🪓 1 Hacha ]* por 50 *${currency2}* con exito.\n- Usa *${usedPrefix}hacha* para ver los detalles.`
return conn.sendMessage(m.chat, { text: info }, { quoted: m })
} else {
noXd = `No tienes suficientes *[ ${toem2} ${currency2} ]* para comprar el item.\n- Solo tienes ${toem2} *${user.toruexp} ${currency2}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd }, { quoted: m })
 }
}
}

handler.command = ['rpg']
handler.group = true
export default handler

