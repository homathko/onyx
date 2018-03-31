const config = require('../config');

class FlightDataAggregate {
    constructor (observer) {
        this.gps = {};
        this.speedRangeAboveThreshold = false;
        
        this._flightDataEvents = observer;
    }
    
    update (ident, data) {
        Object.keys(data).forEach((key) => {
            this[ident][key] = data[key];
        });
    
        if (this.gps.speed && this.gps.loc) {
            if (this.gps['speed']['kmh'] >= config.thresholds.speed) {
                if (!this.speedRangeAboveThreshold) {
                    this.speedRangeAboveThreshold = true;
                    this._flightDataEvents.emit('flight-data:speed-up');
                }
            } else {
                if (this.speedRangeAboveThreshold) {
                    this.speedRangeAboveThreshold = false;
                    this._flightDataEvents.emit('flight-data:speed-down');
                }
            }
        }
        this._flightDataEvents.emit('flight-data:updated');
    }
    
    
    generatePosRep(mode) {
        return {
            latitude: this.gps.loc.latitude,
            longitude: this.gps.loc.longitude,
            altInMeters: this.gps.loc.altitude,
            speedInMps: this.gps.speed.kmh*(1000/60/60),
            mode: mode
        }
    }
}

module.exports = FlightDataAggregate;