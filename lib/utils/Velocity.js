class Velocity {
    constructor() {
        this._vx = this._vy = this._vz = 0;
    }
    
    update(xa, ya, za, dt) {
        this._vx += xa*dt;
        this._vy += ya*dt;
        this._vz += za*dt;
    }
    
    resultant() {
        // let xdir, ydir, zdir;
        let vxy, vxyz;
        
        // xdir = this._vx < 0 ? -1 : 1;
        // ydir = this._vy < 0 ? -1 : 1;
        // zdir = this._vz < 0 ? -1 : 1;
        
        vxy = this._vx*this._vx + this._vy*this._vy;
        vxyz = vxy + this._vz*this._vz;
        
        return Math.sqrt(vxyz);
    }
    
}

class VelocityY {
    constructor() {
        this._vy = 0;
    }
    
    update(ya, dt) {
        this._vy -= ya*dt; // Due to orientation of board on testbed
    }
}

module.exports.Velocity = Velocity;
module.exports.VelocityY = VelocityY;