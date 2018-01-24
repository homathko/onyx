const Component = require('./Component');

class HardwareComponent extends Component {
    constructor(ident, mediator) {
        super(ident, mediator);
    }
    
    shutdown() {
    
    }
}

module.exports = HardwareComponent;