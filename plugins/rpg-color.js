const handler = async (m, { conn, text, command, usedPrefix }) => {
if (!global.db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `✦ Los comandos de *[ RPG ]* estan desactivados.\n- Un administrador puede activarlo con: *#fc-rpg on*` }, { quoted: m })
}
const users = global.db.data.users[m.sender]
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione el valor de la apuesta y el color segun tu preferencia.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 5 verde` }, { quoted: m })
let args = text.trim().split(" ")
if (args.length !== 2) return conn.sendMessage(m.chat, { text: `Formato incorrecto, proporciona el valor de la apuesta y el color a tu preferencia.` }, { quoted: m })
let boletoss = parseInt(args[0])
let color = args[1].toLowerCase()
if (isNaN(boletoss) || boletoss <= 0) return conn.sendMessage(m.chat, { text: `Debe ingresar la cantidad de *[ 🧧 Boletos ]* para jugar.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 5 verde` }, { quoted: m })
if (!(color === 'verde' || color === 'rojo')) return conn.sendMessage(m.chat, { text: `Solo puedes realizar la elección entre el color *"verde"* y *"rojo"*, intentalo de nuevo.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* 5 verde` }, { quoted: m })
if (boletoss > users.boletos) return conn.sendMessage(m.chat, { text: `No tienes *[ 🧧 Boletos ]* en tu inventario.\n- Solo tienes 🧧 *${users.boletos.toLocaleString()} Boletos* en tu inventario.` }, { quoted: m })
const resultColor = Math.random() < 0.5 ? 'verde' : 'rojo'
let ganancias = Math.floor(Math.random() * 15) 
let ganancias2 Math.floor(Math.random() * 15) 
let piesass = Math.floor(Math.random() * 3) 
let boletosss = Math.floor(Math.random() * 15) 
const win = color === resultColor
if (win) {
users.boletos += boletosss
users.torupiesa += piesass
users.torucoin += ganancias
users.toruexp += ganancias2

conn.sendMessage(m.chat, { text: `✅  Lograste ganar por el color *"${resultColor}"*.\n- Obtienes *[ 𔓕 +${ganancias.toLocaleString()} ${currency} ]*, intentalo en la próxima.` }, { quoted: m })
} else {
users.boletos -= boletoss
conn.sendMessage(m.chat, { text: `📍  Te toco el color *"${resultColor}"*.\n- Pierdes tus *[ 🧧 ${boletoss.toLocaleString()} Boletos ]*, intentalo en la próxima.` }, { quoted: m })
}}

handler.command = ['color', 'cl']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
