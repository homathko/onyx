/**
 * Button.js
 *
 * Provide I/O between all RPi push buttons and HardwareController
 *
 * @class Button
 *
 */

const chalk = require('chalk');

const GPIO = require('onoff').Gpio;

class Button {
    constructor(observer, ident, data) {
        this._ident = ident;
        this._name = data.name;
        this._pud = data.PUD_type;
        
        // Instantiate new GPIO object for this Button object ('in', 'both' common to all buttons)
        this._io = new GPIO(data.assignedPin, 'in', 'both');
        
        // A subject to have reference to its observers
        this._observer = observer;
        
        Button.stateChangedHandler = Button.stateChangedHandler.bind(this);
        
        // Attach observer passed down from Hardware controller to this buttons state change callback
        this._io.watch(Button.stateChangedHandler);
    }
    
    get ident () {
        return this._ident;
    }
    
    static stateChangedHandler(error, value) {
        console.log(chalk.grey(`${this._ident} state changed to ${value}`));
        this._observer.emit(this._ident, {value: value});
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = Button;

