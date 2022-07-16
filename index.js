var console = require('node:console')

console.log("[0] Load Resources");

const express = require('express')
const fs = require('fs')
const package = require('./package.json')

var { console } = require('./modulfiles/console.js');

console.log("[1] Create Server");

const app = express()

console.log("[0] Initialize Server Informations");

const PORT = 9801
const IP = "127.0.0.1"
const KEY = "15LVM.ts.0,0,1"
const NAME= "dLVM-1LS.management=communication"

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post("/", (req, res) => {
    console.log(JSON.stringify(req.query))
    res.send("<a>Post Allowed!</a>")
})

app.listen(PORT, IP, () => {

    console.log("[1] LVM Technik BOOT");
    serverinformations(PORT, IP, KEY, NAME)
})

//console.log("[2] New System Connected to Server")


/**
 * 
 * @param {number} PORT 
 * @param {string} IP 
 * @param {string} KEY 
 * @param {string} NAME
 */

function serverinformations(PORT, IP, KEY, NAME) {
    console.log("Server Informations:");
    console.log("📝 Server Name: " + NAME);
    console.log("📝 Server IP: " + IP);
    console.log("📝 Server Port: " + PORT);
    console.log(" ");
    console.log(" ");
    console.log("DEV Informations:");
    console.log("🔐 Pack Name: " + package.name)
    console.log("🔐 Pack Version: " + package.version)
    console.log("🔐 Pack Autor: " + package.author)
    console.log("🔐 Pack Beschreibung: " + package.description)
    console.log("🔐 Pack Scripte: " + package.scripts)
    console.log("🔐 Pack Main: " + package.main)
    console.log("🔐 Pack Lizenz: " + package.license)
    console.log("🔑 Server KEY: " + KEY);
}
