/**
 * Component.js
 *
 * Base component class for HardwareComponent, and Button, LED, etc
 *
 * @class Component
 *
 */

const chalk = require('chalk');

class Component {
    constructor(ident, mediator) {
        this._ident = ident;
        this._states = [];
        this._mediator = mediator;
    }
    
    addState (state) {
        this._states.push(state);
    }
    
    setState (newState) {
        const index = this._states.indexOf(newState);
        if (index !== -1) {
            this._currentState = index;
            this.handleStateChange();
        } else {
            this.fatality(`Component ${this.ident} doesn't have state ${newState}`);
        }
    }
    
    activate() {
    
    }
    
    get ident () {
        return this._ident;
    }
    
    get mediator () {
        return this._mediator;
    }
    
    get currentState () {
        return this._states[this._currentState];
    }
    
    // For overriding (i.e. LEDComponent)
    handleStateChange () {
        this.transmitState();
    }

    // Default Component behaviour for state change event
    transmitState () {
        this.mediator.events.emit(this.ident, {state: this.currentState});
    }
    
    sendActionNotification (actionIdent, data) {
        this.mediator.events.emit(`${this.ident}:${actionIdent}`, data);
    }
    
    fatality (errorDescription) {
        throw new Error(chalk.redBright(`Component ${this.ident} sufferred a major defeat: ` + errorDescription));
    }
    
    deactivate() {
    
    }
}

module.exports = Component;