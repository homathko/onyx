/**
 * EventDataObject.js
 *
 * Basic object that will be inherited by TxObject, RxObject, etc
 * Any eventObject descendants must conform to *something* so AppEvents always
 * delivers the right information in the right format
 *
 * @class EventDataObject
 *
 */

class EventDataObject {
    constructor(invoker, receivers, data) {
        // Object that instantiates this EventDataObject
        this._invoker = invoker;
        
        // Array of receivers who will receive this
        this._receivers = receivers;
        
        // Data payload to transmit
        this._data = data;
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
}

module.exports = EventDataObject;