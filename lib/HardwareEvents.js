/**
 * HardwareEvents.js
 *
 * Inherits from event-pubsub and builds out event publishing and
 * subscriptions using deviceTree.js
 *
 * @class HardwareEvents
 *
 */

const Events = require('event-pubsub');
const chalk = require('chalk');

require('./utils/classHelpers');

// Require all hardware types for comparison with className
const Button = require('./Components/Button');

class HardwareEvents extends Events {
    constructor(observer) {
        super();
        
        // Set AppEvents as an observer of HardwareEvents
        this._appEvents = observer;
        
        HardwareEvents.subjectHandler = HardwareEvents.subjectHandler.bind(this);
        return this;
    }
    
    registerDevicesAsObservers(devices) {
        devices.forEach((device) => {
            device.subjects['AppEvents'].forEach((systemMessage) => {
                this.on(systemMessage, (data) => HardwareEvents.subjectHandler(device, data));
            });
            device.subjects['HardwareEvents'].forEach((systemMessage) => {
                this.on(systemMessage, (data) => HardwareEvents.subjectHandler(device, data));
            });
            
        });
    }
    
    static subjectHandler (subject, data) {
        console.log(chalk.black.bgBlue(`HardwareEvent`) + ':: ' + `${subject.className()} '${subject.ident}' observed an event with data ${JSON.stringify(data)}`);
        
        const appEventObject = HardwareEvents.mapHardwareEventToApplicationEventObject(subject, data);
        // const appEventObject = data;
        this._appEvents.emit(subject.ident, appEventObject);
    }
    
    static mapHardwareEventToApplicationEventObject (subject, hardwareDataIn) {
        let dataOut = {};
        const category = subject.className();
        
        switch(category) {
            case 'Button':
                return 'testButton';
                
            default:
                break;
        }
        
    }
    
    sendToFlightAggregator (newData) {
        // this._flightDataAggregatorRef.update(newData);
    }
}

module.exports = HardwareEvents;