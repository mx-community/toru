import fetch from 'node-fetch';
const handler = async (m, { conn, command, usedPrefix, text }) => {
let itoru = global.db.data.chats[conn.user.jid]?.itoru || torukk
let iname = global.db.data.chats[conn.user.jid]?.iname || botname
let ifoto = global.db.data.chats[conn.user.jid]?.ifoto || global.toruImg

let comandos = `〆  P R O F I L E  :  R P G

\t⸭ 📌 \`\`\`Edita tu perfil rpg.\`\`\`

\t\t⧡ #genero+  >  *(add)*
\t⧡ #genero-  >  *(delete)*

\t\t⧡ #desc+  >  *(add)*
\t⧡ #desc-  >  *(delete)*

\t\t⧡ #birth+  >  *(add)*
\t⧡ #birth-  >  *(delete)*

\t\t⧡ #age+  >  *(add)*

\t\t⧡ #red+  >  *(add)*
\t⧡ #red-  >  *(delete)*

> ${textbot}`
const thumb = Buffer.from(await (await fetch(`${global.ifoto}`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: comandos, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  P R O F I L E  :  R P G  々", 
body: iname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
};


handler.help = ['myp'];
handler.tags = ['rpg'];
handler.command = ['myp'];

export default handler;

