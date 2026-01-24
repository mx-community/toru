import axios from 'axios' 
import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  try {
    // Crear botones interactivos
    const buttons = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Opción 1",
          id: `${usedPrefix}opcion1`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Opción 2",
          id: `${usedPrefix}opcion2`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Cancelar",
          id: `${usedPrefix}cancelar`
        })
      }
    ]

    // Mensaje con botones
    const message = {
      header: "Menú de Opciones",
      body: "Selecciona una opción:",
      footer: "Bot de prueba",
      nativeFlowMessage: {
        buttons: buttons
      }
    }

    // Enviar mensaje con botones
    await conn.sendMessage(m.chat, {
      interactiveMessage: message
    }, { quoted: m })

  } catch (error) {
    console.error('Error al enviar botones:', error)
    await conn.reply(m.chat, '❌ Ocurrió un error al mostrar los botones.', m)
  }
}

handler.command = ["test"]

export default handler
