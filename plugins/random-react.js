import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : m.sender)
let from = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
let who = await (async () => global.db.data.users[userId].name || (async () => { try { const n = await conn.getName(userId); return typeof n === 'string' && n.trim() ? n : userId.split('@')[0] } catch { return userId.split('@')[0] } })())()
let str, query
switch (command) {
case 'angry': case 'enojado':
str = from === who ? `${from} está enojado/a! 〩` : `${from} está enojado/a con ${who}! 〩`
query = 'anime angry'
break
case 'bath': case 'bañarse':
str = from === who ? `${from} se está bañando! 〩` : `${from} está bañando a ${who}! 〩`
query = 'anime bath'
break
case 'bite': case 'morder':
str = from === who ? `${from} se mordió a sí mismo/a! 〩` : `${from} mordió a ${who}! 〩`
query = 'anime bite'
break
case 'bleh': case 'lengua':
str = from === who ? `${from} saca la lengua! 〩` : `${from} le sacó la lengua a ${who}! 〩`
query = 'anime bleh'
break
case 'blush': case 'sonrojarse':
str = from === who ? `${from} se sonrojó! 〩` : `${from} se sonrojó por ${who}! 〩`
query = 'anime blush'
break
case 'bored': case 'aburrido':
str = from === who ? `${from} está aburrido/a! 〩` : `${from} está aburrido/a de ${who}! 〩`
query = 'anime bored'
break
case 'clap': case 'aplaudir':
str = from === who ? `${from} está aplaudiendo! 〩` : `${from} está aplaudiendo por ${who}! 〩`
query = 'anime clap'
break
case 'coffee': case 'cafe': case 'café':
str = from === who ? `${from} está tomando café! 〩` : `${from} está tomando café con ${who}! 〩`
query = 'anime coffee'
break
case 'cry': case 'llorar':
str = from === who ? `${from} está llorando! 〩` : `${from} está llorando por ${who}! 〩`
query = 'anime cry'
break
case 'cuddle': case 'acurrucarse':
str = from === who ? `${from} se acurrucó con sí mismo/a! 〩` : `${from} se acurrucó con ${who}! 〩`
query = 'anime cuddle'
break
case 'dance': case 'bailar':
str = from === who ? `${from} está bailando! 〩` : `${from} está bailando con ${who}! 〩`
query = 'anime dance'
break
case 'drunk': case 'borracho':
str = from === who ? `${from} está borracho! 〩` : `${from} está borracho con ${who}! 〩`
query = 'anime drunk'
break
case 'eat': case 'comer':
str = from === who ? `${from} está comiendo! 〩` : `${from} está comiendo con ${who}! 〩`
query = 'anime eat'
break
case 'facepalm': case 'palmada':
str = from === who ? `${from} se da una palmada en la cara! 〩` : `${from} se frustra y se da una palmada en la cara por ${who}! 〩`
query = 'anime facepalm'
break
case 'happy': case 'feliz':
str = from === who ? `${from} está feliz! 〩` : `${from} está feliz por ${who}! 〩`;
query = 'anime happy';
break
case 'hug': case 'abrazar':
str = from === who ? `${from} se abrazó a sí mismo/a! 〩` : `${from} abrazó a ${who}! 〩`;
query = 'anime hug'
break
case 'kill': case 'matar':
str = from === who ? `${from} se mató a sí mismo/a! 〩` : `${from} mató a ${who}! 〩`
query = 'anime kill'
break
case 'kiss': case 'muak':
str = from === who ? `${from} se besó a sí mismo/a! 〩` : `${from} besó a ${who}! 〩`
query = 'anime kiss'
break
case 'laugh': case 'reirse':
str = from === who ? `${from} se ríe! (≧▽≦)` : `${from} se está riendo de ${who}! 〩`
query = 'anime laugh'
break
case 'lick': case 'lamer':
str = from === who ? `${from} se lamió a sí mismo/a! 〩` : `${from} lamió a ${who}! 〩`
query = 'anime lick'
break
case 'slap': case 'bofetada':
str = from === who ? `${from} se golpeó a sí mismo/a! 〩` : `${from} le dio una bofetada a ${who}! 〩`
query = 'anime slap'
break
case 'sleep': case 'dormir':
str = from === who ? `${from} está durmiendo profundamente! 〩` : `${from} duerme junto a ${who}! 〩`
query = 'anime sleep'
break
case 'smoke': case 'fumar':
str = from === who ? `${from} está fumando! 〩` : `${from} está fumando con ${who}! 〩`
query = 'anime smoke'
break
case 'spit': case 'escupir':
str = from === who ? `${from} se escupió a sí mismo/a! 〩` : `${from} escupió a ${who}! 〩`
query = 'anime spit'
break
case 'step': case 'pisar':
str = from === who ? `${from} se pisó a sí mismo/a! 〩` : `${from} pisó a ${who}! sin piedad 〩`
query = 'anime step'
break
case 'think': case 'pensar':
str = from === who ? `${from} está pensando! 〩` : `${from} está pensando en ${who}! 〩`
query = 'anime think'
break
case 'love': case 'enamorado': case 'enamorada':
str = from === who ? `${from} está enamorado/a de sí mismo/a! 〩` : `${from} está enamorado/a de ${who}! 〩`
query = 'anime love'
break
case 'pat': case 'palmadita': case 'palmada':
str = from === who ? `${from} se da palmaditas de autoapoyo! 〩` : `${from} acaricia suavemente a ${who}! 〩`
query = 'anime pat'
break
case 'poke': case 'picar':
str = from === who ? `${from} se da un toque curioso! 〩` : `${from} da un golpecito a ${who}! 〩`
query = 'anime poke'
break
case 'pout': case 'pucheros':
str = from === who ? `${from} hace pucheros! 〩` : `${from} está haciendo pucheros por ${who}! 〩`
query = 'anime pout'
break
case 'punch': case 'pegar': case 'golpear':
str = from === who ? `${from} se golpeó a sí mismo/a! 〩` : `${from} golpea a ${who}! con todas sus fuerzas 〩`
query = 'anime punch'
break
case 'preg': case 'preñar': case 'embarazar':
str = from === who ? `${from} se embarazó solito/a... misterioso! 〩` : `${from} le regaló 9 meses de espera a ${who}! 〩`
query = 'anime preg'
break
case 'sprint': case 'correr':
str = from === who ? `${from} está haciendo cardio... o eso dice! 〩` : `${from} sale disparado/a al ver a ${who} acercarse! 〩`
query = 'anime run'
break
case 'sad': case 'triste':
str = from === who ? `${from} contempla la lluvia con expresión triste! 〩` : `${from} mira por la ventana y piensa en ${who}! 〩`
query = 'anime sad'
break
case 'scared': case 'asustada': case 'asustado':
str = from === who ? `${from} se asusta! 〩` : `${from} está aterrorizado/a de ${who}! 〩`
query = 'anime scared'
break
case 'seduce': case 'seducir':
str = from === who ? `${from} susurra versos de amor al aire! 〩` : `${from} lanza una mirada que derrite a ${who}! 〩`
query = 'anime seduce'
break
case 'shy': case 'timido': case 'timida':
str = from === who ? `${from} no sabe cómo actuar... se pone rojo/a! 〩` : `${from} baja la mirada tímidamente frente a ${who}! 〩`
query = 'anime shy'
break
case 'walk': case 'caminar':
str = from === who ? `${from} pasea! 〩` : `${from} está caminando con ${who}! 〩`;
query = 'anime walk' 
break
case 'dramatic': case 'drama':
str = from === who ? `${from} está montando un show digno de un Oscar! 〩` : `${from} está actuando dramáticamente por ${who}! 〩`
query = 'anime dramatic'
break
case 'kisscheek': case 'beso':
str = from === who ? `${from} se besó la mejilla con cariño! 〩` : `${from} besó la mejilla de ${who} con ternura! 〩`
query = 'anime kisscheek'
break
case 'wink': case 'guiñar':
str = from === who ? `${from} se guiñó el ojo a sí mismo/a en el espejo! 〩` : `${from} le guiñó el ojo a ${who}! 〩`
query = 'anime wink'
break
case 'cringe': case 'avergonzarse':
str = from === who ? `${from} siente cringe! 〩` : `${from} siente cringe por ${who}! 〩`
query = 'anime cringe'
break
case 'smug': case 'presumir':
str = from === who ? `${from} está presumiendo mucho últimamente! 〩` : `${from} está presumiendo a ${who}! 〩`
query = 'anime smug'
break
case 'smile': case 'sonreir':
str = from === who ? `${from} está sonriendo! 〩` : `${from} le sonrió a ${who}! 〩`
query = 'anime smile'
break
case 'handhold': case 'mano':
str = from === who ? `${from} se dio la mano consigo mismo/a! 〩` : `${from} le agarró la mano a ${who}! 〩`
query = 'anime handhold'
break
case 'bullying': case 'bully':
str = from === who ? `${from} se hace bullying solo… alguien abrácelo! 〩` : `${from} le está haciendo bullying a ${who}! 〩`
query = 'anime bullying'
break
case 'wave': case 'hola': case 'ola':
str = from === who ? `${from} se saludó a sí mismo/a en el espejo! 〩` : `${from} está saludando a ${who}! 〩`
query = 'anime wave'
break
}
if (m.isGroup) {
try {
const res = await fetch(`https://delirius-apiofc.vercel.app/search/tenor?q=${query}`)
const json = await res.json()
const gifs = json.data
if (!gifs || gifs.length === 0) return conn.sendMessage(m.chat, { text: `No se han encontrado resultados.` }, { quoted: m })
const randomGif = gifs[Math.floor(Math.random() * gifs.length)].mp4
conn.sendMessage(m.chat, { video: { url: randomGif }, gifPlayback: true, caption: str, mentions: [who] }, { quoted: m })
} catch (e) {
return conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
}}}

