class FlightDataAggregate {
    constructor (observer) {
        this.gps = {};
        
        this._flightDataEvents = observer;
    }
    
    update (ident, data) {
        Object.keys(data).forEach((key) => {
            this[ident][key] = data[key];
        });
    
        this._flightDataEvents.emit('flight-data:updated');
    }
}

module.exports = FlightDataAggregate;