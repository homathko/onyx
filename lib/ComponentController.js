/**
 * ComponentController.js
 *
 * Controller responsible for hardware component wrangling,
 * memory status, logging activities, and cron
 *
 * @class ComponentController
 *
 */

const ButtonComponent = require('./Components/ButtonComponent');
const LEDComponent = require('./Components/LEDComponent');
const CronComponent = require('./Components/CronComponent');
const BluetoothComponent = require('./Components/BluetoothComponent');
const IMUComponent = require('./Components/IMUComponent');

class ComponentController {
    constructor(eventDirector) {
        this._eventDirector = eventDirector;
        this._devices = this.initDevicesWithComponents(); // Add device tree later
        this._eventDirector.buildCommandTable(this._devices);
    }
    
    initDevicesWithComponents() {
        return {
            // 'testButton': new ButtonComponent('testButton', 2, this._eventDirector),
            // 'testLED': new LEDComponent('testLED', 17, this._eventDirector),
            // 'testLED2': new LEDComponent('testLED2', 22, this._eventDirector),
            'cron': new CronComponent('cron', this._eventDirector),
            'imu': new IMUComponent('imu', this._eventDirector)
            // 'bt': new BluetoothComponent('bt', this._eventDirector)
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