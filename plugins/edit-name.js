let handler = async (m, { conn, usedPrefix, command, text, args, isRowner }) => {
if (!global.db.data.chats[m.chat].fEdits && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Debes comprar un plan con edición incluida.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.` }, { quoted: m })
}

const newName = m.text.trim().split(' ').slice(1).join(' ');
if (!newName) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo nombre para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Toru` }, { quoted: m });
};

await m.react("⏰");
global.botname = newName;
conn.sendMessage(m.chat, { text: `✓ Listo...` }, { quoted: m });
await m.react("✅");
};

handler.command = ['new-name']; 
handler.admin = true;
export default handler;
