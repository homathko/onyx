/**
 * EventController.js
 *
 * Init event-pubsub and ...
 *
 * @class EventController
 *
 */

const Events = require('event-pubsub');
const events = new Events();

events.on('hi', (data) => {
    console.log(`'hi' event received with data ${JSON.stringify(data)}`);
});

events.on('button1', (data) => {
    console.log(`'button1' event received with data ${JSON.stringify(data)}`);
});

module.exports.events = events;