/**
 * AppController.js
 *
 * Application controller responsible for hardware system startup and
 * shutdown and initiating the event system
 *
 * @class ApplicationController
 *
 */


const AppEvents = require('./AppEvents');
const RPi = require('./HardwareController');

class ApplicationController {
    constructor() {
        this._events = new AppEvents;
        this._RPi = new RPi(this._events);
    }

    start() {
        console.log(`\nApplicationController online and running.`);
    }
    
    terminate() {
        this._RPi.shutdown();
    }
}

module.exports = ApplicationController;