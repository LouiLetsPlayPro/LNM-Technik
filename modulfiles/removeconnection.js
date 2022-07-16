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
     * @param {Express.Response} res 
     */

    static removeconnction(req, res) {

        const Connecteddevices = require('../storage/connected_devices.json')
        console.log("[2] New Port set to Server 127.0.1.1:" + portdata)

        const newdevices = { "devices": [] }

        removeuser({"userip":"127.0.1.1", "userport": req.port}, res)

        for (let i = 0; i < Connecteddevices.devices.length; i++) {

            if(Connecteddevices.devices[i].port == req.port){

            }else{
                newdevices.devices.push(Connecteddevices.devices[i])
            }

        }

        fs.writeFileSync("../storage/connected_devices.json", newdevices, (e) => {
            console.logError(e, "[2] Fehler!")
        })

        return res.json({ "disconnected": true })

    }

}
