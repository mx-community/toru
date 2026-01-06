import { personajes } from './rpg-personajes.js';

let handler = async (m, { conn, usedPrefix, command, args }) => {
let users = global.db.data.users;
let userId = m.sender;

if (command === 'shop!') {
if (args.length !== 1) {
conn.reply(`Uso: ${usedPrefix}comprar <nombre del personaje>`);
return;
}

let personajeId = args[0].toLowerCase();
let personaje = Object.values(personajes).find(p => p.nombre.toLowerCase() === personajeId);

if (!personaje) {
conn.reply(`El personaje "${personajeId}" no existe.`);
return;
}

if (users[userId].personajes && users[userId].personajes[personaje.nombre]) {
conn.reply(`Ya tienes a ${personaje.nombre}.`);
return;
}

if (users[userId].boletos < personaje.valor) {
conn.reply(`No tienes suficientes boletos para comprar a ${personaje.nombre}. Necesitas ${personaje.valor} boletos.`);
return;
}

if (!users[userId].personajes) {
users[userId].personajes = {};
}

users[userId].personajes[personaje.nombre] = {
nombre: personaje.nombre,
rareza: personaje.rareza,
valor: personaje.valor
};

users[userId].boletos -= personaje.valor;
conn.reply(`¡Felicidades! Has comprado a ${personaje.nombre} por ${personaje.valor} boletos.`);
}
};

handler.command = ['shop!'];
export default handler;
  
