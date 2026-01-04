const handler = async (m, { text, conn, usedPrefix, command }) => {
try {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de un canal de WhatsApp.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://whatsapp.com/channel/ejemplo_de_canal` }, { quoted: m });
await m.react("⏰");
const regex = /https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9-_]+)/;
const match = text.match(regex);
if (!match) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es válido.` }, { quoted: m });
let channelId = match[2];
let res = await conn.newsletterMetadata("invite", channelId);
if (!res || !res.id) return conn.sendMessage(m.chat, { text: `No se ha podido obtener datos del canal, intentalo de nuevo.` }, { quoted: m });
let chMdmx = `· ┄ · ⊸ 𔓕 *Info  :  Canal*

⧡ Nombre : *${res.name}*
⧡ Seguidores : *${res.subscribers.toLocaleString()}* en total.
⧡ Verificación : *${res.verification === "VERIFIED" ? "Si." : "No."}*`;
await conn.sendMessage(m.chat, { text: chMdmx }, { quoted: m });
conn.sendMessage(m.chat, { text: res.id }, m );
await m.react("✅");
} catch (error) {
console.error(error);
return conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
}
};

handler.command = ["cid", "idc"];
export default handler;

/* 
Comando para poder sacar la id de un canal de WhatsApp.
Por el momento en face beta, se estima mejoras superiores a este proximamente.
 */
  
