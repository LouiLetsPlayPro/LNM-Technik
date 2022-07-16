/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const fs = require('fs')
const { console } = require('./console')

module.exports = class {

    /**
     * @param {Express.Response} res 
     */

    static newconnection(res) {

        const Connecteddevices = require('../storage/connected_devices.json')
        const portdata = Connecteddevices.devices.length + 1
        console.log("[2] New Port set to Server 127.0.1.1:" + portdata)

        Connecteddevices.devices.push({port:portdata, ip:"127.0.1.1", name:"dLVM-1LS.management=client"})
        fs.writeFileSync("./storage/connected_devices.json", JSON.stringify(Connecteddevices), function(e) {
            console.logError(e,"[2] Fehler!")
        })

        return { "use_port": portdata }
    }

}
