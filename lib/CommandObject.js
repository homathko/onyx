/**
 * CommandObject.js
 *
 * @class CommandObject
 *
 */

const EventDataObject = require('./EventDataObject');

class CommandObject extends EventDataObject {
    constructor(invoker, receivers, data, action) {
        super(invoker, receivers, data);
        
        this._action = action;
        
    }
    
    execute(data) {
        this.receivers.forEach((receiver) => {
            console.log(`CommandObject invoked by ${this.invoker.ident} calling ${this._action.name}`);
            receiver[this._action.name](data);
        });
    }
    
}

module.exports = CommandObject;