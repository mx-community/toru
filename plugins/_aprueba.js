let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let items = {
    "boletos": { dbName: "boletos", emoji: "🧧" },
    "velas": { dbName: "toruvela", emoji: "🕯️" },
    "piesas": { dbName: "torupiesa", emoji: "🧩" }
  }
  let precios = {
    "boletos": 10,
    "velas": 10,
    "piesas": 10
  }

  if (!text) return conn.sendMessage(m.chat, { text: "Por favor, ingresa el nombre del ítem y la cantidad" }, { quoted: m })

  let [item, cantidad] = text.split(" ")
  item = item.toLowerCase()

  if (!items[item]) return conn.sendMessage(m.chat, { text: "Ítem no encontrado" }, { quoted: m })

  cantidad = parseInt(cantidad)
  if (isNaN(cantidad) || cantidad <= 0) return conn.sendMessage(m.chat, { text: "Cantidad inválida" }, { quoted: m })

  let precioTotal = precios[item] * cantidad
  if (user.coin < precioTotal) return conn.sendMessage(m.chat, { text: `No tienes suficientes fragmentos (${precioTotal} necesarios) para comprar ${cantidad} ${items[item].emoji} ${item}` }, { quoted: m })

  user.coin -= precioTotal
  user[items[item].dbName] += cantidad

  conn.sendMessage(m.chat, { text: `Has comprado ${cantidad} ${items[item].emoji} ${item} por ${precioTotal} fragmentos` }, { quoted: m })
}

handler.command = ["shop"]
export default handler
