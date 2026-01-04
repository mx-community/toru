import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (command === "respuesta") {
let takeda = `\t〨  *R E S U L T*

\t⸭ 📍 \`\`\`Responder reportes.\`\`\`

\t\t⧡ #sug+  :  *(aceptar)*
\t⧡ #sug-  :  *(denegar)*
\t\t⧡ #report+  :  *(aceptar)*
\t⧡ #report-  :  *(denegar)*
\t\t⧡ #solicitud+  :  *(aceptar)*
\t⧡ #solicitud-  :  *(denegar)*

\t\t⚶ Por ejemplo:
*#sug+* 549376237372

> ${textbot}`
await conn.sendMessage(m.chat, { text: takeda }, { quoted: m })
}


if (command === "sug+") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el número..` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola un gusto, agradecemos tu sugerencia, lo tendremos en cuenta en nuestro proyecto continuo.
Esperamos y estes bien en este momento, tu sugerencia fue aceptada en nuestra comunidad.

att: @code_toru *[desarrollador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu sugerencia.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}

if (command === "sug-") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el numero.` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola usuario, tu sugerencia no fue aceptada en nuestra comunidad, esto puede ser por qué tu petición fue en contra de las normativas de nuestro proyecto.
De este modo, nos vemos obligados a rechazar tu sugerencia, para mas información puedes contactar con soporte personal.

att: @code_toru *[desarrollador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu sugerencia.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}

if (command === "report+") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el numero.` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola, mucho gusto, agradecemos que estes usando muestro proyecto, estaremos pendientes a tu reporte.
Tu reporte fue aceptada en nuestra comunidad, espero que tengas un dia o noche excelente hoy.

att: @no_valid *[administrador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu reporte.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}

if (command === "report-") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el numero.` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola usuario, tu reporte fue rechazado en nuestra comunidad, esto puede ser por que no se obtuvieron los resultados que segun tu específicas.
Por ende tu reporte no puede tener respuesta valida, esperamos que estes bien hoy, que tengan un excelente dia o noche.

att: @no_valid *[administrador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu reporte.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}


if (command === "solicitud+") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el numero.` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola usuario, agradecemos tu solicitud, estaremos en contacto contigo el tiempo que sea necesario.
Tu solicitud fue aceptada en nuestra comunidad, esperamos y vernos pronto, que tengas un dia o noche excelente.

att: @prem_toku *[moderador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu solicitud.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}

if (command === "solicitud-") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el numero.` }, { quoted: m });
const thumb = Buffer.from(await (await fetch(`${global.toruImg}`)).arrayBuffer())
let mensaje = `👋🏻  Hola usuario, esperamos y puedas comprender, no podemos aceptar tu solicitud debido a que no cumplen con nuestras reglas establecidas.
O de alguna manera no fue aprobado por los expertos, esperamos y puedas entender, que tengas un excelente dia.
Tambien si quieres dar mas detalles puedes contactar a un asistente personal.

att: @prem_toku *[moderador]*`
await conn.sendMessage(text+'@s.whatsapp.net', { text: mensaje, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: iname, 
body: "Mensaje sobre tu solicitud.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await conn.sendMessage(m.chat, { text: `✅  Se ha enviado la respuesta con éxito.` }, { quoted: m })
}

}
handler.command = ["respuesta", "sug+", "sug-", "report+", "report-", "solicitud+", "solicitud-"]
handler.owner = true 
export default handler


                                                                                                    
