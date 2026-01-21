let handler = async (m, { conn, text, args, usedPrefix, command, isRowner }) => {
const newGrupo = m.text.trim().split(' ').slice(1).join(' ');
if (!newGrupo) {
return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo nombre para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Toru` }, { quoted: m });
};

if (!/^(https?:\/\/)?(www\.)?(chat\.whatsapp\.com)\//i.test(newGrupo)) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })

global.botgroup = newGrupo;
conn.sendMessage(m.chat, { text: `✓ Listo...` }, { quoted: m })
};

handler.command = ['new-group']; 
handler.admin = true;
export default handler;
