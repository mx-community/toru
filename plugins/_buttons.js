import yts from 'yt-search'
let handler = async (m, {conn, usedPrefix, text, args, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `ᗢ Proporcione una búsqueda en YouTube.\n\n\t⚶ Por ejemplo:\n*${usedPrefix + command}* Golden Brown` }, { quoted: m })
await m.react("⏰")
try {
let result = await yts(text)
let ytres = result.videos
let teskd = `· ┄ · ⊸ 𔓕 *YouTube  :  Search*\n\n\t＃ *Busqueda* : ${text}\n\t＃ *Resultados* ${ytres.length} results\n\t＃ *Fuente* : YouTube`

let listSections = []
for (let index in ytres) {
let v = ytres[index]
listSections.push({
title: `〩 YouTube : Search 〩`,
rows: [
{
header: 'AUDIO',
title: v.title,
description: `${v.timestamp}\n`,
id: `${usedPrefix}ytmp3 ${v.url}`
},
{
header: 'VIDEO',
title: v.title,
description: `${v.timestamp}\n`,
id: `${usedPrefix}ytmp4 ${v.url}`
}
]
})
}
await conn.sendList(m.chat, teskd, ``, 'Ver Lista', listSections, m)
} catch (e) {
await conn.sendMessage(m.chat, { text: e.message }, { quoted: m })
console.log(e)
}
}

handler.command = ["button"]
export default handler

