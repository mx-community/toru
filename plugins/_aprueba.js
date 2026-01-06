let handler = async (m, { conn, usedPrefix, text, command, args }) => {
  let texto = await m.mentionedJid;
  let userId = texto?.length > 0 ? texto[0] : (m.quoted ? m.quoted.sender : m.sender);

  if (!global.db.data.users[userId]) {
    m.reply(`El usuario ${userId} no está en la base de datos.`);
    return;
  }

  const user = global.db.data.users[userId];
  let name = user.name || (await conn.getName(userId).catch(() => userId.split('@')[0]));

  if (args.length < 2) {
    m.reply(`Uso: ${usedPrefix}give! @usuario boletos <cantidad>`);
    return;
  }

  let cantidad = parseInt(args[1]);
  if (isNaN(cantidad) || cantidad <= 0) {
    m.reply(`La cantidad debe ser un número positivo.`);
    return;
  }

  user.boletos = (user.boletos || 0) + cantidad;
  global.db.save();
  m.reply(`Se han agregado ${cantidad} boletos a ${name}. Ahora tiene ${user.boletos} boletos.`);
};

handler.command = ['give!'];
handler.rowner = true;
export default handler;
  
