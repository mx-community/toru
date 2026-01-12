import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
global.canalIdM = ["120363402356085997@newsletter", "120363318353263389@newsletter"]
global.canalNombreM = ["MX COMMUNITY", "MX : NOTIFY"]
global.channelRD = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('es-AR', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = 'https://whatsapp.com/channel/0029VbBPMLXHrDZnt0R2iF1d'
var comunidad = 'https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt'
var webmx = 'https://mx-website.vercel.app'
var paypal = 'https://www.paypal.me/aJosueUSDpaypal'

global.botname = "T O R U  :  WhatsApp"
global.botgroup = "https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt"
global.botcanal = "https://whatsapp.com/channel/0029VbBPMLXHrDZnt0R2iF1d"
global.botweb = "https://optishield.uk/dashboard/"
global.textbot = "ʙᴏᴛ ɪɴᴛᴇɢʀᴀᴛᴇᴅ ᴡɪᴛʜ ᴡʜᴀᴛsᴀᴘᴘ."
  
  //APIS MX 📍
global.apis = 'https://api.delirius.store'
global.apimx_cafirexos = 'https://api.cafirexos.com'
global.apimx_key = 'BrunoSobrino'
global.apimx_brunosobrino = 'https://api-brunosobrino-dcaf9040.koyeb.app'
global.apimx_brunosobrino2 = 'https://api-brunosobrino.onrender.com'
global.baseapi_delirius = "https://delirius-apiofc.vercel.app"
global.baseapi_skynex = "https://skynex.boxmine.xyz"
global.apirest_key = 'BrunoSobrino' 
global.apirest_url = 'https://api.cafirexos.com'
global.apirest_url2 = 'https://api-brunosobrino-dcaf9040.koyeb.app'
global.apirest_url3 = 'https://api-brunosobrino.onrender.com'

global.toruImg = "https://files.catbox.moe/t6n0rz.jpg"
global.toruMenu = "https://files.catbox.moe/esnv6d.jpg"
global.toruCh = "https://files.catbox.moe/bbm4z7.jpg"
  
global.redes = [canal, comunidad, webmx, paypal].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `${botname}`
global.packsticker2 = `\n々 ${nombre}\n々 WhatsApp\n· · · ─ ┄ ⚶ ┄ ─ · · ·`

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }}}, { quoted: m }
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { title: `· · · ─ ┄ ＴＯＲＵ ┄ ─ · · ·`, body: `${textbot}`, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: global.toruImg, mediaType: 1, renderLargerThumbnail: false },},}

}
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}
