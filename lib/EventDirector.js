/**
 * EventDirector.js
 *
 * Init event-pubsub and ...
 *
 * @class AppEvents
 *
 */
const chalk = require('chalk');

const Events = require('event-pubsub');
const CommandObject = require ('./CommandObject');

class EventDirector {
    constructor() {
        this._events = new Events();
        this._commandMap = [];
        
    }
    
    get events() {
        return this._events;
    }
    
    buildCommandTable (devices) {
        this._commandMap.push(new CommandObject(devices['testButton'], devices['testLED'], 'pressed', 'on'));
        this._commandMap.push(new CommandObject(devices['testButton'], devices['testLED'], 'held', 'off'));
        
        this._commandMap.forEach((command) => {
            this.events.on(command.invoker.ident, () => {
                if (command.invoker.currentState === command.forInvokerState) {
                    command.receiver.setState(command.newReceiverState);
                }
            });
        });
        
        return this;
    }
}

module.exports = EventDirector;