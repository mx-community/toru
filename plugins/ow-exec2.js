import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec).bind(cp)
const handler = async (m, { conn, isOwner, isROwner, command, text, usedPrefix, args }) => {
if (!isROwner) return
if (conn.user.jid != conn.user.jid) return
let o
try {
await m.react("🔩")
o = await exec(command.trimStart() + ' ' + text.trimEnd())

} catch (e) {
o = e
await conn.sendMessage(m.chat, { text: `${e.message}` }, { quoted: m })
} finally {
const { stdout, stderr } = o
if (stdout.trim()) conn.sendMessage(m.chat, { text: stdout }, { quoted: m })
if (stderr.trim()) conn.sendMessage(m.chat, { text: stderr }, { quoted: m })
}}

handler.help = ['$']
handler.tags = ['owner']
handler.command = ["c+"]
handler.rowner = true
export default handler
