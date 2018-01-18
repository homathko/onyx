/**
 * HardwareController.js
 *
 * Controller responsible for RPi hardware module individual status,
 * memory status, logging activities, and cron
 *
 * @class HardwareController
 *
 */

const Events = require('event-pubsub');
const Button = require('./RPiIO/Button');

class HardwareController {
    constructor(events) {
        // Load device list
        // this._devices = require('./RPiIO/deviceTree');
        
        // Publish and subscribe to AppController
        this._events = events;
        
        // Set up internal event manager using device tree
        this._ioEvents = new Events();
    }
    
    init() {
        this.aButton = new Button('button1', 2, this._ioEvents);
        
        this._ioEvents.on('button1', (data) => {
            this._events.emit('button1', data);
        });
    }
    
    shutdown() {
        this._ioEvents.off('*', '*');
        this.aButton.shutdown();
    }
}

module.exports = HardwareController;