import fetch from 'node-fetch'
let handler = async (m, {conn, args, usedPrefix, command}) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `ᗢ\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* https://drive.google.com/file/xxxx` }, { quoted: m })
let url = args[0]
if (!(url && url.match(/drive\.google\.com\/file/i))) return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido.` }, { quoted: m })
try {
let fontDrive = "Drive"
var res = await fdrivedl(url)
} catch (e) {
return conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
let caption = `· ┄ · ⊸ 𔓕 *Drive  :  Download*

\t＃ *Nombre* : ${res.fileName}
\t＃ *Peso* : ${formatBytes(res.sizeBytes)}
\t＃ *Tipo* : ${res.mimetype}
\t＃ *Fuente* : ${fontDrive}

📍  Descargando archivo, espere un momento...

> ${textbot}`.trim()
await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
let fileSize = formatBytes(res.sizeBytes)
if (fileSize.includes('GB') && parseInt(fileSize.replace(' GB', '')) > 1.8) return conn.sendMessage(m.chat, { text: `El archivo supera los *999MB*, no podra ser enviado...` }, { quoted: m })
conn.sendMessage(m.chat, {document: {url: res.downloadUrl}, fileName: res.fileName, mimetype: res.mimetype}, {quoted: m})
}
async function fdrivedl(url) {
let id
id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
if (!id) throw 'No se encontró id de descarga'
let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
method: 'post',
headers: {
'accept-encoding': 'gzip, deflate, br',
'content-length': 0,
'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
origin: 'https://drive.google.com',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
'x-drive-first-party': 'DriveWebUi',
'x-json-requested': 'true'
}
})
let {fileName, sizeBytes, downloadUrl} = JSON.parse((await res.text()).slice(4))
if (!downloadUrl) return conn.sendMessage(m.chat, { text: 'Se agotaron el numero de descargas...' }, { quoted: m })
let data = await fetch(downloadUrl)
if (data.status !== 200) throw data.statusText
return {
downloadUrl,
fileName,
sizeBytes,
mimetype: data.headers.get('content-type')
}
}

function formatBytes(bytes, decimals = 2) {
if (bytes === 0) return '0 Bytes'

const k = 1024
const dm = decimals < 0 ? 0 : decimals
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const i = Math.floor(Math.log(bytes) / Math.log(k))

return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

handler.command = ["drive"]
export default handler


