/**
 * IMUComponent.js
 *
 *
 * Onyx-to-BNO055 I/O
 *
 * @class: IMUComponent
 *
 */

const HardwareComponent = require('./HardwareComponent');
const BNO055 = require('bno055');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const maths = require('../utils/maths');

class IMUComponent extends HardwareComponent {
    constructor(ident, mediator) {
        super(ident, mediator);
    
        const fpath = path.resolve(__dirname + config.filepaths.imu_calibration_data_file);
        fs.readFile(fpath, 'utf8', (err, data) => {
            if (err) {
                console.warn(err);
                this._imu = new BNO055();
                this.calibrate();
            } else if (!err && data) {
                const dataObj = JSON.parse(data);
                this._imu = new BNO055({
                    calibration: dataObj
                });
                setTimeout(() => {
                    this.run();
                }, 1000);
            }
        });
    }
    
    run() {
        this._imu.beginNDOF(() => {
            console.log("IMU running");
            
            this.runCycle = setInterval(() => {
                this._imu.getLinearAcceleration((err, res) => {
                    if (!err && res)
                        console.log(`Resultant: ${maths.resultant(res.x, res.y, res.z)}`);
                    else
                        console.warn(err.message);
                });
            }, 100);
        });
    }
    
    calibrate() {
        this._imu.beginNDOF(() => {
            console.info('IMU calibration:');
    
            this.calibrationCycle = setInterval(() => {
                this._imu.getCalibrationStatus((err, res) => {
                    if (!err && res) {
                        console.log(JSON.stringify(res));
                        
                        if (res.accelerometerStatus >= 3 && res.gyroStatus >= 3 && res.magnetometerStatus >= 3) {
                            this._imu.getCalibrationData((err, res) => {
                                if (!err && res) {
                                    this.endCalibration(res);
                                }
                            })
                        }
                    }
                });
            }, 100);
        });
    }
    
    endCalibration(results) {
        fs.writeFile(path.resolve(__dirname + config.filepaths.imu_calibration_data_file), JSON.stringify(results), (err) => {
            if (err)
                console.warn("Unable to save imu-calibration data");
        });
        console.log("Calibration data captured");
        clearInterval(this.calibrationCycle);
    }
    
}

module.exports = IMUComponent;