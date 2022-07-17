/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const fs = require('fs')
const { console } = require('./console')
const WebSocket = require('ws')

module.exports = class {

    /**
     * @param {json} req
     */

    static async newmessage(req) {

        const input = req.messagedata.input;
        if (input.startsWith("!name")) {
            var value = input;
            var valueAsArray = value.split(" ");
            valueAsArray[0] = "";
            value = valueAsArray.join(" ");

            var server = require('../storage/server.json')

            const id = req.messagedata.user.id

            for (let i = 0; i < server.server[0].user.length; i++) {
                if(server.server[0].user[i].id == id){
                    console.log(JSON.stringify(value))
                    server.server[0].user[i].username = value;
                }
            }

            await fs.writeFileSync("./storage/server.json",JSON.stringify(server))

            try {
                const connected_devices = require('../storage/connected_devices.json')
                for (let i = 0; i < connected_devices.devices.length; i++) {
                    if (connected_devices.devices[i].ip == "127.0.0.2") {
                        const returnservice = new WebSocket("ws:127.0.0.2:" + connected_devices.devices[i].port)
                        returnservice.addEventListener("open", e => {
                            returnservice.send(JSON.stringify({"question":"renamuser","user":{"userid":id,"newusername":value}}))
                        })
                        returnservice.on('error', e => {
                            console.logError(e, "[1] Fehler")
                        })
                    }
                }
            } catch (e) {
                console.logError(e, "[1] Fehler")
            }

            return {"send":false}
        }
        else {
            return {"send":true}
        }

    }

}
