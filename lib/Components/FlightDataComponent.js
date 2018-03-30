const Component = require('./Component');
const FlightDataAggregate = require('../FlightDataAggregate');
const Events = require('event-pubsub');

class FlightDataComponent extends Component {
    constructor(ident, mediator) {
        super(ident, mediator);
        
        this.addState('initiated');
        this.addState('waiting');
        this.addState('ready');
    
        this._flightDataEvents = new Events();
        this._flightData = new FlightDataAggregate(this._flightDataEvents);
    
        // Monitor completeness of data
        this.watch();
        
        // Set initial state
        this.setState('initiated');
    }
    
    watch () {
        this._flightDataEvents.on('flight-data:updated', (data) => {
            if (this._flightData.gps) {
                if (this._flightData.gps.loc && this._flightData.gps.speed) {
                    if (this.currentState !== 'ready') this.setState('ready');
                }
            }
        });
    }
    
    gpsData (data) {
        this._flightData.update('gps', data)
    }
    
    logLatLon () {
        console.log(this._flightData.gps);
    }
}

module.exports = FlightDataComponent;