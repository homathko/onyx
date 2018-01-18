const App = require('./lib/ApplicationController');

const app = new App;

app.start();

// process.on('SIGINT', function() {
//     app.terminate();
//     console.log('All GPIOs unexported');
//     process.exit(0);
// });