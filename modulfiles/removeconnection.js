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
     * @param {number} id
     */

    static async removeuser(id) {

        var server = require('../storage/server.json')
        var users = server.server[0].user
        var newusers = []

        for (let i = 0; i < users.length; i++) {
            console.log("[2." + i + "] LOG: " + JSON.stringify(users[i].id) + " - " + JSON.stringify(id.id))
            if(users[i].id != id.id){
                console.log("[2." + i + "] LOG: " + JSON.stringify(users[i]))
                newusers.push(users[i])
            }
        }

        server.server[0].user = newusers
        console.log("[4] " + JSON.stringify(server.server[0].user))

        await fs.writeFileSync("./storage/server.json", JSON.stringify(server))

        try {
            const connected_devices = require('../storage/connected_devices.json')
            for (let i = 0; i < connected_devices.devices.length; i++) {
                if (connected_devices.devices[i].ip == "127.0.0.2") {
                    const returnservice = new WebSocket("ws:127.0.0.2:" + connected_devices.devices[i].port)
                    returnservice.addEventListener("open", e => {
                        returnservice.send(JSON.stringify({"question":"removeuser","userid":id}))
                    })
                    returnservice.on('error', e => {
                        console.logError(e, "[1] Fehler")
                    })
                }
            }
        } catch (e) {
            console.logError(e, "[1] Fehler")
        }
    }

}
