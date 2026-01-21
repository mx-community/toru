// coins.js
//import emojis from './rpg-emojis.js'

const handler = async (m, { conn, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ rpg ]* estan desactivados...` }, { quoted: m })
}

let user = global.db.data.users[m.sender]
let mensaje = `· ┄ · ⊸ 𔓕 *Coins  :  Stat*

\t${toem} *${currency}* : ${toNum(user.torucoin)}
\t${toem2} *${currency2}* : ${toNum(user.toruexp)}

> ${textbot}`
conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.command = ['coins']
handler.group = true
export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number >= 1000000) { return (number / 1000000).toFixed(1) + 'M' } else if (number <= -1000 && number > -1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number <= -1000000) { return (number / 1000000).toFixed(1) + 'M' } else { return number.toString() }}
                                                  
