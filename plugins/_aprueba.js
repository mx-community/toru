import axios from "axios";

const API_URL = "https://api.wrmgpt.com/v1/chat/completions";
const AUTHORIZATION = "sk_live_0003c489-6095-453d-b3f5-dd87237aa69eb001";

let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione un texto para hablar con WormGPT.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Hola` }, { quoted: m });
try {
await m.react("⏰");
const response = await axios.post(API_URL, { model: "wormgpt-v7", messages: [
{
role: "user",
content: text,
},
],
},
{
headers: {
"Authorization": `Bearer ${AUTHORIZATION}`,
"Content-Type": "application/json",
},
}
);

const reply = response.data?.choices?.[0]?.message?.content || "📍  Sin resultados en el proceso...";
await conn.sendMessage(m.chat, { text: reply }, { quoted: m });
await m.react("✅");
} catch (error) {
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
}
};

handler.command = ["wormgpt", "wgpt"];
export default handler;
