let handler = async (m, { conn, text, args, usedPrefix, command, isRowner }) => {
if (!global.db.data.chats[m.chat].fEdits && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Debes comprar un plan con edición incluida.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.` }, { quoted: m })
}

const newGrupo = m.text.trim().split(' ').slice(1).join(' ');
if (!newGrupo) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo enlace grupal para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://chat.whatsapp.com/xxxx` }, { quoted: m });
};

if (!/^(https?:\/\/)?(www\.)?(chat\.whatsapp\.com)\//i.test(newGrupo)) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m });
await m.react("⏰");
global.botgroup = newGrupo;
conn.sendMessage(m.chat, { text: `✓ Listo...` }, { quoted: m });
await m.react("✅");
};

handler.command = ['new-group']; 
handler.admin = true;
export default handler;
