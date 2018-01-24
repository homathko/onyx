/**
 * AppController.js
 *
 * Application controller responsible for hardware system startup and
 * shutdown and initiating the event system
 *
 * @class ApplicationController
 *
 */


const EventDirector = require('./EventDirector');
const ComponentController = require('./ComponentController');

class ApplicationController {
    constructor() {
        this._eventDirector = new EventDirector;
        this._componentController = new ComponentController(this._eventDirector);
    }

    start() {
        console.log(`\nApplicationController online and running.`);
        //
    }
    
    terminate() {
        // this.shutdown();
    }
}

module.exports = ApplicationController;