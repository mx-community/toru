import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//Owner
global.botNumber = ""
global.owner = [ "5493873655135", "5493873579805", "51959842633", "51957626299" ]

//Roles
global.suittag = ["5493873655135"] 
global.prems = []
global.mods = []

global.libreria = "mx-baileys"
global.vs = "^1.0.0"
global.nameqr = "Onix-Created"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.alanWasock = true

global.dev = "Alan.Js"
global.author = "@mx-community"
global.etiqueta = "@mx-support"
global.currency = "Monedas"
global.currency2 = "Puntos"
global.banner = "https://qu.ax/XPDQK.jpg"
global.catalogo = "https://qu.ax/EpMPK.jpg"


global.ch = { ch1: "120363318353263389@newsletter" }



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.greenBright("Update 'configXD.js'"))
import(`${file}?update=${Date.now()}`)
})

