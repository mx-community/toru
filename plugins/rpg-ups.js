import fetch from 'node-fetch'
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let user = global.db.data.users[m.sender]
let exito, noXd, imagen
if (command === "pico") {
if (!args[0]) {
let pico = `· ┄ · ⊸ 𔓕 *Pico  :  RPG*
- _Mejora tu pico de minería._

> 〩 *Durabilidad:*
\t⛏️ *${user.torupico}%*

● Mejora  :  *$50 ${currency2}*
● Utilidad  :  *#minar, #mining*
● Consumo  :  *-10% por mina*

> Usa *(${usedPrefix + command} --up)* para mejorar la durabilidad.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/bt96yl.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: pico, mentions: [m.sender], contextInfo: { externalAdReply: { title: "PICO  :  RPG", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--up") {
if (user.toruexp >= 50) {
user.torupico += 50
user.toruexp -= 50
exito = `Mejoraste el *[ ⛏️ Pico ]* en +50 puntos de durabilidad.`
return conn.sendMessage(m.chat, { text: exito }, { quoted: m })
} else {
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/r0t9ng.jpg`)).arrayBuffer())
noXd = `No tienes suficientes *[ 🪙 ${currency2} ]* para mejorar el pico.\n- Solo tienes 🪙 *${user.toruexp} ${currency}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Sin estrellas suficientes!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}
}
}

if (command === "espada") {
if (!args[0]) {
let espada = `· ┄ · ⊸ 𔓕 *Espada  :  RPG*
- _Mejora tu espada de batalla._

> 〩 *Durabilidad:*
\t🗡️ *${user.toruesp}%*

● Mejora  :  *$50 ${currency2}*
● Utilidad  :  *#hunt, #cazar*
● Consumo  :  *-10% por cazar*

> Usa *(${usedPrefix + command} --up)* para mejorar la durabilidad.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/36pk4m.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: espada, mentions: [m.sender], contextInfo: { externalAdReply: { title: "ESPADA  :  RPG", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--up") {
if (user.toruexp >= 50) {
user.toruesp += 50
user.toruexp -= 50
exito = `Mejoraste la *[ 🗡️ Espada ]* en +50 puntos de durabilidad.`
return conn.sendMessage(m.chat, { text: exito }, { quoted: m })
} else {
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/r0t9ng.jpg`)).arrayBuffer())
noXd = `No tienes suficientes *[ 🪙 ${currency2} ]* para mejorar el pico.\n- Solo tienes 🪙 *${user.toruexp} ${currency}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Sin estrellas suficientes!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}
}
}

if (command === "hacha") {
if (!args[0]) {
let hacha = `· ┄ · ⊸ 𔓕 *Hacha  :  RPG*
- _Mejora tu hacha de trabajo._

> 〩 *Durabilidad:*
\t🪓 *${user.toruach}%*

● Mejora  :  *$50 ${currency2}*
● Utilidad  :  *#madera, #talar*
● Consumo  :  *-10% por talar*

> Usa *(${usedPrefix + command} --up)* para mejorar la durabilidad.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/pg6w1t.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: hacha, mentions: [m.sender], contextInfo: { externalAdReply: { title: "HACHA  :  RPG", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--up") {
if (user.toruexp >= 50) {
user.toruach += 50
user.toruexp -= 50
exito = `Mejoraste el *[ 🪓 Hacha ]* en +50 puntos de durabilidad.`
return conn.sendMessage(m.chat, { text: exito }, { quoted: m })
} else {
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/r0t9ng.jpg`)).arrayBuffer())
noXd = `No tienes suficientes *[ 🪙 ${currency2} ]* para mejorar el pico.\n- Solo tienes 🪙 *${user.toruexp} ${currency}* en tu inventario.`
return conn.sendMessage(m.chat, { text: noXd, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Sin estrellas suficientes!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}
}
}

}

handler.command = ['pico', 'espada', 'hacha']
handler.group = true

export default handler

