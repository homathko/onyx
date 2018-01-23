/**
 * AppEvents.js
 *
 * Init event-pubsub and ...
 *
 * @class AppEvents
 *
 */
const chalk = require('chalk');

const Events = require('event-pubsub');

class AppEvents extends Events {
    constructor() {
        super();
        
    }
    
    registerDevicesAsSubjects(devices) {
        devices.forEach((device) => {
            device.observers['AppEvents'].forEach((systemMessage) => {
                this.on(systemMessage, (data) => AppEvents.subjectHandler(device, data));
            });
            device.observers['HardwareEvents'].forEach((systemMessage) => {
                this.on(systemMessage, (data) => AppEvents.subjectHandler(device, data));
            })
        });
    }
    
    static subjectHandler (subject, data) {
        console.log(chalk.black.bgRed(`AppEvent`) + ':: ' + `${subject.className()} '${subject.ident}' observed an event with data ${JSON.stringify(data)}`);
    }
}

module.exports = AppEvents;