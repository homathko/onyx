/**
 * App.js
 *
 * Application controller responsible for system startup and
 * shutdown (i.e. hardware modules individual status, memory status,
 * logging activities, and cron) and initiating the event system
 *
 * @class ApplicationController
 *
 */


import config from './config';

class ApplicationController {
    constructor() {
        /**
         * Bluetooth
         * GPIO Pins
         *  -   LEDs
         *  -   Push buttons
         *  -   Power supply
         *      -   AC line
         *      -   Battery
         *  -   Control pots
         * BerryIMU
         */
        
        this._stuff = config;
    }
    
    get systemEvents() {
    
    }
    
    start() {
    
    }
}