import axios from 'axios' 
import fetch from 'node-fetch'
import pkg from '@whiskeysockets/baileys'
const {generateWAMessageFromContent, proto} = pkg
let handler = async (m, { conn, command, args, text, usedPrefix }) => {

let msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: 'test' }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: 'test' }),
header: proto.Message.InteractiveMessage.Header.create({ title: 'test', subtitle: 'test', hasMediaAttachment: false }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [{
name: 'single_select',
buttonParamsJson:
'{"title":"title","sections":[{"title":"title","highlight_label":"label","rows":[{"header":"header","title":"title","description":"description","id":"id"},{"header":"header","title":"title","description":"description","id":"id"}]}]}'
}, {
name: 'quick_reply',
buttonParamsJson: { display_text: "quick_reply", id: `${usedPrefix}run`}
}
]})})}}}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id})
}
handler.command = ["button"]

export default handler



