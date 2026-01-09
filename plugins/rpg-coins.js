// coins.js
//import emojis from './rpg-emojis.js'

const handler = async (m, { conn, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
let mensaje = `· ┄ · ⊸ 𔓕 *Coins  :  Stat*

\t💵 *${currency}* : ${user.torucoin}
\t🪙 *${currency2}* : ${user.toruexp}

> ${text}`
conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.command = ['coins']
handler.group = true
export default handler
