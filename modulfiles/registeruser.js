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
     * @param {json} req
     */

    static registeruser(req) {

        var serverdata = require('../storage/server.json')

        const id = CheckRandomNumber(serverdata)

        serverdata.server[0].user.push({ id: id, username: req.userdata, profilePicture: "./profile.JPG" })
        const userdata = { id: id, username: req.userdata, profilePicture: "./profile.JPG" }

        fs.writeFileSync("./storage/server.json", JSON.stringify(serverdata))
        return { "userdata": userdata, "question": "newuser","port":req.auth.port }

    }

}

function generateRandomINT(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function CheckRandomNumber(serverdata) {
    const generatedid = generateRandomINT(1000000000000000, 9999999999999999)
    return generatedid
}
