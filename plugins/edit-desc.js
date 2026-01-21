let handler = async (m, { conn, usedPrefix, command, text, args, isRowner }) => {
if (!global.db.data.chats[m.chat].fEdits && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Debes comprar un plan con edición incluida.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.` }, { quoted: m })
}

const newDesc = m.text.trim().split(' ').slice(1).join(' ');
if (!newDesc) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una nueva descripción para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Inteligencia Artificial.` }, { quoted: m });
};

await m.react("⏰");
global.textbot = newDesc;
conn.sendMessage(m.chat, { text: `✓ Listo...` }, { quoted: m })
await m.react("✅");
};

handler.command = ['new-desc']; 
handler.admin = true;
export default handler;
