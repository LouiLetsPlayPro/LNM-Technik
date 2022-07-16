var console = require('node:console')

console.log("[0] Load Resources");

const express = require('express')

var { console } = require('./modulfiles/console');
const { serverinformations } = require('./modulfiles/serverinformations')
const { newconnection } = require('./modulfiles/newconnection');
const { newmessage } = require('./modulfiles/newmessage');
const { registeruser } = require('./modulfiles/registeruser');
const { removeuser } = require('./modulfiles/removeuser');

console.log("[1] Create Server");

const app = express()

console.log("[0] Initialize Server Informations");

const PORT = require('./storage/connected_devices.json').devices[0].port
const IP = require('./storage/connected_devices.json').devices[0].ip
const KEY = "15LVM.ts.0,0,1"
const NAME = require('./storage/connected_devices.json').devices[0].name

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/", (req, res) => {

    const jsonrequestdata = req.body
    console.log(JSON.stringify(req.body))

    if (!jsonrequestdata.KEY) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without KEY");
    }

    if (!jsonrequestdata.NAME) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without NAME");
    }

    if (jsonrequestdata.KEY != KEY) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without valid KEY");
    }

    if (jsonrequestdata.NAME != "dLVM-1LS.management=client") {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without valid NAME");
    }
    
    if (jsonrequestdata.newconnection) {
        if (jsonrequestdata.newconnection == "true") {
            newconnection(jsonrequestdata, res)
        }
    }

    const connected_devices = require('./storage/connected_devices.json')
    if (!jsonrequestdata.port) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without port");
    }
    if (!jsonrequestdata.ip) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without ip");
    }
    if (jsonrequestdata.ip != "127.0.1.1") {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without valid ip");
    }
    if (!connected_devices.devices.includes(jsonrequestdata.port)) {
        res.json({ "text": "Verbindung nicht erlaubt!", "data": "forbidden" })
        return console.logWarning("New Reqeust without valid port");
    }

    if(jsonrequestdata.newmessage){
        newmessage(jsonrequestdata, res)
    }

    if(jsonrequestdata.newuser){
        registeruser(jsonrequestdata, res)
    }

    if(jsonrequestdata.removeconnection){
        removeconnection(jsonrequestdata, res)
    }

    if(jsonrequestdata.removeuser){
        removeuser(jsonrequestdata, res)
    }
})

app.get("/", () => { })

app.listen(PORT, IP, () => {

    console.log("[1] LVM Technik BOOT");
    serverinformations(PORT, IP, KEY, NAME)
})
