let handler = async (m, { conn, text, args, usedPrefix, command, isRowner }) => {
if (!global.db.data.chats[m.chat].fEdits && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Debes comprar un plan con edición incluida.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.` }, { quoted: m })
}

const newCanal = m.text.trim().split(' ').slice(1).join(' ');
if (!newCanal) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo enlace de canal para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://whatsapp.com/channel/xxxx` }, { quoted: m });
};

if (!/^(https?:\/\/)?(www\.)?(whatsapp\.com\/channel)\//i.test(newCanal)) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m });
await m.react("⏰");
global.botcanal = newCanal;
conn.sendMessage(m.chat, { text: `✓ Listo...` }, { quoted: m });
await m.react("✅");
};

handler.command = ['new-ch']; 
handler.admin = true;
export default handler;
