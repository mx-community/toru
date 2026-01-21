let handler = async (m, { conn, usedPrefix }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ rpg ]* estan desactivados...` }, { quoted: m })
}

let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `El usuario no se encuentra en la base de datos.` }, { quoted: m })
let user = global.db.data.users[who]
let torucoin = user.torucoin || 0
let bank = user.bank || 0
let bankk = user.bankk || 0
let total = (user.torucoin || 0) + (user.bank || 0)
let total2 = (user.toruexp || 0) + (user.bankk || 0)
let level = user.level || 0
let toruexp = user.toruexp || 0
const texto = `\t〩  *W A L L E T  :  R P G*
- Balance de @${name}

⚶ *Personal:*
\t${toem} ${currency} : *${torucoin.toLocaleString()}*
\t${toem2} ${currency2} : *${toruexp.toLocaleString()}*

⚶ *Guardado:*
\t${toem} ${currency} : *${bank.toLocaleString()}*
\t${toem2} ${currency2} : *${bankk.toLocaleString()}*

> 📍  Tienes *${total.toLocaleString()} de ${currency}* y *${total2.toLocaleString()} de ${currency2}* en total.`
await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.command = ['bal', 'balance', 'wallet'] 
handler.group = true 

export default handler
