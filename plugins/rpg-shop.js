import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
let items = {
"boletos": { dbName: "boletos", emoji: "🧧" },
"velas": { dbName: "toruvela", emoji: "🕯️" },
"regalos": { dbName: "toruregal", emoji: "🎁" },
"pescados": { dbName: "torupesc", emoji: "🐟" },
"corazones": { dbName: "torucora", emoji: "❤️" },
"cupones": { dbName: "cupones", emoji: "🎟️" },
"fragmentos": { dbName: "tawbot", emoji: "💠" },
"puntos": { dbName: "puntos", emoji: "🌀" },
"llaves": { dbName: "torullave", emoji: "🗝️" },
"piesas": { dbName: "torupiesa", emoji: "🧩" }
}
let precios = {
"boletos": 10,
"velas": 10,
"llaves": 25,
"fragmentos": 1,
"puntos": 2,
"pescados": 5,
"corazones": 3,
"cupones": 65,
"regalos": 45,
"piesas": 10
}

let listados = `· ┄ · ⊸ 𔓕 *Tienda  :  Shop*
- Compra items que requieras con *(${currency})*.

\t⚶ Por ejemplo:
*${usedPrefix + command}* boletos 1
${readMore}
> 〩 *Items y precios:*
🧧 *Boletos*  :  $10 
🧩 *Piesas*  :  $10 
🕯️ *Velas*  :  $10 
❤️ *Corazones*  :  $3 
🗝️ *Llaves*  :  $25 
💠 *Fragmentos*  :  $1 
🌀 *Puntos*  :  $2 
🐟 *Pescados*  :  $5 
🎁 *Regalos*  :  $45
🎟️ *Cupones*  :  $65

📍  Usa *${usedPrefix}rpg* para comprar herramientas necesarias.

> ${textbot}`
  
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/0t5dev.jpg`)).arrayBuffer())
if (!text) return await conn.sendMessage(m.chat, { text: listados, mentions: [m.sender], contextInfo: { externalAdReply: { title: "〩  S H O P  〩", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

let [item, cantidad] = text.split(" ")
item = item.toLowerCase()

if (!items[item]) return conn.sendMessage(m.chat, { text: "El item no existe en la lista de items." }, { quoted: m })

cantidad = parseInt(cantidad)
if (isNaN(cantidad) || cantidad <= 0) return conn.sendMessage(m.chat, { text: `La cantidad no es valida, use solo números.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* boletos 1` }, { quoted: m })

let precioTotal = precios[item] * cantidad
if (user.torucoin < precioTotal) return conn.sendMessage(m.chat, { text: `No tienes suficientes *[ 𔓕 ${currency} ]* para comprar el item.\n- Necesitas *𔓕 ${precioTotal} ${currency}* para comprar *[ ${items[item].emoji} ${cantidad} ${item} ]* en la tienda.` }, { quoted: m })

user.torucoin -= precioTotal
user[items[item].dbName] += cantidad

conn.sendMessage(m.chat, { text: `Has comprado *[ ${items[item].emoji} ${cantidad} ${item} ]* con exito.\n- Por *[ 𔓕 ${precioTotal} ${currency} ]* gastados.` }, { quoted: m })
}

handler.command = ["shop"]
handler.group = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
