/**
 * ButtonComponent.js
 *
 * Provide I/O between all RPi push buttons and HardwareController
 *
 * @class Button
 *
 */


const HardwareComponent = require('./HardwareComponent');
const GPIO = require('onoff').Gpio;

class ButtonComponent extends HardwareComponent {
    constructor(ident, pin, mediator) {
        super(ident, mediator);
        
        // Instantiate new GPIO object for this Button object ('in', 'both' common to all buttons)
        this._io = new GPIO(pin, 'in', 'both');
        
        // 3 button states possible
        this.addState('pressed');
        this.addState('released');
        this.addState('held');
        
        // Bind this to callback, then add callback to physical button event (stateCHANGEDhandler,
        // vs handleStateChange from Component class when it receives a command to change state)
        ButtonComponent.stateChangedHandler = ButtonComponent.stateChangedHandler.bind(this);
        this._io.watch(ButtonComponent.stateChangedHandler);
    }
    
    static stateChangedHandler(error, value) {
        if (error) {
            //For now, throw - but ass it up to the component. Eventually, we can't do this
            this.fatality(error);
        }
        
        let newState;
        
        if (value === 0) {
            this._lastPressedTime = Date.now();
            newState = 'pressed';
        } else if (value === 1) {
            if (Date.now() - this._lastPressedTime > 1000) {
                newState = 'held';
            } else {
                newState = 'released';
            }
        }
        
        this.setState(newState);
    }
    
    shutdown() {
        // Detach observer and reset GPIO pin
        this._io.unwatch(ButtonComponent.stateChangedHandler);
        this._io.unexport()
    }
    
}

module.exports = ButtonComponent;

