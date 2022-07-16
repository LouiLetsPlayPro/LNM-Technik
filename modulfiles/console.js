/**
 * Dieses Modul wurde für das Projekt LNM Technik entwickelt!
 * Es ist eine Erweiterung der allgemeinen Konsole.
 * 
 * Bitte dieses Modul nicht ohne Namensnennung verwenden!
 * By Loui
 */

 function getTimestamp() {
    var timeNow = new Date();
    var timestamp = "" + timeNow.toLocaleTimeString() + " " + timeNow.toLocaleDateString()
    return timestamp;
};

module.exports.console = class {
    /**
     * @param {string} message
    */
    static log(message) {
        console.log("\u001b[30;1m" + getTimestamp("DD-MM-YYYY hh:mm:ss") + " \u001b[0m" + message);
    };
    /**
     * @param {string} code
     * @param {string} message
     */
    static logError(code, message) {
        console.log("\u001b[30;1m" + getTimestamp("DD-MM-YYYY hh:mm:ss") + " \u001b[0m[\u001b[31;1m ERROR \u001b[0m] " + code + ": " + message);
    };
    /**
     * @param {string} message
     */
    static logWarning(message) {
        console.log("\u001b[30;1m" + getTimestamp("DD-MM-YYYY hh:mm:ss") + " \u001b[0m[\u001b[33m WARNING \u001b[0m]: " + message);
    };
    /**
     * @param {string} type
     * @param {string} status STILL|COMPLEATE|ERROR
     * @param {string} message
     */
    static logOperation(type, status, message) {
        console.log("\u001b[30;1m" + getTimestamp("DD-MM-YYYY hh:mm:ss") + " \u001b[0m[\u001b[36;1m OPERATION \u001b[0m] \u001b[35m" + status + "\u001b[0m|" + type + ": " + message);
    };
    /**
     * @param {string} status
     * @param {string} message
     */
    static logStatus(status, message) {
        console.log("\u001b[30;1m" + getTimestamp("DD-MM-YYYY hh:mm:ss") + " \u001b[0m[ \u001b[32m" + status + " \u001b[0m]: " + message);
    };
};
