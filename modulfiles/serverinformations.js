/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const { console } = require('./console')
const package = require('../package.json')

module.exports = class {

    /**
     * 
     * @param {PORT} PORT 
     * @param {IP} IP 
     * @param {KEY} KEY 
     * @param {NAME} NAME 
     */

    static serverinformations(PORT, IP, KEY, NAME) {

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
        console.log(" ");
        console.log(" ");
    }

}
