/**
 * Button.js
 *
 * Provide I/O between all RPi push buttons and HardwareController
 *
 * @class Button
 *
 */

const GPIO = require('onoff').Gpio;

class Button {
    constructor(buttonName, assignedPin, events) {
        this._name = buttonName;
        
        // Instantiate new GPIO object for this Button object ('in', 'both' common to all buttons)
        this._io = new GPIO(assignedPin, 'in', 'both');
        
        // A subject to have reference to its observers
        this._events = events;
        
        this.stateChangedHandler = this.stateChangedHandler.bind(this);
        
        // Attach observer passed down from Hardware controller to this buttons state change callback
        this._io.watch(this.stateChangedHandler);
    }
    
    stateChangedHandler(error, value) {
        console.log(`${this._name} state changed to ${value}`);
        this._events.emit(this._name, {value: value});
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = Button;

