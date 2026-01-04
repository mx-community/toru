import fetch from 'node-fetch';

let handler = async (m, {conn, text, args, usedPrefix, command}) => { 
if (!args[0]) return conn.reply(m.chat, `ᗢ Proporcione un enlace cualquiera de Google.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://ejemplo.con`, m);
await m.react("⏰");
 try {
 const ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer();
conn.sendFile(m.chat, ss, '', '', m);
await m.react("✅");
 } catch { 
 try {
 const ss2 = `https://api.screenshotmachine.com/?key=c04d3a&url=${args[0]}&screenshotmachine.com&dimension=720x720`;
conn.sendMessage(m.chat, {image: {url: ss2}}, {quoted: m}); 
await m.react("✅");
 } catch {
 try { 
 const ss3 =`https://api.lolhuman.xyz/api/SSWeb?apikey=${lolkeysapi}&url=${text}`; 
conn.sendMessage(m.chat, {image: {url: ss3}}, {quoted: m}); 
await m.react("✅");
 } catch { 
 const ss4 = `https://api.lolhuman.xyz/api/SSWeb2?apikey=${lolkeysapi}&url=${text}`;
conn.sendMessage(m.chat, {image: {url: ss4}}, {quoted: m});
await m.react("✅");
 }
}
 }
}; 
 
handler.command = ["ss"]; 
export default handler


