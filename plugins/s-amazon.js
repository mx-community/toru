import axios from 'axios';
import fetch from 'node-fetch';
let handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una búsqueda para amazon.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Cocina` }, { quoted: m });
await m.react("⏰");
let res = await amazonSearch(text);
let resultsMessage = `· ┄ · ⊸ 𔓕 *Amazon  :  Search*\n\n＃ Busqueda : *${text}*\n＃ Resultados : *15*\n\n\n`;
const limit = 15;
for (let i = 0; i < limit && i < res.results.length; i++) {
let link = res.results[i].link.length > 30 ? res.results[i].link.substring(0, 30) + '...' : res.results[i].link;
resultsMessage += `⧡ *Nombre* : ${res.results[i].title}\n⧡ *Precio* : ${res.results[i].price}\n⧡ *Enlace* : ${link}\n`;
resultsMessage += '\n\n';
}
const thumb = Buffer.from(await (await fetch(`https://files.catbox.moe/s81p8h.jpg`)).arrayBuffer());
await conn.sendMessage(m.chat, { text: resultsMessage, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: "々  A M A Z O N  々", body: botname, containsAutoReply: true, mediaType: 1, thumbnailUrl: thumb, sourceUrl: null }}}, { quoted: m });
await m.react("✅");
} catch (error) {
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
}
};

handler.command = ['amazon'];
export default handler;

async function amazonSearch(query) {
try {
const url = `http://n3.boxmine.xyz:3344/amazonsearch?q=${encodeURIComponent(query)}`;
const response = await axios.get(url);
return response.data;
} catch (error) {
console.error(error);
throw new Error('Error al conectar con la API de Amazon');
}
  }
  
