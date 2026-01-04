let esperandoRespuesta = {};

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const name = await conn.getName(m.sender);

  if (command === 'prueva') {
    esperandoRespuesta[m.sender] = true;
    await conn.sendMessage(m.chat, { text: 'Mensaje de prueba, responda con *Hola:* hola' }, { quoted: m });
  } else if (esperandoRespuesta[m.sender] && text.toLowerCase() === 'hola') {
    esperandoRespuesta[m.sender] = false;
    await conn.sendMessage(m.chat, { text: '¡Hola! ¿En qué puedo ayudarte?' }, { quoted: m });
  }
};

handler.command = ['prueva'];

export default handler;
