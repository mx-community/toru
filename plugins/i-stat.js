import speed from 'performance-now'
import moment from 'moment-timezone'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import { exec, execSync } from 'child_process'
import { sizeFormatter } from 'human-readable'
import os from 'os'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

const start = new Date().getTime()
await m.react("💾")
//conn.sendMessage(m.chat, { text: `📍  Enviando resultados de avance, espere un momento...` }, { quoted: m })
const end = new Date().getTime()
const ping = end - start

const timestamp = speed()
const latency = speed() - timestamp

const uptime = process.uptime()
const hours = Math.floor(uptime / 3600)
const minutes = Math.floor((uptime % 3600) / 60)
const seconds = Math.floor(uptime % 60)
const uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`

let totalUsers = Object.keys(global.db.data.users).length
let totalChats = Object.keys(global.db.data.chats).length
let totalBots = global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== 3).length

const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2)
const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
const cpu = os.cpus()[0]
const cpuModel = cpu.model.split('@')[0].trim()
const cpuSpeed = (cpu.speed / 1000).toFixed(2) // GHz 👻
const cores = os.cpus().length
const arch = os.arch()
const platform = os.platform().toUpperCase()
const nodeVer = process.version
const hostname = os.hostname()
const loadAvg = os.loadavg().map(n => n.toFixed(2)).join(', ')
const fechaHora = moment().tz('America/Buenos_Aires').format('YYYY/MM/DD, h:mm:ss A')

const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())

exec('neofetch --stdout', async (error, stdout) => {
let sysInfo = stdout.toString('utf-8').replace(/Memory:/, 'Ram:')
let response = `· ┄ · ⊸ 𔓕 *Status  :  Test*
＃ Servidores : *${totalBots + " bots" || "serverless"}*
⎋ R. usuarios : *${totalUsers.toLocaleString()}*
⎋ R. grupos : *${totalChats.toLocaleString()}*
⚶ Ping : *${ping} ms*
⧈ Latencia : *${latency.toFixed(2)} ms*
⎌ Actividad : *${uptimeFormatted}*
⏍ F.H : *${fechaHora}*

⫶☰ \`uso de RAM\`
⊸❒ *Ram usado:* ${usedRAM} GB
⊸❒ *Ram libre:* ${freeRAM} GB
⊸❒ *Ram total:* ${totalRAM} GB

⫶☰ \`SISTEMA\`
⛉ Carga : ${loadAvg}
⛉ Modelo : ${cpuModel}
⛉ Velocidad : ${cpuSpeed} GHz
⛉ Núcleos : ${cores}
⛉ Arquitectura : ${arch}
⛉ Plataforma : ${platform}
⛉ Hosting : ${hostname} 
⛉ Node.js : ${nodeVer}
⛉ Baileys : mx-data@bails.`

await conn.sendMessage(m.chat, {
text: response,
mentions: [m.sender],
contextInfo: {
externalAdReply: {
title: botname,
body: textbot,
thumbnail: thumb,
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: m })
})
}

handler.help = ['ping', 'status', 'stat']
handler.tags = ['info']
handler.command = ['stat', 'status']

export default handler
                                            
