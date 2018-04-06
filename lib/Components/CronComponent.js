/**
 * CronComponent.js
 *
 * Onboard time interval trigger mechanism
 *
 * @class CronComponent
 *
 */

const Component = require('./Component');
const config = require('../../config');

class CronComponent extends Component {
    constructor (ident, mediator) {
        super(ident, mediator);
        
        this.timerCallback = this.timerCallback.bind(this);
    }
    
    activate () {
        this._cron = setTimeout(() => {
            this.timerCallback();
        }, config.cron.ping_interval_in_seconds*1000);
    }
    
    timerCallback () {
        this.sendActionNotification('timer-fire');
        this.activate();
    }
    
    reset () {
        clearTimeout(this._cron);
        this.activate();
    }
    
    deactivate () {
        this._cron.clearTimeout();
        delete this._cron;
    }
}

module.exports = CronComponent;