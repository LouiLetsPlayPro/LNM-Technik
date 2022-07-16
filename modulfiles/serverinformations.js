/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const { console } = require('./console')
const packagefile = require('../package.json')

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
        console.log("🔐 Pack Name: " + packagefile.name)
        console.log("🔐 Pack Version: " + packagefile.version)
        console.log("🔐 Pack Autor: " + packagefile.author)
        console.log("🔐 Pack Beschreibung: " + packagefile.description)
        console.log("🔐 Pack Scripte: " + JSON.stringify(packagefile.scripts))
        console.log("🔐 Pack Main: " + packagefile.main)
        console.log("🔐 Pack Lizenz: " + packagefile.license)
        console.log("🔑 Server KEY: " + KEY);
        console.log("🔑 Server NAME: " + require('../storage/connected_devices.json').devices[0].name)
        console.log(" ");
        console.log(" ");
    }

}
