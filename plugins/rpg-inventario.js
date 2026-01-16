import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/5fvcw6.jpg`)).arrayBuffer())

let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `El usuario no se encuentra en la base de datos.` }, { quoted: m })

let user = global.db.data.users[who]
let torucoin = user.torucoin || 0
let bank = user.bank || 0
let bankk = user.bankk || 0
let level = user.level || 0
let tawbot = user.tawbot || 0
let puntos = user.puntos || 0
let toruexp = user.toruexp || 0
let torullave = user.torullave || 0
let boletos = user.boletos || 0
let cupones = user.cupones || 0
let mistick = user.dlstickers || 0
let toruvela = user.toruvela || 0
let torucora = user.torucora || 0
let toruregal = user.toruregal || 0
let torupiesa = user.torupiesa || 0
let torupesc = user.torupesc || 0

const texto = `\t\t【  *I N V E N T A R I O*  】

\t々 *Balance:*
💵 ${currency} : *${toNum(user.torucoin)}*
🪙 ${currency2} : *${toNum(user.toruexp)}*

\t々 *Banco:*
💵 ${currency} : *${toNum(user.bank)}* (bank)
🪙 ${currency2} : *${toNum(user.bankk)}* (bank)
${readMore}
\t々 *Necesarios:*
💠 Fragmentos : *${toNum(user.tawbot)}*
🌀 Puntos : *${toNum(user.puntos)}*

\t々 *Recursos:*
🗝️ Llaves : *${torullave.toLocaleString()}*
🧩 Piesas : *${torupiesa.toLocaleString()}*
🕯️ Velas : *${toruvela.toLocaleString()}*
🎁 Regalos : *${toruregal.toLocaleString()}*
🧧 Boletos : *${boletos.toLocaleString()}*
🎟️ Cupones : *${cupones.toLocaleString()}*
❤️ Corazones : *${torucora.toLocaleString()}*
🐟 Pescados : *${torupesc.toLocaleString()}*

> ${textbot}`
await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⫶☰  I N V E N T A R I O", body: `🎒 Hola @${name}, este es tu inventario.`, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.command = ['inventario', 'inv'] 
handler.group = true 

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
                                                                              
function toNum(number) {
if (number >= 1000 && number < 1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number >= 1000000) { return (number / 1000000).toFixed(1) + 'M' } else if (number <= -1000 && number > -1000000) { return (number / 1000).toFixed(1) + 'k' } else if (number <= -1000000) { return (number / 1000000).toFixed(1) + 'M' } else { return number.toString() }}

