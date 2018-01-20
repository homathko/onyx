const config = require('../../config');
const Button = require('./Button');

const deviceTree = [
    {
        // hardware category
        pushButtons: {
            instance: Button,
            
            // list of devices of type
            list    : [
                {
                    // Key (i.e. 'testButton') is event ident
                    testButton: {
                        
                        //Keys below get accessed directly by the specific instance type constructor
                        // (i.e. 'Button.prototype.constructor') in the .js module (i.e. Button.js)
                        name       : 'test button',
                        assignedPin: 2,
                        PUD_type   : config._DEF_.ONE_OFF
                    }
                }
            ]
        }
    }
];

module.exports = deviceTree;