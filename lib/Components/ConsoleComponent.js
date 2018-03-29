/**
 *
 * @type {Component}
 */

const Component = require('./Component');

class ConsoleComponent extends Component {
    constructor (ident, mediator) {
        super(ident, mediator);
        
        this.addState('running');
    }
    
    log (data) {
        console.log(data);
    }
}

module.exports = ConsoleComponent;