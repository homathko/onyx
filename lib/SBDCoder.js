const protobuf = require('protobufjs');

class SBDCoder {
    constructor () {
        const root = protobuf.Root.fromJSON(require('../onyx-proto'));
        
        this._coder = {
            posRep: root.lookupType('onyx.Posrep')
        }
    }
    
    encode (json, coderType) {
        const payload = this._coder[coderType].create(json);
        const protoBuffer = this._coder[coderType].encode(payload).finish();
        
        return protoBuffer;
    }
}

module.exports = SBDCoder;