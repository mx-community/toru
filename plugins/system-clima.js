import fetch from 'node-fetch';
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la ubicacion del lugar (provincia) para ver el clima.\n\n• Por ejemplo:\n*${usedPrefix + command}* Formosa` }, { quoted: m });
}
await m.react("⏰");
try {
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(text)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`;
const response = await fetch(apiUrl);
if (!response.ok) {
return conn.sendMessage(m.chat, { text: `La ubicacion no fue encontrada o esta mal escrito, recuerde usar una ubicacion provincial.\n\n• Por ejemplo:\n*${usedPrefix + command}* Formosa` }, { quoted: m });
}
const data = await response.json();
if (data.cod !== 200) {
throw new Error(data.message || 'Ocurrió un error');
}
const location = data.name;
const country = data.sys.country;
const weatherDescription = data.weather[0].description;
const currentTemperature = `${data.main.temp}°C`;
const minTemperature = `${data.main.temp_min}°C`;
const maxTemperature = `${data.main.temp_max}°C`;
const humidity = `${data.main.humidity}%`;
const windSpeed = `${data.wind.speed} km/h`;

const weatherMessage = `*CLIMA  -  ACTUAL*
⊹┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⊹

📌 *Ubicacion:* ${location}
🌎 *Pais:* ${country}
🌐 *Provincia:* ${weatherDescription}
🌡️ *Temperatura actual:* ${currentTemperature}
🚀 *Máxima:* ${maxTemperature}
🛰️ *Mínima:* ${minTemperature}
💧 *Humedad:* ${humidity}
🌬️ *Velocidad del viento:* ${windSpeed}
`;
await conn.sendMessage(m.chat, { text: weatherMessage }, { quoted: m });
await m.react("✅")
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `${error.message}.` }, { quoted: m })
}
};

handler.command = ['clima', 'weather'];
export default handler;
  
