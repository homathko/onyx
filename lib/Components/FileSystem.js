/**
 * FileSystem.js
 *
 * Responsible for housing all node fs and path operations for each component seperately
 *
 * @class FileSystem
 */

const fs = require('fs');
const path = require('path');

class FileSystem {
    constructor(dirName, idString) {
        this._dirName = dirName;
        this._idString = idString;
    }
    
    async createStream () {
        fs.readdir(path.resolve(__dirname + dirName), (err, files) => {
            if (!err) {
                const fileCount = files.length;
                const date = new Date();
                this._ws = fs.createWriteStream(path.resolve(__dirname + this._dirName) + `/${this._idString}-log-${fileCount+1}-${date.getDate()}${date.getHours()}${date.getMinutes()}.csv`);
                this.writeColHeaders();
            }
        });
    }
    
    writeColHeaders() {
    
    }
}

class FileSystemLog extends FileSystem {
    constructor (dirName, idString, colHeaders) {
        super (dirName, idString);
        
        this._colHeaders = colHeaders;
    }
    
    writeColHeaders() {
        this._ws.writeFile(this._colHeaders.join(',') + '\n');
    }
    
}

module.exports = IMUFileSystem;