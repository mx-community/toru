 let handler = async (m, { conn, usedPrefix, args, text, command, isOwner }) => {

let media = m.quoted ? m.quoted : m;
let mime = (media.msg || media).mimetype || '';

if (command === "bot-img") {
if (!/image\/(jpe?g|png)/i.test(mime)) return conn.sendMessage(m.chat, { text: `ᗢ Responda a una imagen para cambiar el perfil del bot.` }, { quoted: m })
try {
let img = await media.download();
await conn.updateProfilePicture(conn.user.jid, img);
await conn.sendMessage(m.chat, { text: `✅  Perfil establecido con exito.` }, { quoted: m });
m.react("✅");
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m });
 }
}

if (command === "bot-px") {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo prefijo para el bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* /` }, { quoted: m });
try {
global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
return conn.sendMessage(m.chat, { text: `*[ ${text} ]* establecido con éxito.` }, { quoted: m });
await m.react("✅");
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m });
 }
} 

if (command === "bot-desc") {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una nueva biografía para el perfil del bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola, estoy usando WhatsApp.` }, { quoted: m });
try {
await conn.updateProfileStatus(text).catch(_ => _);
conn.sendMessage(m.chat, { text: `✅  Biografía establecido con exito.` }, { quoted: m });
await m.react("✅");
} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m });
 }
}

if (command === "bot-name") {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un nuevo nombre para el perfil del bot.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Simple IA` }, { quoted: m });
try {
await conn.updateProfileName(text);
return conn.sendMessage(m.chat, { text: `✅  Nombre establecido con exito.` }, { quoted: m });
await m.react("✅");
} catch (e) {
console.log(e);
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m });
}
}

if (command === "xbot") {
let noValido = `📍  Aqui tiene una lista de lo que puedes configurar en el numero del bot.


> ⩽ *Opciones : Disponibles* ⩾
⊹ ✎ *#bot-img*  <reply>
> (Cambia la foto de perfil del bot.)
⊹ ✎ *#bot-px*  <query>
> (Cambia el prefijo a un nuevo prefijo predeterminado.)
⊹ ✎ *#bot-desc*  <text>
> (Cambia la descripción del perfil en el bot.)
⊹ ✎ *#bot-name*  <text>
> (Cambia el nombre de perfil del bot.)`.trim();
return conn.sendMessage(m.chat, { text: noValido }, { quoted: m });
}
}


handler.help = ['xbot', 'bot-name  <text>', 'bot-desc  <text>', 'bot-img  <reply>', 'bot-px  <query>'];
handler.tags = ['propietario'];
handler.command = ['bot-name', 'bot-desc', 'bot-img', 'bot-px', 'xbot'];
handler.owner = true;

export default handler;
