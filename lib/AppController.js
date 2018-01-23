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
        
        // Instantiate HardwareEvents giving AppEvents as observer
        this._RPi = new RPi(this._events);
        
        // Set HardwareEvents as an observer of AppEvents
        this._hardwareEvents = this._RPi.ioEvents;
        this._events.registerDevicesAsSubjects(this._RPi.devices);
    }

    start() {
        console.log(`\nApplicationController online and running.`);
        // this._hardwareEvents.emit('turn light on', 'turn light on');
        // this._hardwareEvents.emit('time interval fired', 'time interval fired');
    }
    
    terminate() {
        this._RPi.shutdown();
    }
}

module.exports = ApplicationController;