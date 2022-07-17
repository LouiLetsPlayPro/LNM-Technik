/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

const fs = require('fs')
const { console } = require('./console')
const { registeruser } = require('./registeruser')

module.exports = class {

    /**
     * @return {JSON}
     */

    static getserver() {

        const serverdata = require('../storage/server.json')
        return { "serverdata": serverdata, "question": "getserver" }
    }

}
