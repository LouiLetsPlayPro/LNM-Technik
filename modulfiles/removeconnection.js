/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const fs = require('fs')
const { console } = require('./console')
const { removeuser } = require('./removeuser')

module.exports = class {

    /**
     * @param {json} req
     */

    static removeconnction(req) {

        const Connecteddevices = require('../storage/connected_devices.json')
        console.log("[2] Port Disabled 127.0.0.2:" + req.auth.port)

        const newdevices = { "devices": [] }

        removeuser({"id": req.userid})

        for (let i = 0; i < Connecteddevices.devices.length; i++) {

            if(Connecteddevices.devices[i].port != req.auth.port){
                newdevices.devices.push(Connecteddevices.devices[i])
            }

        }

        fs.writeFileSync("./storage/connected_devices.json", JSON.stringify(newdevices), (e) => {
            console.logError(e, "[2] Fehler!")
        })

        return;

    }

}
