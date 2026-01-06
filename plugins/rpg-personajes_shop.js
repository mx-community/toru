import fs from 'fs';
const personajes = require('./rpg-personajes.js');

const dbFile = './database.json';
const dbData = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile)) : { users: {} };

global.db = dbData;

let handler = async (m, { conn, usedPrefix, command, args }) => {
let users = global.db.users;
let userId = m.sender;

if (!users[userId]) {
users[userId] = {
boletos: 0,
personajes: {}
};
fs.writeFileSync(dbFile, JSON.stringify(dbData, null, 2));
}

if (command === 'shop!') {
if (args.length < 1) {
m.reply(`Uso: ${usedPrefix}comprar <nombre del personaje>`);
return;
}

let nombrePersonaje = args.join(' ').toLowerCase();
let personaje = Object.values(personajes.personajes).find(p => p.nombre.toLowerCase().includes(nombrePersonaje));

if (!personaje) {
m.reply(`El personaje "${nombrePersonaje}" no existe.`);
return;
}

if (users[userId].personajes[personaje.nombre]) {
m.reply(`Ya tienes a ${personaje.nombre}.`);
return;
}

if (users[userId].boletos < personaje.valor) {
m.reply(`No tienes suficientes boletos para comprar a ${personaje.nombre}. Necesitas ${personaje.valor} boletos.`);
return;
}

users[userId].personajes[personaje.nombre] = {
nombre: personaje.nombre,
rareza: personaje.rareza,
valor: personaje.valor
};

users[userId].boletos -= personaje.valor;
fs.writeFileSync(dbFile, JSON.stringify(dbData, null, 2));
m.reply(`¡Felicidades! Has comprado a ${personaje.nombre} por ${personaje.valor} boletos.`);
}
};

handler.command = ['shop!'];
export default handler;
                       
