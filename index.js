var console = require('node:console')

console.log("[0] Load Resources");

const WebSocket = require('ws')

var { console } = require('./modulfiles/console');
const { serverinformations } = require('./modulfiles/serverinformations')
const { newconnection } = require('./modulfiles/newconnection');
const { newmessage } = require('./modulfiles/newmessage');
const { registeruser } = require('./modulfiles/registeruser');
const { removeuser } = require('./modulfiles/removeuser');
const { removeconnction } = require('./modulfiles/removeconnection')
const { getserver } = require('./modulfiles/getserver')

console.log("[1] Create Server");

console.log("[0] Initialize Server Informations");

const PORT = require('./storage/connected_devices.json').devices[0].port
const IP = require('./storage/connected_devices.json').devices[0].ip
const KEY = "15LVM.ts.0,0,1"
const NAME = require('./storage/connected_devices.json').devices[0].name

const wss = new WebSocket.Server({
    host: IP,
    port: PORT
})

console.log("[1] LVM Technik BOOT");
serverinformations(PORT, IP, KEY, NAME)

wss.on("connection", ws => {

    ws.on('message', async message => {
        const jsonrequestdata = JSON.parse(message)
        console.log(JSON.stringify(jsonrequestdata))

        if (!jsonrequestdata.auth) {
            return console.logWarning("New Reqeust without AUTH");
        }

        if (!jsonrequestdata.auth.KEY) {
            return console.logWarning("New Reqeust without KEY");
        }

        if (!jsonrequestdata.auth.NAME) {
            return console.logWarning("New Reqeust without NAME");
        }

        if (jsonrequestdata.auth.KEY != KEY) {
            return console.logWarning("New Reqeust without valid KEY");
        }

        if (jsonrequestdata.auth.NAME != NAME) {
            return console.logWarning("New Reqeust without valid NAME");
        }

        if (jsonrequestdata.newconnection) {
            if (jsonrequestdata.newconnection == true) {
                const datareturn = newconnection(jsonrequestdata)

                const returnservice = new WebSocket("ws:127.0.0.2:1")
                returnservice.addEventListener("open", e => {
                    returnservice.send(JSON.stringify(datareturn))
                })
                return;
            }
        }

        const connected_devices = require('./storage/connected_devices.json')
        if (!jsonrequestdata.auth.port) {
            return console.logWarning("New Reqeust without port");
        }
        if (!jsonrequestdata.auth.ip) {
            return console.logWarning("New Reqeust without ip");
        }
        if (jsonrequestdata.auth.ip != "127.0.0.2") {
            return console.logWarning("New Reqeust without valid ip");
        }
        var portacces = false
        for (let i = 0; i < connected_devices.devices.length; i++) {
            if (connected_devices.devices[i].port == jsonrequestdata.auth.port) {
                portacces = true;
            }
        }

        if (portacces == false) {
            return console.logWarning("New Reqeust without valid port");
        }

        if (jsonrequestdata.newmessage) {
            const returns = await newmessage(jsonrequestdata)
            if (returns.send == false) {
                return;
            } else if (returns.send == true) {
                try {
                    for (let i = 0; i < connected_devices.devices.length; i++) {
                        if (connected_devices.devices[i].ip == "127.0.0.2") {
                            const returnservice = new WebSocket("ws:127.0.0.2:" + connected_devices.devices[i].port)
                            returnservice.addEventListener("open", e => {
                                returnservice.send(JSON.stringify({ "question": "newmessage", "messagedata": jsonrequestdata.messagedata }))
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

        if (jsonrequestdata.newuser) {
            var datareturn = registeruser(jsonrequestdata)
            try {
                for (let i = 0; i < connected_devices.devices.length; i++) {
                    if (connected_devices.devices[i].ip == "127.0.0.2") {
                        const returnservice = new WebSocket("ws:127.0.0.2:" + connected_devices.devices[i].port)
                        returnservice.addEventListener("open", e => {
                            returnservice.send(JSON.stringify(datareturn))
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

        if (jsonrequestdata.removeconnection) {
            removeconnction(jsonrequestdata)
        }

        if (jsonrequestdata.getserver) {
            const datareturn = getserver(jsonrequestdata)
            console.log(JSON.stringify(datareturn))

            try {
                const returnservice = new WebSocket("ws:127.0.0.2:" + jsonrequestdata.auth.port)
                returnservice.addEventListener("open", e => {
                    returnservice.send(JSON.stringify(datareturn))
                })
                returnservice.on('error', e => {
                    console.logError(e, "[1] Fehler")
                })
            } catch (e) {
                return console.logError(e, "[1] Fehler")
            }
            return;
        }
    })
})
