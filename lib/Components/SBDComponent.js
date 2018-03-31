const HardwareComponent = require('./HardwareComponent');
const SBDCoder = require('../SBDCoder');

class SBDComponent extends HardwareComponent {
    constructor (ident, port, mediator) {
        super(ident, mediator);
        
        this.addState('initializing');
        this.addState('ready');
        this.addState('sending');
        this.addState('no signal');
        
        // Set initial state
        this.setState('initializing');
        
        this._sbd = require('iridium-sbd');
        this._coder = new SBDCoder();
        
        this.activate(port);
    }
    
    activate (port) {
        this._sbd.open({
            debug: true,
            port: port,
            flowControl: false
        });
        
        this._sbd.on('initialized', () => {
            this.setState('ready');
        });
    }
    
    sendPing (message) {
        this._sbd.sendBinaryMessage(this._coder.encode(message, 'posRep'), (err, momsn) => {
            if (!err) {
                this.setState('ready');
            } else {
                this.setState('no signal');
            }
        })
    }
}

module.exports = SBDComponent;