/**
 * CommandObject.js
 *
 * @class CommandObject
 *
 */

class CommandObject {
    constructor(invoker, receivers, data, action) {
        // Object that instantiates this EventDataObject
        this._invoker = invoker;
    
        // Array of receivers who will receive this
        this._receivers = receivers;
    
        // Data payload to transmit
        this._data = data;
        
        // Action to call with .execute()
        this._action = action;
    }
    
    get invoker() {
        return this._invoker;
    }
    
    get receivers() {
        return this._receivers;
    }
    
    get data() {
        return this._data;
    }
    
    execute(data) {
        this.receivers.forEach((receiver) => {
            console.log(`CommandObject invoked by ${this.invoker.ident} calling ${this._action.name}`);
            receiver[this._action.name](data);
        });
    }
    
}

module.exports = CommandObject;