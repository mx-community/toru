/*import axios from 'axios';
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto o un enlace de *Spotify* para descargarlo.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Golden Brown` }, { quoted: m });
await m.react("⏰");
try {
let song;
const isSpotifyUrl = text.startsWith('https://open.spotify.com/');
if (isSpotifyUrl) {
song = { url: text };
} else {
const results = await spotifyxv(text);
if (!results.length) return conn.sendMessage(m.chat, { text: `No se han encontrado resultados sobre esa canción.` }, { quoted: m });
song = results[0];
}

const res = await axios.get(`https://api.stellarwa.xyz/dow/spotify?url=${song.url}&apikey=proyectsV2`);
const data = res.data?.data;
if (!data?.download) return conn.sendMessage(m.chat, { text: `No se ha podido acceder al enlace.` }, { quoted: m });
const info = `· ┄ · ⊸ 𔓕 *Spotify  :  Download*

\t＃ *Titulo* : ${data.title}
\t＃ *Artista* : ${data.artist} ${song.album ? `\n\t＃ *Album* : ${song.album}` : ''}
\t＃ *Duracion* : ${data.duration}
\t＃ *Enlace* : ${song.url}

> ${textbot}`
const thumb = (await conn.getFile(data.image))?.data
await conn.sendMessage(m.chat, { text: info, mentions: [m.sender], contextInfo: { externalAdReply: { title: data.title, body: botname, thumbnail: thumb, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
                       
//await conn.sendMessage(m.chat, { image: { url: data.image }, caption: info }, { quoted: m });

await conn.sendMessage(m.chat, {
audio: { url: data.download },
fileName: `${data.title}.mp3`,
mimetype: 'audio/mpeg'
}, { quoted: m });

} catch (e) {
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m });
}
};
handler.command = ['spotify', 'spy'];
export default handler;

async function spotifyxv(query) {
const res = await axios.get(`https://api.stellarwa.xyz/search/spotify?query=${encodeURIComponent(query)}&apikey=proyectsV2`);
if (!res.data?.status || !res.data?.data?.length) return [];

const firstTrack = res.data.data[0];

return [{
name: firstTrack.title,
artista: [firstTrack.artist],
album: firstTrack.album,
duracion: firstTrack.duration,
url: firstTrack.url,
imagen: firstTrack.image || ''
}];
}
  
*/
