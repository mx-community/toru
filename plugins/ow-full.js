let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!global.db.data.chats[m.chat].fOwners && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ owners ]* estan desactivados...` }, { quoted: m })
}

let users = global.db.data.users
let userId = m.sender
users[userId].torullave += 1000
users[userId].torupiesa += 1000
users[userId].toruvela += 1000
users[userId].tawbot += 1000
users[userId].torucora += 1000
users[userId].puntos += 1000
users[userId].torucoin += 1000
users[userId].toruexp += 1000
users[userId].toruregal += 1000
users[userId].torupiesa += 1000
users[userId].torupesc += 1000
users[userId].cupones += 1000
users[userId].boletos += 1000
await conn.sendMessage(m.chat, { text: 'Success...' }, { quoted: m });
};

handler.command = ['full!'];
handler.rowner = true;
export default handler;

