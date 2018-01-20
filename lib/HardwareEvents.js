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
const Button = require('./RPiIO/Button');

class HardwareEvents extends Events {
    constructor(observer) {
        super();
        
        this._observer = observer;
        
        HardwareEvents.subjectHandler = HardwareEvents.subjectHandler.bind(this);
        return this;
    }
    
    registerSubjects(subjects) {
        subjects.forEach((subject) => {
            this.on(subject.ident, (data) => HardwareEvents.subjectHandler(subject, data));
        });
        
        return this;
    }
    
    static subjectHandler (subject, data) {
        console.log(chalk.black.bgBlue(`HardwareEvent`) + ':: ' + `${subject.className()} event received with data ${JSON.stringify(data)}`);
        const appEventObject = HardwareEvents.mapHardwareEventToApplicationEventObject(subject, data);
        this._observer.emit(subject.ident, appEventObject);
    }
    
    static mapHardwareEventToApplicationEventObject (subject, hardwareDataIn) {
        let dataOut = {};
        const category = subject.className();
        
        switch(category) {
            case 'Button':
                
                break;
        }
        
    }
}

module.exports = HardwareEvents;