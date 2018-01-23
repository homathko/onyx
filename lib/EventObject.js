/**
 * EventObject.js
 *
 * Basic object that will be inherited by TxObject, RxObject, etc
 * Any eventObject descendants must conform to *something* so AppEvents always
 * delivers the right information in the right format
 *
 * @class EventObject
 *
 */

const EventPubSub = require('event-pubsub');

class EventObject extends EventPubSub {
    constructor(mediator) {
        super();
        
        this._mediator = mediator;
    }
    
    sendEventNotification () {
    
    }
}