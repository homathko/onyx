/**
 * EventDirector.js
 *
 * Init event-pubsub and ...
 *
 * @class AppEvents
 *
 */

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
        this._commandMap.push(
            // new CommandObject(devices['testButton'], [ devices['testLED'] ], {forInvokerState: 'pressed', forReceiverState: 'off'}, devices['testLED'].turnOn),
            // new CommandObject(devices['testButton'], [ devices['testLED'] ], {forInvokerState: 'pressed', forReceiverState: 'on'}, devices['testLED'].turnOff),
            // new CommandObject(devices['cron'], [ devices['testLED2'] ], {forInvokerState: 'edge-on'}, devices['testLED2'].momentaryOnThenOff)
            new CommandObject(devices['gps'], [ devices['console'] ], {forInvokerState: 'fix'}, devices['console'].log)
        );
        
        this._commandMap.forEach((command) => {
            this.events.on(command.invoker.ident, (data) => {
                // If forInvokerState is present, dig deeper
                if (command.data.forInvokerState) {
                    if (command.data.forInvokerState === command.invoker.currentState) {
                        // If forReceiverState is present, dig deeper still
                        if (command.data.forReceiverState) {
                            command.receivers.forEach((receiver) => {
                                if (command.data.forReceiverState === receiver.currentState) {
                                    command.execute(data);
                                }
                            });
                        } else {
                            // else, execute only if forInvokerState is present
                            command.execute(data);
                        }
                    }
                } else {
                    // else, execute always
                    command.execute(data);
                }
            })
        });
        
        return this;
    }
}

module.exports = EventDirector;