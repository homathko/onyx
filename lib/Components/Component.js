class Component {
    constructor(mediator) {
        this._states = [];
        this._mediator = mediator;
    }
    
    set addState (state) {
        this._states.push(state);
    }
    
    set setState (newState) {
        const index = this._states.indexOf(newState);
        if (index !== -1) {
            this._currentState = index;
            this.handleStateChange();
        } else {
            throw new Error(`Component ${this._id} doesn't have state ${newState}`);
        }
    }
    
    get currentState () {
        return this._states[this._currentState];
    }
    
    handleStateChange () {
    
    }
}

module.exports = Component;