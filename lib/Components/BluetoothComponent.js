/**
 * BluetoothComponent.js
 *
 * Provide I/O between all RPi push buttons and HardwareController
 *
 * @class BluetoothComponent
 *
 */

const HardwareComponent = require('./HardwareComponent');
const Bluetooth = require('node-bluetooth');

class BluetoothComponent extends HardwareComponent {
    constructor (ident, mediator) {
        super(ident, mediator);
        
        this._io = new Bluetooth.DeviceINQ();
        
        this.activate();
    }
    
    activate() {
        this._io
            .on('finished',  console.log.bind(console, 'finished'))
            .on('found', function found(address, name){
                console.log('Found: ' + address + ' with name ' + name);
                this._io.address = address;
                this._io.name = name;
            }).inquire();
        
        const conn = this._io.findSerialPortChannel(this._io.address, (name, channel) => {
            console.log('Found RFCOMM channel for serial port on %s: ', name, channel);
        
            // make bluetooth connect to remote device
            const conn = this._io.connect(address, channel, (err, connection) => {
                if(err) return console.error(err);
                return connection;
            });
        
        });
    
        console.log(conn);
    }
    
}

module.exports = BluetoothComponent;