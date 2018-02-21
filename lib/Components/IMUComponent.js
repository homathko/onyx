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
const VelocityY = require('../utils/Velocity').VelocityY;
const LAFilteredY = require('../utils/LAFiltered').LAFilteredY;
const config = require('../../config');

class IMUComponent extends HardwareComponent {
    constructor(ident, mediator) {
        super(ident, mediator);
        
        this._laf = new LAFilteredY();
        this._velocityF = new VelocityY();
        this._velocityRaw = new VelocityY();
        // Add a new sensor log file
        let fileCount;
        let date = new Date();
        fs.readdir(path.resolve(__dirname + config.filepaths.imu_logs_dir), (err, files) => {
            if (!err) {
                fileCount = files.length;
                this._fStream = fs.createWriteStream(path.resolve(__dirname + config.filepaths.imu_logs_dir + `/log-${fileCount+1}-${date.getDate()}${date.getHours()}${date.getMinutes()}.csv`));
            }
        });
    
        const fpath = path.resolve(__dirname + config.filepaths.imu_calibration_data_file);
        fs.readFile(fpath, 'utf8', (err, data) => {
            if (err) {
                console.warn(err);
                this._imu = new BNO055({
                    device: '/dev/i2c-3'
                });
                this.calibrate();
            } else if (!err && data) {
                const dataObj = JSON.parse(data);
                this._imu = new BNO055({
                    calibration: dataObj,
                    device: '/dev/i2c-3'
                }, () => {
                    this._imu.getCalibrationData((err, res) => {
                        const printThis = `Calibration data: ${res} \r\n\n`;
                        console.log(printThis);
                    });
                });
                setTimeout(() => {
                    this.run();
                }, 3000);
            }
        });
    }
    
    get2G () {
        const ACC_CONFIG = 0X08;
        const BNO055_PWR_MODE_ADDR = 0X3E;
        const BNO055_OPR_MODE_ADDR = 0X3D;
        const BNO055_PAGE_ID_ADDR  = 0X07;
        
        let x;
        const self = this;
        this._imu.wire.writeBytes(ACC_CONFIG, [0xB], function(err, res) {
            if (!err) {
                setTimeout(() => {
                    self._imu.wire.readBytes(ACC_CONFIG, 1, function (err, res) {
                        x = res;
                    });
                }, 3000);
            }
        });
    }
    
    run() {
        this.get2G();
        this._imu.beginNDOF(() => {
            console.log("IMU running");
            const interval = 100;
            const secondsUntilWriteBegin = 3;
            let ticks = 0;
            let calibrationString;
            this._fStream.write('Ay, AyF, Vy, VyF, System Status\n');
            
            this.runCycle = setInterval(() => {
    
                this._imu.getCalibrationStatus((err, res) => {
                    calibrationString = JSON.stringify(res.systemStatus);
                });
    
                    this._imu.getLinearAcceleration((err, res) => {
                        if (!err && res) {
                            if (ticks > secondsUntilWriteBegin / (interval / 1000)) {
                                let laf_x = this._laf.filteredY(res.x);
                                // if (laf_y > config.kalman_values.Q.y || laf_y < -config.kalman_values.Q.y) {
                                this._velocityF.update(laf_x, interval / 1000);
                                // } else {
                                //     laf_y = 0;
                                // }
                                this._velocityRaw.update(res.x, interval / 1000);
                                let printLine = res.x + ',' + laf_x;
                                printLine += ',' + this._velocityRaw._vy + ',' + this._velocityF._vy + ',' + (calibrationString ? calibrationString : '') + '\r\n';
                                this._fStream.write(printLine);
                                console.log(printLine);
                            }
                            ticks++;
                        } else {
                            console.warn(err.message);
                        }
                    });
                
            }, interval);
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
        setTimeout(() => {this.run()}, 1000);
    }
}

module.exports = IMUComponent;