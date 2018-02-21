/**
 * LAFiltered
 *
 * Module to employ KalmanJS on raw LA data from BNO055 and return kalmanized results
 *
 */

const KalmanFilter = require('kalmanjs').default;
const config = require('../../config');

class LAFiltered {
    constructor() {
        // this._x = this._y = this._z = 0;
        
        this._kalman_x = new KalmanFilter({R: config.kalman_values.R.x, Q: config.kalman_values.Q.x});
        this._kalman_y = new KalmanFilter({R: config.kalman_values.R.y, Q: config.kalman_values.Q.y});
        this._kalman_z = new KalmanFilter({R: config.kalman_values.R.z, Q: config.kalman_values.Q.z});
    }
    
    filteredSetFrom(x, y, z) {
        return {
            x: this._kalman_x.filter(x),
            y: this._kalman_y.filter(y),
            z: this._kalman_z.filter(z)
        }
    }
}

class LAFilteredY {
    constructor() {
        this._kalman_y = new KalmanFilter({
            R: config.kalman_values.R.y,
            Q: config.kalman_values.Q.y
        });
    }
    
    filteredY(y) {
        return this._kalman_y.filter(y, 1);
    }
}

module.exports.LAFiltered = LAFiltered;
module.exports.LAFilteredY = LAFilteredY;