var handler = async (m, {conn, usedPrefix, command}) => {

if (!m.quoted) return conn.reply(m.chat, `*⚠️ RESPONDA A UN VÍDEO QUE DESEE CONVERTIR A GIF CON AUDIO*`, m)
const q = m.quoted || m
const mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.reply(m.chat, `*⚠️ MÍMICA ${mime} NO SOPORTADA*`, m)
const media = await q.download()
conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '*🚀🚀*'}, {quoted: m})

}
handler.help = ['togifaud']
handler.tags = ['transformador']
handler.command = ['togifaud']
 
export default handler
