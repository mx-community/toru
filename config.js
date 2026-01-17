import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import axios from "axios"
import { fileURLToPath } from "url"
import fs from "fs"

//Owner
global.botNumber = ""
global.owner = [ "5493873655135", "573108625104", "5493873634786", "51959842633", "5493876639332", "523142183828", "51957626299" ]

global.apikeyOptishield = "ebe2e764b8a003d278472b711498aec7"

global.sendOptishield = async (params) => {
params.apikey = global.apikeyOptishield;
const { data: json } = await axios("https://optishield.uk/api/", {  params });
return json
}

//Roles
global.suittag = ["5493873655135"] 
global.prems = ["5493873655135"]
global.mods = ["5493873655135"]

global.libreria = "mx-baileys"
global.vs = "^1.8.2"
global.nameqr = "Onix-Created"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.alanWasock = true

global.dev = "Alan.Js"
global.author = "@mx-community"
global.etiqueta = "@mx-support"
global.currency = "Dolares"
global.currency2 = "Monedas"
global.toruads = "Sin anuncios por el momento..."
global.banner = "https://qu.ax/XPDQK.jpg"
global.catalogo = "https://qu.ax/EpMPK.jpg"
global.toruCh = "https://files.catbox.moe/bbm4z7.jpg"

global.ch = { ch1: "120363318353263389@newsletter" }



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.greenBright("Update 'config.js'"))
import(`${file}?update=${Date.now()}`)
})

