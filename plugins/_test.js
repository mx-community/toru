let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
let personajes = {
"1": { nombre: "Guts", dbName: "tawc", rareza: "Común", valor: 1 },
"2": { nombre: "Miyamoto", dbName: "tawc2", rareza: "Raro", valor: 3 },
"3": { nombre: "Takeda", dbName: "tawc3", rareza: "Épico", valor: 5 }
}

if (!text) return conn.sendMessage(m.chat, { text: "Por favor, ingresa el nombre o ID del personaje que deseas comprar" }, { quoted: m })

let personaje = Object.values(personajes).find(p => p.nombre.toLowerCase() === text.toLowerCase() || p.nombre.toLowerCase().includes(text.toLowerCase()) || text === Object.keys(personajes)[Object.values(personajes).indexOf(p)])
if (!personaje) return conn.sendMessage(m.chat, { text: "Personaje no encontrado" }, { quoted: m })

if (user[personaje.dbName]) return conn.sendMessage(m.chat, { text: `Ya tienes a ${personaje.nombre}` }, { quoted: m })

if (user.boletos < personaje.valor) return conn.sendMessage(m.chat, { text: `No tienes suficientes boletos (${personaje.valor} necesarios) para comprar a ${personaje.nombre}` }, { quoted: m })

user.boletos -= personaje.valor
user[personaje.dbName] = true

conn.sendMessage(m.chat, { text: `Has comprado a ${personaje.nombre} por ${personaje.valor} boletos` }, { quoted: m })
}

handler.command = ['taw']
handler.group = true
export default handler
  
