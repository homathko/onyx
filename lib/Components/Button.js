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
    constructor(hardwareEvents, ident, data) {
        this._ident = ident;
        this._name = data.name;
        // this._pud = data.PUD_type;
        
        this._hardwareEvents = hardwareEvents;
        this._observers = data.observers;
        this._subjects = data.subjects;
        
        // Instantiate new GPIO object for this Button object ('in', 'both' common to all buttons)
        this._io = new GPIO(data.assignedPin, 'in', 'both');
        
        Button.stateChangedHandler = Button.stateChangedHandler.bind(this);
        
        // Attach observer passed down from Hardware controller to this buttons state change callback
        this._io.watch(Button.stateChangedHandler);
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
    
    static stateChangedHandler(error, value) {
        console.log(chalk.grey(`${this._ident} state changed to ${value}`));
        this._hardwareEvents.emit(this.className(), {sigIdent: this._ident, value: value});
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = Button;

