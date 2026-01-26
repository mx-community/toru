import fetch from 'node-fetch'
const handler = async (m, { conn, command, args, usedPrefix, text }) => {
if (!global.db.data.chats[m.chat].fTienda && m.isGroup) {
return conn.sendMessage(m.chat, { text: `📍  Los comandos de *[ tienda ]* estan desactivados...` }, { quoted: m })
}

const user = global.db.data.users[m.sender] || {};
const name = await conn.getName(m.sender);
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let plan = `· ┄ · ⊸ 𔓕 *Plan  :  Server*

📍 "Para contrarar un plan para tener el *bot* en tu chat grupal junto con tus amigos, lo puedes seleccionar a tu preferencia."

\t＃ \`Plan 1\`
● *ARS* : $5,000
● *USD* : $5
📆 *Dias* : 25 dias
🌐 *Updates* : Activo
👥 *Grupos* : 1 max

\t＃ \`Plan 2\`
● *ARS* : $8,000
● *USD* : $8
📆 *Dias* : 45 dias
🌐 *Updates* : Activo
👤 *Owner* : 1 max
👥 *Grupos* : 1 max

\t＃ \`Plan 3\`
● *ARS* : $10,000
● *USD* : $10
📆 *Dias* : 65 dias
🌐 *Updates* : Activo.
🔑 *Editor* : Activo
👤 *Owner* : 2 max
👥 *Grupos* : 2 max

\t＃ \`Plan 4\`
● *ARS* : $15,000
● *USD* : $15
📆 *Dias* : 80 dias
🌐 *Updates* : Activo
🔑 *Editor* : Activo
🏆 *Premium* : Activo
👤 *Owner* : 3 max
👥 *Grupos* : 5 max

> 📍  Si al querer realizar una compra, consulta con un asistente o al mismo propietario para afirmar el proceso.`.trim();
await conn.sendMessage(m.chat, { text: plan, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
};

handler.command = ['plan'];

export default handler;


