/**
 * ApplicationController.js
 *
 * Application controller responsible for hardware system startup and
 * shutdown and initiating the event system
 *
 * @class ApplicationController
 *
 */


const events = require('./EventController').events;
const RPi = require('./HardwareController');

class ApplicationController {
    constructor() {
        this._events = events;
        this._RPi = new RPi(this._events);
        this._RPi.init();
    }

    start() {
        console.log(`\nApplicationController online and running.`);
    }
    
    terminate() {
        this._RPi.shutdown();
    }
}

module.exports = ApplicationController;