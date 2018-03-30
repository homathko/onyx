/**
 *
 * @type {HardwareComponent}
 */

const HardwareComponent = require('./HardwareComponent');
const NMEA = require('node-nmea');
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

class GPSComponent extends HardwareComponent {
    constructor (ident, port, mediator) {
        super(ident, mediator);
        
        this.addState('no fix');
        this.addState('fix');
        
        // Set initial state
        this.setState('no fix');
        
        this.activate(port);
    }
    
    activate (port) {
        this._port = new SerialPort(port, { baudRate: 9600 });
        this._parser = this._port.pipe(new ReadLine({ delimiter: '\r\n' }));
        this.watchFixState();
    
        this.open({
            logging: true
        });
    }
    
    open (opts) {
        this._parser.on('data', (data) => {
            const sentence = NMEA.parse(data);
            
            if (this.currentState === 'fix') {
                if (sentence.type === 'GGA') {
                    this.update({
                        loc: {
                            lattitude: sentence.loc.geojson.coordinates[1],
                            longitude: sentence.loc.geojson.coordinates[0]
                        }
                    });
                } else if (sentence.type === 'RMC') {
                    this.update({
                        speed: {
                            knots: sentence.speed.knots,
                            kmh: sentence.speed.kmh
                        }
                    });
                }
            }
        });
    }
    
    watchFixState () {
        this._parser.on('data', (data) => {
            const sentence = NMEA.parse(data);
            
            if (sentence.valid) {
                if (sentence.gpsQuality !== 'invalid') {
                    if (this.currentState !== 'fix') this.setState('fix');
                } else {
                    if (this.currentState !== 'no fix') this.setState('no fix');
                }
            }
        })
    }
    
    update (data) {
        this.sendActionNotification('update', data);
    }
    
    deactivate () {
        this._port.close((cb, err) => {
        
        })
    }
}

module.exports = GPSComponent;