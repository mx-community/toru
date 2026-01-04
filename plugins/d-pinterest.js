import axios from "axios";
import * as cheerio from "cheerio";

const pindl = {
video: async (url) => {
try {
const { data: html } = await axios.get(url);
const $ = cheerio.load(html);

const mediaDataScript = $('script[data-test-id="video-snippet"]');
if (!mediaDataScript.length) return null;

const mediaData = JSON.parse(mediaDataScript.html());
if (mediaData["@type"] === "VideoObject" && mediaData.contentUrl?.endsWith(".mp4")) {
return {
type: "video",
name: mediaData.name,
description: mediaData.description,
contentUrl: mediaData.contentUrl,
thumbnailUrl: mediaData.thumbnailUrl,
uploadDate: mediaData.uploadDate,
duration: mediaData.duration
};
}
return null;
} catch {
return null;
}
},

image: async (url) => {
try {
const { data: html } = await axios.get(url);
const $ = cheerio.load(html);
const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
if (!mediaDataScript.length) return null;

const mediaData = JSON.parse(mediaDataScript.html());
if (mediaData["@type"] === "SocialMediaPosting" && mediaData.image && !mediaData.image.endsWith(".gif")) {
return {
type: "image",
headline: mediaData.headline,
image: mediaData.image
};
}
return null;
} catch {
return null;
}
},

gif: async (url) => {
try {
const { data: html } = await axios.get(url);
const $ = cheerio.load(html);
const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
if (!mediaDataScript.length) return null;

const mediaData = JSON.parse(mediaDataScript.html());
if (mediaData["@type"] === "SocialMediaPosting" && mediaData.image?.endsWith(".gif")) {
return {
type: "gif",
headline: mediaData.headline,
gif: mediaData.image
};
}
return null;
} catch {
return null;
}
},

download: async (url) => {
return (await pindl.video(url)) || (await pindl.image(url)) || (await pindl.gif(url)) || { error: "No se encontró medio" };
}
};

const downloadBuffer = async (url) => {
const res = await axios.get(url, { responseType: 'arraybuffer' });
return Buffer.from(res.data);
};

const handler = async (m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un enlace de Pinterest.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://pin.it/xxxx` }, { quoted: m });
await m.react("⏰");
try {
const result = await pindl.download(text);
if (result.error) throw result.error;
let caption = "";
const maxSize = 10 * 1024 * 1024;
if (result.type === "video" || result.type === "gif") {
const buffer = await downloadBuffer(result.contentUrl || result.gif);
if (buffer.length > maxSize) {
await conn.sendMessage(m.chat, { text: `No se pudo descargar el video.\n- El limite maximo es de *10 MB*, intente con otro video.` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: buffer }, caption: "", mimetype: "video/mp4" }, { quoted: m });
}
} else if (result.type === "image") {
await conn.sendMessage(m.chat, { image: { url: result.image }, caption: "" }, { quoted: m });
}
await m.react("✅");
} catch (error) {
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
}
};

handler.command = ['pin', 'pinterest'];

export default handler;


 
