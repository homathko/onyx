/**
 * CronComponent.js
 *
 * Onboard time interval trigger mechanism
 *
 * @class CronComponent
 *
 */

const Component = require('./Component');
const Cron = require('node-cron');
const config = require('../../config');

class CronComponent extends Component {
    constructor (ident, mediator) {
        super(ident, mediator);
        
        this.timerCallback = this.timerCallback.bind(this);
    
        this._cron = Cron.schedule(`*/${config.cron.ping_interval_in_seconds} * * * * *`, this.timerCallback, false);
        
        this.activate();
    }
    
    activate () {
        this._cron.start();
    }
    
    timerCallback () {
        this.sendActionNotification('timer-fire');
    }
    
    reset () {
        this._cron.stop();
        this._cron.start();
    }
    
    deactivate () {
        this._cron.stop();
        this._cron.destroy();
    }
}

module.exports = CronComponent;