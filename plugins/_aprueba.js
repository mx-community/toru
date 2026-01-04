let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const name = await conn.getName(m.sender);
  const regex = /^hola$/i;

  if (m.quoted && regex.test(m.quoted.text)) {
    // Si el mensaje es una respuesta al mensaje del bot y coincide con "hola"
    await conn.sendMessage(m.chat, { text: '¡Hola! ¿Cómo estás?' }, { quoted: m });
  } else {
    // Si no es una respuesta o no coincide con "hola"
    let xd = `Mensaje de prueba, responda con *Hola:* hola`;
    await conn.sendMessage(m.chat, { text: xd }, { quoted: m });
  }
};

handler.command = ['prueva'];
export default handler;
