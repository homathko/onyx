const HardwareComponent = require('./HardwareComponent');
const NMEA = require('node-nmea');
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

class GPSComponent extends HardwareComponent {
    constructor (ident, port, mediator) {
        super(ident, mediator);
        
        this.addState('no fix');
        this.addState('fix');
        
        this.activate(port);
    }
    
    activate (port) {
        this._port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
        this._parser = this._port.pipe(new ReadLine({ delimiter: '\r\n' }));
    
        this.open({
            logging: true
        });
    }
    
    open (opts) {
        this._parser.on('data', (nmeaSentence) => {
            const data = NMEA.parse(nmeaSentence);
            
            if (data.valid) {
                if (data.type === 'GGA') {
                    if (data.gpsQuality !== 'invalid') {
                        if (this.currentState !== 'fix')
                            this.setState('fix');
                        console.log(`Lat: ${data.loc.geojson.coordinates[1]}, Lon: ${data.loc.geojson.coordinates[0]}`);
                    } else {
                        if (this.currentState !== 'no fix')
                        this.setState('no fix');
                    }
                }
            } else if (data.type === 'RMC') {
                console.log('Minimum gps data received');
            }
        });
    }
    
    update () {
    
    }
}

module.exports = GPSComponent;