/**
 * ApplicationController.js
 *
 * Application controller responsible for hardware system startup and
 * shutdown and initiating the event system
 *
 * @class ApplicationController
 *
 */


const config = require('../config.js');

class ApplicationController {
    constructor() {
        
        this._stuff = config;
    }

    start() {
        console.log(this._stuff);
    }
}

module.exports = ApplicationController;