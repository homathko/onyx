/**
 * AppEvents.js
 *
 * Init event-pubsub and ...
 *
 * @class AppEvents
 *
 */
const chalk = require('chalk');

const Events = require('event-pubsub');

class AppEvents extends Events {
    constructor() {
        super();
    
        this.on('*', (data) => {
            console.log(chalk.bgWhite(`AppEvent`) + ':: ' + `'${data}' event received by EventController with data ${JSON.stringify(data)}`);
        });
    }
}

module.exports = AppEvents;