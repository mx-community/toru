let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let personajes = {
    "tawc": { nombre: "Guts", rareza: "Común", valor: 1988 },
    "tawc2": { nombre: "Miyamoto", rareza: "Raro", valor: 3988 },
    "tawc3": { nombre: "Takeda", rareza: "Épico", valor: 5988 }
  }

  let mensaje = "Personajes comprados:\n"
  let comprado = false
  for (let dbName in personajes) {
    if (user[dbName]) {
      mensaje += `${personajes[dbName].nombre} = *(${personajes[dbName].rareza})*\n`
      comprado = true
    }
  }

  if (!comprado) mensaje = "No has comprado ningún personaje"

  conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.command = ['info!']
handler.group = true
export default handler
