import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

//let isDatos = /--date|date$/i.test(text || args[0])
//let isRecurs = /--recs|recursos$/i.test(text || args[0])
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/o63bvv.jpg`)).arrayBuffer())
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split(`@`)[0] } catch { return who.split(`@`)[0] } })())()
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `📍  El usuario no se encuentra en la base de datos.` }, { quoted: m })
let user = global.db.data.users[who]
let description = user.description || '✘ (#desc+)'
let cumpleanos = user.birth || '✘'
let genero = user.genre || '✘'
let edad = user.age + ' años' || '✘'
let misocial = user.misocial || '✘ (#red+)'

let monedas = user.torucoin || 0
let experiencia = user.toruexp || 0
let taw = user.tawbot || 0
let taw2 = user.puntos || 0
let taw3 = user.torucora || 0
let taw4 = user.toruvela || 0
let taw5 = user.torupiesa || 0
let taw6 = user.toruregal || 0
let taw7 = user.torupasti || 0
let taw8 = user.boletos || 0
let taw9 = user.torupesc || 0
let taw10 = user.torullave || 0
let taw11 = user.cupones || 0

if (!args[0]) {
const texto = `\t\t【  *P E R F I L*  】
- Perfil de @${name}

> 々 *Detalles:*
𔓕 ${currency} : *${torucoin.toLocaleString()}*
✩ ${currency2} : *${toruexp.toLocaleString()}*
🜲 Rango : *#${rangos.toLocaleString()}*
𖡛 Nivel : *lvl_${nivele.toLocaleString()}*

📍  Puede usar *${usedPrefix + command} --date* o *--recs* para ver tus datos o recursos.

> ${textbot}`
await conn.sendMessage(m.chat, { text: texto, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⫶☰  P E R F I L", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--date") {
let datos = `\t\t【  *P E R F I L*  】
> ${description}

❒ *Nombre* : @${name}
❒ *Edad* : ${edad}
❒ *Genero* : ${genero}
❒ *Cumpleaños* : ${cumpleanos}

*¡Visita mi pagina!*
- ${misocial}

> ${textbot}`
return conn.sendMessage(m.chat, { text: datos, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⫶☰  P E R F I L", body: `👋🏻 ¡Edita tu perfil con #myp!`, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--recs") {
let recursos = `\t\t【  *R E C U R S O S*  】
- Recursos de @${name} 🎒

> 〩 *Balance:*
𔓕 ${currency} : *${monedas.toLocaleString()}*
✩ ${currency2} : *${experiencia.toLocaleString()}*

> 〩 *Recursos:*
💠 Fragmentos : *${taw.toLocaleString()}*
🌀 Puntos : *${taw2.toLocaleString()}*
❤️ Corazones : *${taw3.toLocaleString()}*
🕯️ Velas : *${taw4.toLocaleString()}*
🧩 Piesas : *${taw5.toLocaleString()}*
🎁 Regalos : *${taw6.toLocaleString()}*
💊 Pastillas : *${taw7.toLocaleString()}*
🧧 Boletos : *${taw8.toLocaleString()}*
🐟 Pescados : *${taw9.toLocaleString()}*
🗝️ Llaves : *${taw10.toLocaleString()}*

> 〩 *Valiosos:*
🎟️ Cupones : *${taw11.toLocaleString()}*

> ${textbot}`
return conn.sendMessage(m.chat, { text: recursos, mentions: [m.sender], contextInfo: { externalAdReply: { title: "⫶☰  P E R F I L", body: `🎒 Todos tus recursos aqui.`, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} 
}

handler.command = ['profile', 'perfil'] 
handler.group = true

export default handler


                                                                 

  
