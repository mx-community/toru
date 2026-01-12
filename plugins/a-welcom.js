import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import axios from 'axios'
import { WAMessageStubType, generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

function detectarPais(numero) {
const codigos = {
"1": "🇺🇸 EE.UU / 🇨🇦 Canadá", "7": "🇷🇺 Rusia / 🇰🇿 Kazajistán",
"20": "🇪🇬 Egipto", "27": "🇿🇦 Sudáfrica", "30": "🇬🇷 Grecia",
"31": "🇳🇱 Países Bajos", "32": "🇧🇪 Bélgica", "33": "🇫🇷 Francia",
"34": "🇪🇸 España", "36": "🇭🇺 Hungría", "39": "🇮🇹 Italia",
"40": "🇷🇴 Rumania", "44": "🇬🇧 Reino Unido", "49": "🇩🇪 Alemania",
"51": "🇵🇪 Perú", "52": "🇲🇽 México", "53": "🇨🇺 Cuba",
"54": "🇦🇷 Argentina", "55": "🇧🇷 Brasil", "56": "🇨🇱 Chile",
"57": "🇨🇴 Colombia", "58": "🇻🇪 Venezuela", "591": "🇧🇴 Bolivia",
"593": "🇪🇨 Ecuador", "595": "🇵🇾 Paraguay", "598": "🇺🇾 Uruguay",
"502": "🇬🇹 Guatemala", "503": "🇸🇻 El Salvador",
"504": "🇭🇳 Honduras", "505": "🇳🇮 Nicaragua",
"506": "🇨🇷 Costa Rica", "507": "🇵🇦 Panamá",
"60": "🇲🇾 Malasia", "61": "🇦🇺 Australia", "62": "🇮🇩 Indonesia",
"63": "🇵🇭 Filipinas", "64": "🇳🇿 Nueva Zelanda",
"65": "🇸🇬 Singapur", "66": "🇹🇭 Tailandia",
"81": "🇯🇵 Japón", "82": "🇰🇷 Corea del Sur", "84": "🇻🇳 Vietnam",
"86": "🇨🇳 China", "90": "🇹🇷 Turquía", "91": "🇮🇳 India",
"212": "🇲🇦 Marruecos", "213": "🇩🇿 Argelia",
"216": "🇹🇳 Túnez", "218": "🇱🇾 Libia",
"234": "🇳🇬 Nigeria", "254": "🇰🇪 Kenia",
"255": "🇹🇿 Tanzania", "256": "🇺🇬 Uganda",
"258": "🇲🇿 Mozambique", "260": "🇿🇲 Zambia",
"263": "🇿🇼 Zimbabue"
}
for (const code in codigos)
if (numero.startsWith(code)) return codigos[code]
return "Desconocido"
}

let thumb = await fetch(`${global.toruImg}`)
.then(res => res.arrayBuffer()).catch(() => null)

const fkontak = {
key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', id: 'Halo' },
message: { locationMessage: { name: botname, jpegThumbnail: Buffer.from(thumb || []) } }
}

function fechaHoraArg() {
const fecha = new Date().toLocaleDateString("es-PE", {
weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
timeZone: "America/Buenos_Aires"
})
const hora = new Date().toLocaleTimeString("es-PE", {
hour: "2-digit", minute: "2-digit", second: "2-digit",
timeZone: "America/Buenos_Aires"
})
return { fecha, hora }
}



async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const numero = userId.split("@")[0]
const pais = detectarPais(numero)

const pp = await conn.profilePictureUrl(userId, 'image').catch(() => `${global.toruImg}`)

const { fecha, hora } = fechaHoraArg()
const groupSize = groupMetadata.participants.length + 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'

const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"')
.replace(/{usuario}/g, `${username}`)
.replace(/{grupo}/g, `${groupMetadata.subject}`)
.replace(/{desc}/g, `${desc}`)

let toruWelcome = `Hola chatgpt, ahora seras [ @TORU ], en esta pequeña petición quiero que des la bienvenida al nuevo usuario que ingreso a este grupo, solamente genera el texto corto de bienvenida no digas otra cosa mas como "Esta Bien", "¡Claro! Aqui esta el texto de bienvenida", nada de eso, solamente manda la bienvenida, respetar al usuario y que esperamos este bien y se sienta cómodo.`
let { data } = await axios.get(`https://api-hasumi.vercel.app/api/ai/chatgpt?text=${encodeURIComponent(toruWelcome)}`)
const bienvenidaXd = `👋🏻  @${username}\n\n${data.texto}`
const welcomeImg = `${global.toruMenu}`
})

return { pp, bienvenidaXd, welcomeImg, mentions: [userId] }
}


async function generarDespedida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const numero = userId.split("@")[0]
const pais = detectarPais(numero)

const pp = await conn.profilePictureUrl(userId, 'image').catch(() => `${global.toruImg}`)

const { fecha, hora } = fechaHoraPeru()
const groupSize = groupMetadata.participants.length - 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'

const mensaje = (chat.sBye || 'Edita con el comando "setbye"')
.replace(/{usuario}/g, `${username}`)
.replace(/{grupo}/g, `${groupMetadata.subject}`)
.replace(/{desc}/g, `*${desc}*`)

let toruDespedida = `Hola chatgpt, ahora seras [ @TORU ], en esta pequeña petición quiero que des la despedida a un usuario que se retiro de este grupo, solamente genera el texto corto de despedida no digas otra cosa mas como "Esta Bien", "¡Claro! Aqui esta el texto de despedida", nada de eso, solamente manda la despedida, desearle suerte al usuario y que esperamos este bien y se sienta cómodo.`
let { data } = await axios.get(`https://api-hasumi.vercel.app/api/ai/chatgpt?text=${encodeURIComponent(toruDespedida)}`)
const despedidaXd = `👋🏻  ${username}\n\n${data.texto}`
const byeImg = `${global.toruMenu}`
return { pp, despedidaXd, byeImg, mentions: [userId] }
}

let handler = m => m

handler.before = async function (m, { conn, participants, groupMetadata }) {
try {
if (!m.messageStubType || !m.isGroup) return !0

const chat = global.db.data.chats[m.chat]
const userId = m.messageStubParameters[0]

if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {

const { pp, bienvenidaXd, welcomeImg, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })

const { imageMessage } = await generateWAMessageContent(
welcomeImg ? { image: welcomeImg } : { image: { url: pp } },
{ upload: conn.waUploadToServer }
)

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: { text: bienvenidaXd },
footer: { text: botname },
header: { title: "", hasMediaAttachment: false, imageMessage },
contextInfo: { mentionedJid: mentions },
nativeFlowMessage: {
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "channel",
url: channel,
merchant_url: canal
})
}
]
}
})
}
}
},
{ quoted: fkontak }
)

 await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

if (chat.welcome &&
(m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
 m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {

const { pp, caption, byeImg, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })

const { imageMessage } = await generateWAMessageContent(
byeImg ? { image: byeImg } : { image: { url: pp } },
{ upload: conn.waUploadToServer }
)

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: { text: despedidaXd },
footer: { text: botname },
header: { title: "", hasMediaAttachment: false, imageMessage },
contextInfo: { mentionedJid: mentions },
nativeFlowMessage: {
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "channel",
url: channel,
merchant_url: canal
})
}
]
}
})
}
}
},
{ quoted: fkontak }
)

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, {
text: `${e.message}`,
mentions: [m.sender]
})
}
}

export { generarBienvenida, generarDespedida }
export default handler