/**
 * LED.js
 *
 * Provide I/O between all RPi LEDs and HardwareController
 *
 * @class LED
 *
 */

const HardwareComponent = require('./HardwareComponent');
const GPIO = require('onoff').Gpio;

class LEDComponent extends HardwareComponent {
    constructor(ident, pin, mediator) {
        super(ident, mediator);
        
        // Instantiate new GPIO object for this LED object ('out' common to all LEDs)
        this._io = new GPIO(pin, 'out');
        
        // 2 LED states
        this.addState('on');
        this.addState('off');
    }
    
    // Override from Component class
    handleStateChange() {
        const bit = this.currentState === 'on' ? 1 : 0;
        this._io.write(bit, (error, value) => {
            if (error) this.fatality(error);
        });
        
        this.transmitState();
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatchAll();
        this._io.unexport()
    }
    
}

module.exports = LEDComponent;