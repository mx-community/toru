let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const regex = /^hola$/i;

  if (command === 'prueva') {
    await conn.sendMessage(m.chat, { text: 'Mensaje de prueba, cite este mensaje con "Hola"' }, { quoted: m });
  } else if (m.quoted && m.quoted.fromMe && regex.test(m.text)) {
    await conn.sendMessage(m.chat, { text: '¡Hola! ¿En qué puedo ayudarte?' }, { quoted: m });
  }
};

handler.command = ['prueva'];

export default handler;
