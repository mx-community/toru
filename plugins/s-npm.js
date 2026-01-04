import { exec } from 'child_process';
import fs from 'fs';
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una búsqueda de NPM y su version.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* node-fetch, 1.1.1.1` }, { quoted: m });
async function npmdownloader(pkg, pkgver) {
await m.react("⏰");
try {
const filePath = await new Promise((resolve, reject) => {
exec(`npm pack ${pkg}@${pkgver}`, (error, stdout) => {
if (error) {
conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
reject(error);
return;
}
resolve(stdout.trim());
});
});

const fileName = filePath.split('/').pop();
const data = await fs.promises.readFile(filePath);
let Link;
if (pkgver === 'latest') {
Link = `https://www.npmjs.com/package/${pkg}`;
} else {
Link = `https://www.npmjs.com/package/${pkg}/v/${pkgver}`;
}
let contextoNpm = `· ┄ · ⊸ 𔓕 *npm  :  download*

\t＃ *Titulo* : ${fileName}
\t＃ *Version* : ${pkgver}
\t＃ *Enlace* : ${Link}

${textbot}`;
await conn.sendMessage(m.chat, { text: contextoNpm }, { quoted: m });
await conn.sendMessage(m.chat, { document: data, mimetype: "application/zip", fileName: fileName, caption: `${fileName}\n` }, { quoted: m });
await m.react("✅")
await fs.promises.unlink(filePath);
} catch (err) {
conn.sendMessage(m.chat, { text: `${err.message}` }, { quoted: m });
}
}

try {
const [text2, ver] = text.split(",");
await npmdownloader(text2, ver || 'latest');
} catch (error) {
await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
}
};

handler.command = ["npmdl", "npm"];

export default handler;
