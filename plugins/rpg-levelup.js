import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}

let user = global.db.data.users[m.sender]
let nivelado, estadistica, monedas, experiencia, piesas, llaves, fragmentos, puntoss, imagen
if (!args[0]) {
let estado = `· ┄ · ⊸ 𔓕 *Nivel  :  Rango*
> ¡Aqui tienes la información de tu nivel y rango!

> *Estado actual:*
𖡛 Nivel : *lvl_${user.nivele}*
🜲 Rango : *#${user.rangos}*

> Usa los siguientes comandos para subir de nivel o rango.
*${usedPrefix + command}* --up
*${usedPrefix + command}* --rk`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/awfqp3.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: estado, mentions: [m.sender], contextInfo: { externalAdReply: { title: "〩 Nivel - Actual 〩", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "--up") {
if (user.tawbot >= 100) {
nivelado = 1
llaves = Math.floor(Math.random() * 2)
monedas = Math.floor(Math.random() * 25)
experiencia = Math.floor(Math.random() * 25)
user.torucoin += monedas
user.toruexp += experiencia
user.torullave += llaves
user.nivele += nivelado
let respNivel = `· ┄ · ⊸ 𔓕 *New  :  Level*
> ¡Subiste de nivel! Aqui tienes tu recompensa.

❒ *Nivel* : +1
❒ *Llaves* : +${llaves.toLocaleString()}
💵 *${currency}* : +${monedas.toLocaleString()}
🪙 *${currency2}* : +${experiencia.toLocaleString()}

> Consigue *[ 💠 100 Fragmentos ]* para subir de nivel y recibir recompensas.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/10bj4k.jpg`)).arrayBuffer())
await await conn.sendMessage(m.chat, { text: respNivel, mentions: [m.sender], contextInfo: { externalAdReply: { title: "𖡛 LEVEL UP 𖡛", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.tawbot -= 100
} else {
let noFrag = `No tienes suficientes *[ 💠 Fragmentos ]* para subir de nivel.\n- Solo tienes 💠 *${user.tawbot} Fragmentos* en tu inventario.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/6x77gd.jpg`)).arrayBuffer())
return conn.sendMessage(m.chat, { text: noFrag, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Insuficientes fragmentos!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 }
} else if (args[0] === "--rk") {
if (user.puntos >= 150) {
estadistica = 1
llaves = Math.floor(Math.random() * 2)
monedas = Math.floor(Math.random() * 25)
experiencia = Math.floor(Math.random() * 25)
user.torucoin += monedas
user.toruexp += experiencia
user.torullave += llaves
user.rangos += estadistica
let respRank = `· ┄ · ⊸ 𔓕 *New  :  Rank*
> ¡Subiste de rango! Aqui tienes tu recompensa.

❒ *Rango* : +1
❒ *Llaves* : +${llaves.toLocaleString()}*
💵 *${currency}* : +${monedas.toLocaleString()}
🪙 *${currency2}* : +${experiencia.toLocaleString()}

> Consigue *[ 🌀 150 Puntos ]* para subir de rango y recibir recompensas.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/10bj4k.jpg`)).arrayBuffer())
await await conn.sendMessage(m.chat, { text: respRank, mentions: [m.sender], contextInfo: { externalAdReply: { title: "𖡛 NEW RANK 𖡛", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
user.puntos -= 150
} else {
let noPunt = `No tienes suficientes *[ 🌀 Puntos ]* para subir de rango.\n- Solo tienes 🌀 *${user.puntos} Puntos* en tu inventario.`
imagen = Buffer.from(await (await fetch(`https://files.catbox.moe/2bndyf.jpg`)).arrayBuffer())
return conn.sendMessage(m.chat, { text: noPunt, mentions: [m.sender], contextInfo: { externalAdReply: { title: "¡Insuficientes puntos!", body: botname, thumbnail: imagen, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
  }
 }
}

handler.command = ['nivel', 'level']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

