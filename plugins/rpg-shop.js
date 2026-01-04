import fetch from 'node-fetch'
let handler = async (m, {command, conn, usedPrefix, args}) => {
let user = global.db.data.users[m.sender]

const items = {
buy: {
boletos: {torucoin: 7}, toruexp: {tawbot: 15}, rangos: {puntos: 500}, nivele: {puntos: 300},
torucoin: {tawbot: 10}, toruvela: {torucoin: 5}, torucora: {torucoin: 5},
torullave: {boletos: 5}, torupesc: {torucoin: 3}, toruregal: {boletos: 10},
tawbot: {toruexp: 3}, cupones: {torucoin: 50},
torupasti: {torucora: 1}, puntos: {toruexp: 3}, torupiesa: {torucoin: 15}
},

sell: {
boletos: {torucoin: 7}, toruexp: {tawbot: 15}, rangos: {puntos: 500}, nivele: {puntos: 300},
torucoin: {tawbot: 10}, toruvela: {torucoin: 5}, torucora: {torucoin: 5},
torullave: {boletos: 5}, torupesc: {torucoin: 3}, toruregal: {boletos: 10},
tawbot: {toruexp: 3}, cupones: {torucoin: 50},
torupasti: {torucora: 1}, puntos: {toruexp: 3}, torupiesa: {torucoin: 15}
}
}

const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))

const thumbBase = Buffer.from(await (await fetch(`https://qu.ax/hNADg.jpg`)).arrayBuffer())
let textBase = `\t〩 \`TIENDA : SHOP\`
- Compra algunos elementos, sube de nivel o aprovecha las recompensas.

> Compra o vende con *(𔓕 ${currency})*.
🧧 *Boletos* : $7
🕯️ *Vela* : $5
❤️ *Corazon* : $5
🐟 *Pescado* : $3
🧩 *Piesa* : $15
🎟️ *Cupon* : $50

> Compra o vende con *(✩ ${currency2})*
💠 *Fragmento* : $3
🌀 *Puntos* : $3

> Compra con *(🧧 Boletos)*
🗝️ *Llave* : $5
🎁 *Regalo* : $10

> Compra o vende con *(❤️ Corazones)*
💊 *Pastillas* : $1

> Compra o vende con *(💠 Fragmentos)*
𔓕 *${currency}* : $10
✩ *${currency2}* : $15

> Compra o vende con *(🌀 Puntos)*
🜲 *Rango* : $500
𖡛 *Nivel* : $300

⚶ Por ejemplo:
*${usedPrefix}buy* boletos 5
*${usedPrefix}sell* boletos 5

> ${textbot}`
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/5fvcw6.jpg`)).arrayBuffer())
const item = (args[0] || '').toLowerCase()
const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
let premium = user.premium

if (!listItems[item]) return await conn.sendMessage(m.chat, { text: textBase, mentions: [m.sender], contextInfo: { externalAdReply: { title: "Tienda de artefactos", body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
if (command.toLowerCase() == 'buy') {
let paymentMethod = Object.keys(listItems[item]).find((v) => v in user)
if (user[paymentMethod] < listItems[item][paymentMethod] * total)
let insuficienteResp = `📍  No tienes el recurso suficiente para realizar el proceso.
- Necesitas una cantidad valida para continuar.

𝇈 *Necesitas* : ${listItems[item][paymentMethod] * total - user[paymentMethod]} ${paymentMethod}
𝇈 *Para* : ${total} ${item}

> Solo tienes *(${user[paymentMethod]} ${paymentMethod})* en tu inventario.`
return conn.sendMessage(m.chat, { text: insuficienteResp }, { quoted: m })
user[paymentMethod] -= listItems[item][paymentMethod] * total
user[item] += total
let compradoResp = `· ┄ · ⊸ 𔓕 *Shop  :  Buy*
> ✅ Has comprado el recurso con exito.

𝇈 *Artefacto* : ${item}
𝇈 *Cantidad* : ${total}
𝇈 *Gastos* : ${listItems[item][paymentMethod] * total} de *${paymentMethod}*

> ${textbot}`
await conn.sendMessage(m.chat, { text: compradoResp }, { quoted: m })
} else {
if (user[item] < total)
let respNo = `📍  No tienes la cantidad requerida para vender el artefacto.
- Solo tienes *(${user[item]} ${item})* en tu inventario.`
return conn.sendMessage(m.chat, { text: respNo }, { quoted: m })
let paymentMethod = Object.keys(listItems[item]).find((v) => v in user)
user[item] -= total
user[paymentMethod] += listItems[item][paymentMethod] * total
let vendidoResp = `· ┄ · ⊸ 𔓕 *Shop  :  Sell*
> ✅ Has vendido el recurso con exito.

𝇈 *Vendido* : ${item}
𝇈 *Cantidad* : ${total}
𝇈 *Ganancias* : *${listItems[item][paymentMethod] * total} *${paymentMethod}*

📍  Ahora tienes *(${user[paymentMethod]} ${paymentMethod})* en tu inventario.

> ${textbot}`
await conn.sendMessage(m.chat, { text: vendidoResp }, { quoted: m })
}
}

handler.command = ["buy", "sell"]
handler.disabled = false

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = hours < 10 ? '0' + hours : hours
minutes = minutes < 10 ? '0' + minutes : minutes
seconds = seconds < 10 ? '0' + seconds : seconds

return minutes + ' minutos y ' + seconds + ' seg '
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

function isNumber(number) {
if (!number) return number
number = parseInt(number)
return typeof number == 'number' && !isNaN(number)
}
