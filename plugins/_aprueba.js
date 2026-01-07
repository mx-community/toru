let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let items = {
    "boletos": { dbName: "boletos", emoji: "🧧", precio: 10, moneda: "torucoin" },
    "velas": { dbName: "toruvela", emoji: "🕯️", precio: 10, moneda: "torucoin" },
    "piesas": { dbName: "torupiesa", emoji: "🧩", precio: 10, moneda: "toruexp" }
  }

  if (!text) return conn.sendMessage(m.chat, { text: "Por favor, ingresa el nombre del ítem y la cantidad" }, { quoted: m })

  let [item, cantidad] = text.split(" ")
  item = item.toLowerCase()

  if (!items[item]) return conn.sendMessage(m.chat, { text: "Ítem no encontrado" }, { quoted: m })

  cantidad = parseInt(cantidad)
  if (isNaN(cantidad) || cantidad <= 0) return conn.sendMessage(m.chat, { text: "Cantidad inválida" }, { quoted: m })

  let precioTotal = items[item].precio * cantidad
  if (user[items[item].moneda] < precioTotal) {
    let emojiMoneda = items[item].moneda === "coin" ? "💎" : "⚡"
    return conn.sendMessage(m.chat, { text: `No tienes suficientes ${emojiMoneda} ${items[item].moneda === "torucoin" ? "Fragmentos" : "Exp"} (${precioTotal} necesarios) para comprar ${cantidad} ${items[item].emoji} ${item}` }, { quoted: m })
  }

  user[items[item].moneda] -= precioTotal
  user[items[item].dbName] += cantidad

  conn.sendMessage(m.chat, { text: `Has comprado ${cantidad} ${items[item].emoji} ${item} por ${precioTotal} ${items[item].moneda === "coin" ? "Fragmentos" : "Exp"}` }, { quoted: m })
}

handler.command = ["shop"]
export default handler
      
