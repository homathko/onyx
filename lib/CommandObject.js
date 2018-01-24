/**
 * CommandObject.js
 *
 * @class CommandObject
 *
 */

const EventDataObject = require('./EventDataObject');

class CommandObject extends EventDataObject {
    constructor(invoker, receiver, forInvokerState, newReceiverState) {
        super();
        
        this._invoker = invoker;
        this._receiver = receiver;
        this._forInvokerState = forInvokerState;
        this._newReceiverState = newReceiverState;
    }
    
    get invoker () {
        return this._invoker;
    }
    
    get receiver () {
        return this._receiver;
    }
    
    get forInvokerState () {
        return this._forInvokerState;
    }
    
    get newReceiverState () {
        return this._newReceiverState;
    }
    
}

module.exports = CommandObject;