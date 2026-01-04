let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
import PhoneValidator from '../lib/PhoneValidator.js';
const phoneValidator = new PhoneValidator();
function resolveLidToJid(rawId) {
if (!rawId) return null;
if (rawId.endsWith('@s.whatsapp.net')) return rawId;
if (rawId.endsWith('@lid')) {
const lidKey = rawId.replace('@lid', '');
const detection = phoneValidator.detectPhoneInLid(lidKey);
if (detection.isPhone && detection.jid) {
return detection.jid;
}
return rawId;
}
if (/^\d+$/.test(rawId)) {
return `${rawId}@s.whatsapp.net`;
}

return rawId;
}

async function getUserName(conn, jid) {
try {
const user = global.db.data.users[jid];
if (user && typeof user.name === 'string' && user.name.trim() && !/undef|undefined|null|nan/i.test(user.name)) {
return user.name.trim();
}

const contactName = await conn.getName(jid);
if (contactName) return contactName;

return jid.split('@')[0];
} catch {
return jid.split('@')[0];
}
}

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return true;

let imgWelcome = 'https://files.catbox.moe/59a09v.jpg';
let imgBye = 'https://files.catbox.moe/59a09v.jpg';

let chat = global.db.data.chats[m.chat];
const getMentionedJid = () => {
return m.messageStubParameters.map(param => resolveLidToJid(param));
};

let whoRaw = m.messageStubParameters[0];
let who = resolveLidToJid(whoRaw);
let userName = await getUserName(conn, who);

let total = groupMetadata.participants.length;

if (chat.welcome && m.messageStubType === 27) {
await conn.sendMessage(m.chat, {
image: { url: imgWelcome },
caption: `*ＢＩＥＮＶＥＮＩＤＯ*

👋🏻  *"Damos la bienvenida al nuevo participante de este grupo, esperamos y encuentre comodidad en este chat."*

\t＃ Usuario : @${who.split('@')[0]}
\t＃ Participantes : *${total}* en total.

> ${textbot}`.trim(),
mentions: getMentionedJid()
}, { quoted: m });
}

if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
await conn.sendMessage(m.chat, {
image: { url: imgBye },
caption: `*ＤＥＳＰＥＤＩＤＡ*

👋🏻  *"Damos la despedida al usuario, recientemente ha salido del grupo."*

\t＃ Usuario: @${who.split('@')[0]}
\t＃ Participantes : *${total}* en total

> ${textbot}
`.trim(),
mentions: getMentionedJid()
}, { quoted: m });
}
}
