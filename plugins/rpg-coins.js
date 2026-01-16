// coins.js
//import emojis from './rpg-emojis.js'

const handler = async (m, { conn, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
let mensaje = `· ┄ · ⊸ 𔓕 *Coins  :  Stat*

\t💵 *${currency}* : ${toNum(user.torucoin)} *(${user.torucoin})*
\t🪙 *${currency2}* : ${toNum(user.toruexp)} *(${user.toruexp})*

> ${textbot}`
conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.command = ['coins']
handler.group = true
export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number >= 1000000) { return (number / 1000000).toFixed(1) + 'M' } else if (number <= -1000 && number > -1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number <= -1000000) { return (number / 1000000).toFixed(1) + 'M' } else { return number.toString() }}
                                                  
