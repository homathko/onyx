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
                } else {
                    if (this.currentState !== 'waiting') this.setState('waiting');
                }
            }
        });
        
        this._flightDataEvents.on('flight-data:speed-up', (data) => {
            this.speedUpEvent();
        });
    
        this._flightDataEvents.on('flight-data:speed-down', (data) => {
            this.slowDownEvent();
        });
    }
    
    gpsData (data) {
        this._flightData.update('gps', data)
    }
    
    logLatLon () {
        console.log(this._flightData.gps);
    }
    
    ping () {
        this.sendActionNotification('ping', this._flightData.generatePosRep(4)); // Protobuf enum PING === 4
    }
    
    speedUpEvent () {
        this.sendActionNotification('speed-up', this._flightData.generatePosRep(1)); // Protobuf enum SPEEDUP === 1
    }
    
    slowDownEvent () {
        this.sendActionNotification('speed-down', this._flightData.generatePosRep(2)); // Protobuf enum SPEEDDOWN === 2
    }
}

module.exports = FlightDataComponent;