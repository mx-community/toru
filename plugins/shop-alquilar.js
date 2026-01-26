import fetch from 'node-fetch'
const handler = async (m, { conn, command, args, usedPrefix, text }) => {
if (!global.db.data.chats[m.chat].fTienda && m.isGroup) {
return conn.sendMessage(m.chat, { text: `?  Los comandos de *[ tienda ]* estan desactivados...` }, { quoted: m })
}
const user = global.db.data.users[m.sender] || {};
const name = await conn.getName(m.sender);
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
if (command === "alquilar") {
let plan = `· �? · �? 𔓕 *Shop  :  Bot*

📍 "Puedes entrar a la siguiente pagina web..."

Disponible: $5.00
https://mx-website.vercel.app/bots/toru.html

> Una vez realizado la compra, puedes contactar con este numero:
wa.me/5493873655135

> ${textbot}`
await conn.sendMessage(m.chat, { text: plan, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
};

};

handler.command = ['alquilar'];

export default handler;



