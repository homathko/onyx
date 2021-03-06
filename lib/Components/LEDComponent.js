/**
 * LED.js
 *
 * Provide I/O between all RPi LEDs and HardwareController
 *
 * @class LEDComponent
 *
 */

const HardwareComponent = require('./HardwareComponent');
const GPIO = require('onoff').Gpio;

class LEDComponent extends HardwareComponent {
    constructor(ident, pin, mediator) {
        super(ident, mediator);
        
        // 2 LED states
        this.addState('on');
        this.addState('off');
        
        // Enable I/O
        this.activate(pin);
    }
    
    activate(pin) {
        // Instantiate new GPIO object for this LED object ('out' common to all LEDs)
        this._io = new GPIO(pin, 'out');
        
        // Activate with 'off' state
        this._currentState = 0;
    }
    
    turnOn() {
        this._io.write(1, (error, value) => {
            if (error) this.fatality(error);
            this.setState('on');
        });
    }
    
    turnOff() {
        this._io.write(0, (error, value) => {
            if (error) this.fatality(error);
            this.setState('off');
        });
    }

    swapOnForOff() {
        if (this.currentState === 'off')
            this.turnOn();
        else
            this.turnOff();
    }
    
    momentaryOnThenOff() {
        this.turnOn();
        this._interval = setTimeout(() => {
            this.turnOff();
        }, 500);
    }
    
    deactivate() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = LEDComponent;