import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
let handler = async (m, { conn, usedPrefix, args, command, __dirname, participants }) => {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender] || {}
let bot = global.db.data.settings[conn.user.jid] || {}
let isEnable = /true|enable|(turn)?on|1/i.test(command)

try {
let listaPrincipal = `⧡ menu » all       [0]
⧡ menu » info      [1]
⧡ menu » dls       [2]
⧡ menu » conv      [3]
⧡ menu » search    [4]
⧡ menu » group     [5]
⧡ menu » shop      [6]
⧡ menu » rpg       [7]
⧡ menu » utils     [8]
⧡ menu » stickers  [9]
⧡ menu » logos     [10]
⧡ menu » coleccion [11]
⧡ menu » random    [12]
⧡ menu » reac      [13]
⧡ menu » edit       [14]
⧡ menu » premium   [15]
⧡ menu » owner     [own]`
let menuInfo = `\t⊹ *${usedPrefix}info*
\t⊹ *${usedPrefix}mp*
\t⊹ *${usedPrefix}bk*
\t⊹ *${usedPrefix}pay*
\t⊹ *${usedPrefix}creador*
\t⊹ *${usedPrefix}donar*
\t⊹ *${usedPrefix}canal*
\t⊹ *${usedPrefix}run*
\t⊹ *${usedPrefix}ping*
\t⊹ *${usedPrefix}prems!*
\t⊹ *${usedPrefix}mods!*
\t⊹ *${usedPrefix}admins!*
\t⊹ *${usedPrefix}stat*
\t⊹ *${usedPrefix}plan*
\t⊹ *${usedPrefix}anuncios*
\t⊹ *${usedPrefix}support*   [text]`
let menuDesc = `\t⊹ *${usedPrefix}ytmp3*   [link/text]
\t⊹ *${usedPrefix}ytmp4*   [link/text]
\t⊹ *${usedPrefix}play*   [link/text]
\t⊹ *${usedPrefix}facebook*   [link]
\t⊹ *${usedPrefix}instagram*   [link]
\t⊹ *${usedPrefix}twitter*   [link]
\t⊹ *${usedPrefix}tiktok*   [link]
\t⊹ *${usedPrefix}p-tiktok*   [link]
\t⊹ *${usedPrefix}a-tiktok*   [link]
\t⊹ *${usedPrefix}sly*   [link]
\t⊹ *${usedPrefix}spotify*   [link]
\t⊹ *${usedPrefix}mediafire*   [link]
\t⊹ *${usedPrefix}pinterest*   [link]
\t⊹ *${usedPrefix}github*   [link]`
let menuConv = `\t⊹ *${usedPrefix}upload*
\t⊹ *${usedPrefix}hd*
\t⊹ *${usedPrefix}turl*   [query]
\t⊹ *${usedPrefix}catbox*   [query]`
let menuSearch = `\t⊹ *${usedPrefix}imagen*   [text]
\t⊹ *${usedPrefix}fdroids*   [text]
\t⊹ *${usedPrefix}apk*   [text]
\t⊹ *${usedPrefix}yts*   [text]
\t⊹ *${usedPrefix}slys*   [text]
\t⊹ *${usedPrefix}imagen*   [text]
\t⊹ *${usedPrefix}pinimg*   [text]
\t⊹ *${usedPrefix}tenor*   [text]
\t⊹ *${usedPrefix}spotifys*   [text]
\t⊹ *${usedPrefix}apples*   [text]
\t⊹ *${usedPrefix}google*   [text]`
let menuGroup = `\t⊹ *${usedPrefix}enlace*
\t⊹ *${usedPrefix}revok*
\t⊹ *${usedPrefix}add*   [nro]
\t⊹ *${usedPrefix}kick*   [reply]
\t⊹ *${usedPrefix}admin+*   [mention]
\t⊹ *${usedPrefix}admin-*   [mention]
\t⊹ *${usedPrefix}warn+*   [mention]
\t⊹ *${usedPrefix}warn-*   [mention]
\t⊹ *${usedPrefix}mute+*   [mention]
\t⊹ *${usedPrefix}mute-*   [mention]
\t⊹ *${usedPrefix}tags*   [text]`
let menuShop = `\t⊹ *${usedPrefix}internet*
\t⊹ *${usedPrefix}colaborar*
\t⊹ *${usedPrefix}plan*   [query]`
let menuRpg = `\t⊹ *${usedPrefix}aventura*
\t⊹ *${usedPrefix}minar*
\t⊹ *${usedPrefix}pescar*
\t⊹ *${usedPrefix}cofre*
\t⊹ *${usedPrefix}curar*
\t⊹ *${usedPrefix}nivel*
\t⊹ *${usedPrefix}revelar*
\t⊹ *${usedPrefix}mercader*
\t⊹ *${usedPrefix}work*
\t⊹ *${usedPrefix}velero*
\t⊹ *${usedPrefix}coins*
\t⊹ *${usedPrefix}regalo*
\t⊹ *${usedPrefix}cazar*
\t⊹ *${usedPrefix}talar*
\t⊹ *${usedPrefix}robar*   [reply]
\t⊹ *${usedPrefix}pico*   [improve]
\t⊹ *${usedPrefix}espada*   [improve]
\t⊹ *${usedPrefix}hacha*   [improve]
\t⊹ *${usedPrefix}inv*   [reply]
\t⊹ *${usedPrefix}rpg*   [query]
\t⊹ *${usedPrefix}dep/dep2*   [query]
\t⊹ *${usedPrefix}ret/ret2*   [query]
\t⊹ *${usedPrefix}shop*   [query]
\t⊹ *${usedPrefix}stats*   [reply]`
let menuUtils = `\t⊹ *${usedPrefix}lid*
\t⊹ *${usedPrefix}lids*
\t⊹ *${usedPrefix}collabs*
\t⊹ *${usedPrefix}install*   [query]
\t⊹ *${usedPrefix}cid*   [link]
\t⊹ *${usedPrefix}chatgpt*  [text]
\t⊹ *${usedPrefix}imagina*  [text]
\t⊹ *${usedPrefix}fetch*   [link]
\t⊹ *${usedPrefix}getpic*   [mention]
\t⊹ *${usedPrefix}flag*   [country]
\t⊹ *${usedPrefix}hweb*   [link]`
let menuStick = `\t⊹ *${usedPrefix}exif-*
\t⊹ *${usedPrefix}exif+*   [text|text]
\t⊹ *${usedPrefix}s*   [reply]
\t⊹ *${usedPrefix}emojix*   [emoji+emoji]
\t⊹ *${usedPrefix}mtext*   [text]
\t⊹ *${usedPrefix}brat*   [text]
\t⊹ *${usedPrefix}qc*   [text]`
let menuLogos = `\t⊹ *${usedPrefix}logo1*   [text]
\t⊹ *${usedPrefix}logo2*   [text]
\t⊹ *${usedPrefix}logo3*   [text]
\t⊹ *${usedPrefix}logo4*   [text]
\t⊹ *${usedPrefix}logo5*   [text]
\t⊹ *${usedPrefix}logo6*   [text]
\t⊹ *${usedPrefix}logo7*   [text]
\t⊹ *${usedPrefix}logo8*   [text]
\t⊹ *${usedPrefix}logo9*   [text]
\t⊹ *${usedPrefix}logo10*   [text]
\t⊹ *${usedPrefix}logo11*   [text]
\t⊹ *${usedPrefix}logo12*   [text]
\t⊹ *${usedPrefix}logo13*   [text]
\t⊹ *${usedPrefix}logo14*   [text]
\t⊹ *${usedPrefix}logo15*   [text]
\t⊹ *${usedPrefix}logo16*   [text]
\t⊹ *${usedPrefix}logo17*   [text]
\t⊹ *${usedPrefix}logo18*   [text]
\t⊹ *${usedPrefix}logo19*   [text]
\t⊹ *${usedPrefix}logo20*   [text]
\t⊹ *${usedPrefix}logo21*   [text]
\t⊹ *${usedPrefix}logo22*   [text]
\t⊹ *${usedPrefix}logo23*   [text]
\t⊹ *${usedPrefix}logo24*   [text]
\t⊹ *${usedPrefix}logo25*   [text]
\t⊹ *${usedPrefix}logo26*   [text]
\t⊹ *${usedPrefix}logo27*   [text]
\t⊹ *${usedPrefix}logo28*   [text]
\t⊹ *${usedPrefix}logo29*   [text]
\t⊹ *${usedPrefix}logo30*   [text]
\t⊹ *${usedPrefix}logo31*   [text]
\t⊹ *${usedPrefix}logo32*   [text]
\t⊹ *${usedPrefix}logo33*   [text]
\t⊹ *${usedPrefix}logo34*   [text]
\t⊹ *${usedPrefix}logo35*   [text]
\t⊹ *${usedPrefix}logo36*   [text]
\t⊹ *${usedPrefix}logo37*   [text]`
let menuColec = `\t⊹ *${usedPrefix}value!*
\t⊹ *${usedPrefix}view*   [c]
\t⊹ *${usedPrefix}c*   [reply]
\t⊹ *${usedPrefix}vote*   [name]
\t⊹ *${usedPrefix}info!*   [name]
\t⊹ *${usedPrefix}img!*   [name]
\t⊹ *${usedPrefix}sellc*   [query]`
let menuRandom = `\t⊹ *${usedPrefix}wallp*
\t⊹ *${usedPrefix}rd messi*
\t⊹ *${usedPrefix}rd cr7*
\t⊹ *${usedPrefix}rd bts*
\t⊹ *${usedPrefix}rd navidad*
\t⊹ *${usedPrefix}rd hallowen*
\t⊹ *${usedPrefix}rd itzy*
\t⊹ *${usedPrefix}rd universo*`
let menuReac = `\t⊹ *${usedPrefix}angry*   [mention]
\t⊹ *${usedPrefix}bath*   [mention]
\t⊹ *${usedPrefix}bite*   [mention]
\t⊹ *${usedPrefix}bleh*   [mention]
\t⊹ *${usedPrefix}blush*   [mention]
\t⊹ *${usedPrefix}boted*   [mention]
\t⊹ *${usedPrefix}clap*   [mention]
\t⊹ *${usedPrefix}coffee*   [mention]
\t⊹ *${usedPrefix}cry*   [mention]
\t⊹ *${usedPrefix}cuddle*   [mention]
\t⊹ *${usedPrefix}dance*   [mention]
\t⊹ *${usedPrefix}drunk*   [mention]
\t⊹ *${usedPrefix}eat*   [mention]
\t⊹ *${usedPrefix}facepalm*   [mention]
\t⊹ *${usedPrefix}hug*   [mention]
\t⊹ *${usedPrefix}kill*   [mention]
\t⊹ *${usedPrefix}kiss*   [mention]
\t⊹ *${usedPrefix}laugh*   [mention]
\t⊹ *${usedPrefix}lick*   [mention]
\t⊹ *${usedPrefix}slap*   [mention]
\t⊹ *${usedPrefix}sleep*   [mention]
\t⊹ *${usedPrefix}smoke*   [mention]
\t⊹ *${usedPrefix}spit*   [mention]
\t⊹ *${usedPrefix}step*   [mention]
\t⊹ *${usedPrefix}think*   [mention]
\t⊹ *${usedPrefix}love*   [mention]
\t⊹ *${usedPrefix}pat*   [mention]
\t⊹ *${usedPrefix}poke*   [mention]
\t⊹ *${usedPrefix}pout*   [mention]
\t⊹ *${usedPrefix}punch*   [mention]
\t⊹ *${usedPrefix}preg*   [mention]
\t⊹ *${usedPrefix}sprint*   [mention]
\t⊹ *${usedPrefix}sad*   [mention]
\t⊹ *${usedPrefix}scared*   [mention]
\t⊹ *${usedPrefix}seduce*   [mention]
\t⊹ *${usedPrefix}shu*   [mention]
\t⊹ *${usedPrefix}walk*   [mention]
\t⊹ *${usedPrefix}dramatic*   [mention]
\t⊹ *${usedPrefix}kisscheek*   [mention]
\t⊹ *${usedPrefix}wink*   [mention]
\t⊹ *${usedPrefix}cringe*   [mention]
\t⊹ *${usedPrefix}smug*   [mention]
\t⊹ *${usedPrefix}smile*   [mention]
\t⊹ *${usedPrefix}mano*   [mention]
\t⊹ *${usedPrefix}bullying*   [mention]
\t⊹ *${usedPrefix}wave*   [mention]`
let menuOwn = `\t⊹ *${usedPrefix}fix*
\t⊹ *${usedPrefix}err*
\t⊹ *${usedPrefix}xbot*
\t⊹ *${usedPrefix}++admin*
\t⊹ *${usedPrefix}wx-*   [query]
\t⊹ *${usedPrefix}-prem*   [mention]
\t⊹ *${usedPrefix}-mod*   [mention]
\t⊹ *${usedPrefix}-admin*   [mention]
\t⊹ *${usedPrefix}gplug*   [query]
\t⊹ *${usedPrefix}file+*   [query]
\t⊹ *${usedPrefix}file-*   [query]
\t⊹ *${usedPrefix}ban+*   [mention]
\t⊹ *${usedPrefix}ban-*   [mention]
\t⊹ *${usedPrefix}block+*   [mention]
\t⊹ *${usedPrefix}block-*   [mention]
\t⊹ *${usedPrefix}bot-name*   [text]
\t⊹ *${usedPrefix}bot-img*   [reply]
\t⊹ *${usedPrefix}bot-desc*   [text]`
let menuEdit = `\t⊹ *${usedPrefix}new-ch*   [link]
\t⊹ *${usedPrefix}new-group*   [link]
\t⊹ *${usedPrefix}new-name*   [text]
\t⊹ *${usedPrefix}new-desc*   [text]
\t⊹ *${usedPrefix}new-menu*   [reply]
\t⊹ *${usedPrefix}new-icon*   [reply]`
let menuPrem = `\t⊹ *${usedPrefix}temblor*
\t⊹ *${usedPrefix}rv*   [reply]
\t⊹ *${usedPrefix}clima*   [query]`
const name = await conn.getName(m.sender)
const thumbBot = Buffer.from(await (await fetch(`${global.toruMenu}`)).arrayBuffer())
const thumbBot2 = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
const premium = user.premium ? '✓' : '✘'
const uptime = clockString(process.uptime() * 1000)
const dFormato = new Date(new Date + 3600000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
await m.react("✅")
if (!args[0]) {
let menu = `> ${hora}, ${dia} ${fechaTxt}

〝👋🏻  Bot automático via *(WhatsApp/Business)*, puede obtener información/datos o otras ventajas para proporcionar un uso util para todo usuario.〞

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
⎋ URL : ${botweb}
${readMore}
\t〩 \`Categorias:\`
${listaPrincipal}

\t⚶ Por ejemplo:
*#menu info*`
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot2, sourceUrl: botweb, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
//conn.sendMessage(m.chat, { text: menu, contextInfo: { forwardingScore: 1, isForwarded: false, externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: botname, body: textbot, containsAutoReply: true, mediaType: 1, thumbnailUrl: thumbBot2, sourceUrl: botweb }}}, { quoted: m })

} else if (args[0] === 'info' || args[0] === '1') {
let categoInfo = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Informacion\`
${menuInfo}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoInfo, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'dls' || args[0] === '2') {
let categoDesc = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Descargadores\`
${menuDesc}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoDesc, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'conv' || args[0] === '3') {
let categoConv = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Convertidor\`
${menuConv}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoConv, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'search' || args[0] === '4') {
let categoSearch = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Buscador\`
${menuSearch}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoSearch, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'group' || args[0] === '5') {
let categoGroup = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Grupos\`
${menuGroup}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoGroup, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'shop' || args[0] === '6') {
let categoShop = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Beneficios\`
${menuShop}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoShop, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'rpg' || args[0] === '7') {
let categoRpg = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Juegos RPG\`
${menuRpg}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoRpg, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'utils' || args[0] === '8') {
let categoUtils = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Ajustes\`
${menuUtils}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoUtils, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'stickers' || args[0] === '9') {
let categoStick = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Stickers\`
${menuStick}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoStick, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'logos' || args[0] === '10') {
let categoLogos = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Logos\`
${menuLogos}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoLogos, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'coleccion' || args[0] === '11') {
let categoColec = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Coleccion\` \`\`\`[ Actualizando... ]\`\`\`
${menuColec}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoColec, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'random' || args[0] === '12') {
let categoRandom = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Random\`
${menuRandom}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoRandom, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'reac' || args[0] === '13') {
let categoReac = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Reaccion\`
${menuReac}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoReac, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'editor' || args[0] === '14') {
let categoEdit = `${m.isGroup ? (chat.fEdits ? `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Editor\`
${menuEdit}

> ${textbot}` : `📍  Compra un plan que incluya los comandos de edición usar.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.`) : ''}`
return conn.sendMessage(m.chat, { text: categoEdit, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'premium' || args[0] === '15')
let categoPrem = `${m.isGroup ? (chat.fEdits ? `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Premium\`
${menuPrem}

> ${textbot}` : `📍  Compra un plan que incluya los comandos premium usar.\n- Usa *${usedPrefix}plan* para ver los planes disponibles.`) : ''}`
return conn.sendMessage(m.chat, { text: categoPrem, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'owner' || args[0] === 'own') {
let categoOwn = `> ${hora}, ${dia} ${fechaTxt}

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Propietario\`
${menuOwn}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoOwn, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === 'all' || args[0] === '0') {
let categoAll = `> ${hora}, ${dia} ${fechaTxt}

〝👋🏻  Bot automático via *(WhatsApp/Business)*, puede obtener información/datos o otras ventajas para proporcionar un uso util para todo usuario.〞

⧨ Modo : *Privado*
🜲 Usuario : @${name}
＃ Prefix : *(/ ! # - .)*
ᗢ Premium : *${premium}*
✦ Version : *${vs} (/mx_lt)*
${readMore}
༤〩 \`Informacion\`
${menuInfo}


༤〩 \`Descargas\`
${menuDesc}


༤〩 \`Convertidor\`
${menuConv}


༤〩 \`Buscador\`
${menuSearch}


༤〩 \`Grupos\`
${menuGroup}


༤〩 \`Tienda\`
${menuShop}


༤〩 \`Juegos RPG\`
${menuRpg}


༤〩 \`Ajustes\`
${menuUtils}


༤〩 \`Stickers\`
${menuStick}


༤〩 \`Logos\`
${menuLogos}


༤〩 \`Coleccion\` *(actualizando...)*
${menuColec}


༤〩 \`Random\`
${menuRandom}


༤〩 \`Reaccion\`
${menuReac}${m.isGroup ? (chat.fEdits ? `\n\n\n༤〩 \`Editor\`\n${menuEdit}` : '') : ''}${m.isGroup ? (chat.fPremium ? `\n\n\n༤〩 \`Premium\`\n${menuPrem}` : '') : ''}


༤〩 \`Propietario\`
${menuOwn}

> ${textbot}`
return conn.sendMessage(m.chat, { text: categoAll, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else {
let pruebaXd = `📍  El menu *( ${args[0]} )* no existe.\n- Use *${usedPrefix + command}* para ver las categorías.`
return conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m })
 } 
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}
}

handler.command = ['menu', 'help', 'menú']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }
