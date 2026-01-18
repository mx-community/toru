import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, {conn, text, usedPrefix, command}) => {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks) return conn.reply(m.chat, `escribe`, m )
let img = 'https://api.delirius.store' + '/canvas/book?text' + teks
conn.sendFile(m.chat, img, 'toru.png', `Ya`, m)
}

handler.command = ['txt']
export default handler

