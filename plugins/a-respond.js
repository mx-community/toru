import axios from 'axios'
import { sticker } from '../lib/sticker.js'

export async function before(m, {conn}) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
m.isBot =
(m.id.startsWith('BAE5') && m.id.length === 16) ||
(m.id.startsWith('3EB0') && m.id.length === 12) ||
(m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22)) ||
(m.id.startsWith('B24E') && m.id.length === 20)
if (m.isBot) return

let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

if (prefixRegex.test(m.text)) return true
if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
return true
}


if (m.mentionedJid.includes(this.user.jid)) {
if (
m.text.includes('PIEDRA') ||
m.text.includes('PAPEL') ||
m.text.includes('TIJERA') ||
m.text.includes('menu') ||
m.text.includes('estado') ||
m.text.includes('bots') ||
m.text.includes('serbot') ||
m.text.includes('jadibot') ||
m.text.includes('Video') ||
m.text.includes('Audio') ||
m.text.includes('audio')
)
return !0

async function luminsesi(q, username, logic) {
try {
const response = await axios.post('https://luminai.my.id', {
content: q,
user: username,
prompt: logic,
webSearchMode: true
})
return response.data.result
} catch (error) {
return
}
}

async function geminiProApi(q, logic) {
try {
const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`)
if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
const result = await response.json()
return result.answer
} catch (error) {
return
}
}

let txtDefault = `Hola, tu seras TORU, un bot de WhatsApp que responde cualquier cosa sea posible.
Actuaras como un bot de WhatsApp, puedes ofrecer opciones si la persona quiere saber los comandos.
Por ejemplo:
#menu (muestra una lista de menus con categorías)
el menu de descargas esta en el siguiente comando: #menu 2
Puedes responder al usuario con amabilidad y respeto.
Fuiste creado por @Farguts un desarrollador encubierto por el momento.`.trim()

let query = m.text
let username = m.pushName
let syms1 = chat.sAutorespond ? chat.sAutorespond : txtDefault

if (!chat.autorespond) return
if (m.fromMe) return
if (!user.registered) return

let result
if (result && result.trim().length > 0) {
result = await geminiProApi(query, syms1)
}

if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1)
}

if (result && result.trim().length > 0) {
this.sendPresenceUpdate('composing', m.chat)
await this.reply(m.chat, result, m)
await this.readMessages([m.key])
} else {
}
}
return true
}


