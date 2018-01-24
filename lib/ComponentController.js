/**
 * ComponentController.js
 *
 * Controller responsible for hardware component wrangling,
 * memory status, logging activities, and cron
 *
 * @class HardwareController
 *
 */

const ButtonComponent = require('./Components/ButtonComponent');
const LEDComponent = require('./Components/LEDComponent');
const CommandObject = require('./CommandObject');

class ComponentController {
    constructor(eventDirector) {
        this._eventDirector = eventDirector;
        this._devices = this.initDevicesWithComponents(); // Add device tree later
        this._eventDirector.buildCommandTable(this._devices);
    }
    
    initDevicesWithComponents() {
        
        // TODO Sloppy but okay for now - rebuild device tree and maybe add it in here
        return {
            'testButton': new ButtonComponent('testButton', 2, this._eventDirector),
            'testLED': new LEDComponent('testLED', 17, this._eventDirector)
        };
    }
    
    get devices () {
        return this._devices;
    }
    
    enterLowPowerMode() {
    
    }
    
    shutdown() {
        // TODO Deactivate all hardware
        // this._devices.forEach(shutdown());
    }
}

module.exports = ComponentController;