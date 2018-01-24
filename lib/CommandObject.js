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
            receiver[this._action.name](data);
        });
    }
    
}

module.exports = CommandObject;