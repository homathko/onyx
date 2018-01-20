/**
 * HardwareController.js
 *
 * Controller responsible for RPi hardware module individual status,
 * memory status, logging activities, and cron
 *
 * @class HardwareController
 *
 */

const chalk = require('chalk');

const HardwareEvents = require('./HardwareEvents');

// The following line is not needed since the require statement happens in deviceTree.js
//// const Button = require('./RPiIO/Button');

class HardwareController {
    constructor(observer_AppCtrl) {
        // Load deviceTree to guide assembly of the interface objects
        const deviceTree = require('./RPiIO/deviceTree');
        this._ioEvents = new HardwareEvents(observer_AppCtrl);
        this._devices = this.initDevices(deviceTree);
        
        // Set up internal event manager using device tree and link to App-level event controller
        this._ioEvents.registerSubjects(this._devices);
    }
    
    get ioEvents () {
        return this._ioEvents;
    }
    
    initDevices(deviceTree) {
        let instantiatedObjects = [];
        
        // Build device instances using deviceTree
        deviceTree.forEach((hardwareTypes) => {
            const type = Object.keys(hardwareTypes)[0];
            const objectInstance = hardwareTypes[type].instance;
            
            hardwareTypes[type].list.forEach((hardwareItem) => {
                const ident = Object.keys(hardwareItem)[0];
                console.log(chalk.blue(`Category ${type} hardware item '${hardwareItem[ident].name}' being instantiated as ${ident} with type ${objectInstance.name}`));
                
                //Add instantiated object to hardware controller's array of objects
                instantiatedObjects.push(
                    new objectInstance(this._ioEvents, ident, hardwareItem[ident])
                );
            });
        });
        
        return instantiatedObjects;
    }
    
    shutdown() {
        this._ioEvents.off('*', '*');
        this.aButton.shutdown();
    }
}

module.exports = HardwareController;