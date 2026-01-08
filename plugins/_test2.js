let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let personajes = {
    "tawc": { nombre: "Guts", rareza: "Común", valor: 1 },
    "tawc2": { nombre: "Miyamoto", rareza: "Raro", valor: 3 },
    "tawc3": { nombre: "Takeda", rareza: "Épico", valor: 5 }
  }

  let personajesComprados = []
  for (let dbName in personajes) {
    if (user[dbName]) {
      personajesComprados.push(personajes[dbName])
    }
  }

  if (personajesComprados.length === 0) return conn.sendMessage(m.chat, { text: "No has comprado ningún personaje" }, { quoted: m })

  let mensaje = "Personajes comprados:\n"
  let epicos = personajesComprados.filter(p => p.rareza === "Épico")
  let raros = personajesComprados.filter(p => p.rareza === "Raro")
  let comunes = personajesComprados.filter(p => p.rareza === "Común")

  if (epicos.length > 0) {
    mensaje += "> Épico:\n"
    epicos.forEach(p => mensaje += `  - ${p.nombre} (ID: ${Object.keys(personajes).find(key => personajes[key] === p)}) - Valor: ${p.valor}\n`)
  }

  if (raros.length > 0) {
    mensaje += "> Raro:\n"
    raros.forEach(p => mensaje += `  - ${p.nombre} (ID: ${Object.keys(personajes).find(key => personajes[key] === p)}) - Valor: ${p.valor}\n`)
  }

  if (comunes.length > 0) {
    mensaje += "> Común:\n"
    comunes.forEach(p => mensaje += `  - ${p.nombre} (ID: ${Object.keys(personajes).find(key => personajes[key] === p)}) - Valor: ${p.valor}\n`)
  }

  conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.command = ['info!']
handler.group = true
export default handler
