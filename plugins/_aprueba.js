let handler = async (m, { conn, text, command, usedPrefix, args, isRowner }) => {
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