handler.command = ['angry', 'enojado', 'bath', 'bañarse', 'bite', 'morder', 'bleh', 'lengua', 'blush', 'sonrojarse', 'bored', 'aburrido', 'clap', 'aplaudir', 'coffee', 'cafe', 'café', 'cry', 'llorar', 'cuddle', 'acurrucarse', 'dance', 'bailar', 'drunk', 'borracho', 'eat', 'comer', 'facepalm', 'palmada', 'happy', 'feliz', 'hug', 'abrazar', 'kill', 'matar', 'kiss', 'muak', 'laugh', 'reirse', 'lick', 'lamer', 'slap', 'bofetada', 'sleep', 'dormir', 'smoke', 'fumar', 'spit', 'escupir', 'step', 'pisar', 'think', 'pensar', 'love', 'enamorado', 'enamorada', 'pat', 'palmadita', 'palmada', 'poke', 'picar', 'pout', 'pucheros', 'punch', 'pegar', 'golpear', 'preg', 'preñar', 'embarazar', 'sprint', 'correr', 'sad', 'triste', 'scared', 'asustada', 'asustado', 'seduce', 'seducir', 'shy', 'timido', 'timida', 'walk', 'caminar', 'dramatic', 'drama', 'kisscheek', 'beso', 'wink', 'guiñar', 'cringe', 'avergonzarse', 'smug', 'presumir', 'smile', 'sonreir', 'bully', 'bullying', 'mano', 'handhold', 'ola', 'wave', 'hola']
handler.group = true

export default handler
