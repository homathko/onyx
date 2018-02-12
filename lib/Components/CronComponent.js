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

class CronComponent extends Component {
    constructor(ident, mediator) {
        super(ident, mediator);
        
        this.addState('edge-on');
        this.addState('edge-off');
        
        this.timerCallback = this.timerCallback.bind(this);
    
        this._cron = Cron.schedule('* * * * * *', this.timerCallback, false);
        
        this.activate();
    }
    
    activate() {
        this._cron.start();
    }
    
    timerCallback() {
        this.setState('edge-on');
    }
    
    handleStateChange() {
        this.transmitState();
    }
    
    deactivate() {
        this._cron.stop();
        this._cron.destroy();
    }
}

module.exports = CronComponent;