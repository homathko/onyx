/**
 * LED.js
 *
 * Provide I/O between all RPi LEDs and HardwareController
 *
 * @class LED
 *
 */

const chalk = require('chalk');

const GPIO = require('onoff').Gpio;

class LED {
    constructor(observer, ident, data) {
        this._ident = ident;
        this._name = data.name;
        // this._pud = data.PUD_type;
        this._observers = data.observers;
        this._subjects = data.subjects;
        
        // Instantiate new GPIO object for this LED object ('out' common to all LEDs)
        this._io = new GPIO(data.assignedPin, 'out');
    }
    
    get ident () {
        return this._ident;
    }
    
    get subjects () {
        return this._subjects;
    }
    
    get observers () {
        return this._observers;
    }
    
    set lightOn (on) {
        this._io.writeSync(on);
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = LED;