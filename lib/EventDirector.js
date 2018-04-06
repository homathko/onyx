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
    
    buildCommandTable (nodes) {
        this._commandMap.push(
            
            // Define state change-dependant commands
            
            // new CommandObject(nodes['testButton'], [ nodes['cron'] ], {forInvokerState: 'pressed' }, nodes['cron'].reset),
            // new CommandObject(nodes['cron'], [ nodes['console'] ], {forInvokerAction: 'timer-fire' }, nodes['console'].log),
            // new CommandObject(nodes['testButton'], [ nodes['testLED'] ], {forInvokerState: 'pressed', forReceiverState: 'on'}, nodes['testLED'].turnOff),
            // new CommandObject(nodes['testButton'], [ nodes['console'] ], { forInvokerState: 'pressed' }, nodes['console'].log),
            
            // Console event logging (sbd --> 'ready', gps--> 'fix')
            new CommandObject(nodes['gps'], [ nodes['console'] ], { forInvokerState: 'fix' }, nodes['console'].log),
            new CommandObject(nodes['sbd'], [ nodes['console'] ], { forInvokerState: 'ready' }, nodes['console'].log),
    
            new CommandObject(nodes['sbd'], [ nodes['console'] ], { forInvokerAction: 'ping-sent' }, nodes['console'].log),
            
            // Activate timer once SBD is ready (ready state is issued after successful transmission)
            new CommandObject(nodes['sbd'], [ nodes['cron'] ], { forInvokerState: 'ready' }, nodes['cron'].activate),
            new CommandObject(nodes['sbd'], [ nodes['cron'] ], { forInvokerState: 'no signal' }, nodes['cron'].reset),
            
            // Define action commands
            new CommandObject(nodes['cron'], [ nodes['flight-data'] ], { forInvokerAction: 'timer-fire', forReceiverState: 'ready' }, nodes['flight-data'].ping),
            new CommandObject(nodes['gps'], [ nodes['flight-data'] ], { forInvokerAction: 'update' }, nodes['flight-data'].gpsData),
            new CommandObject(nodes['flight-data'], [ nodes['sbd'] ], { forInvokerAction: 'ping' }, nodes['sbd'].sendPing),
            new CommandObject(nodes['flight-data'], [ nodes['sbd'] ], { forInvokerAction: 'speed-up' }, nodes['sbd'].sendPing),
            new CommandObject(nodes['flight-data'], [ nodes['sbd'] ], { forInvokerAction: 'speed-down' }, nodes['sbd'].sendPing),
            new CommandObject(nodes['sbd'], [ nodes['cron'] ], { forInvokerAction: 'ping-sent' }, nodes['cron'].reset),
        );
        
        this._commandMap.forEach((command) => {
            // If forInvokerState is present, we have a state-dependant command execution
            if (command.data.forInvokerState) {
                this.events.on(command.invoker.ident, (data) => {
                    // Invoker state specified
                    this.executeCommandForInvokerState(command, data);
                });
            } else if (command.data.forInvokerAction) {
                // Action specified means event signature is different
                this.events.on(`${command.invoker.ident}:${command.data.forInvokerAction}`, (data) => {
                    this.executeCommandForAction(command, data);
                });
            } else {
                // else, execute always
                this.events.on(command.invoker.ident, (data) => {
                    command.execute(data);
                });
            }
        });
        
        return this;
    }
    
    executeCommandForInvokerState (command, data) {
        if (command.data.forInvokerState === command.invoker.currentState) {
            command.execute(data);
        }
    }
    
    executeCommandForAction (command, data) {
        command.execute(data);
    }
}

module.exports = EventDirector;