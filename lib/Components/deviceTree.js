const Button = require('./ButtonComponent');
const LED = require('./LEDComponent');

const deviceTree = [
    {
        // hardware category
        pushButtons: {
            instance: Button,
            
            // list of devices of type
            list: [
                {
                    // Key (i.e. 'testButton') is event signal ident
                    testButton: {
                        
                        //Keys below get accessed directly by the specific instance type constructor
                        // (i.e. 'Button.prototype.constructor') in the .js module (i.e. ButtonComponent.js)
                        name       : 'test button',
                        assignedPin: 2,
                        flow       : ['in', 'both'],
                        observers  : {
                            'AppEvents': ['button press'],
                            'HardwareEvents': [] // Power supply
                        },
                        subjects  : {
                            'AppEvents': [],
                            'HardwareEvents': []
                        },
                    }
                }
            ]
        }
    },
    {
        lights: {
            instance: LED,
            list    : [
                {
                    testLED: {
                        name       : 'test LED',
                        assignedPin: 17,
                        flow       : ['out'],
                        observers  : {
                            'AppEvents': [],
                            'HardwareEvents': []
                        },
                        subjects  : {
                            'AppEvents': ['turn light on', 'time interval fired'],
                            'HardwareEvents': ['power on']
                        }
                    }
                }
            ]
        }
    }
];

module.exports = deviceTree;