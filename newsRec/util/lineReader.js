/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-11 13:04:06
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-03-11 13:15:09
 */
const fs = require('fs');

class LineReader {
    constructor(path) {
        this._leftOver = '';
        this._EOF = false;
        this._filename;
        this._fd = 0;
        this._bufferSize = 1024;
        this._buffer = new Buffer.alloc(this._bufferSize);

        if (undefined !== path) {
            try {
                fs.statSync(path).isFile();
                this.open(path);
            }
            catch (exception) {
                console.log(path, 'is not a file.');
                this._EOF = false;
                return;
            }
        }
    }
    close() {
        var self = this;
        try {
            fs.closeSync(self._fd);
        }
        catch (exception) {
            console.log('closing file failed.');
        }
        self._EOF = true;
        self._fd = 0;
        return;
    }
    next() {
        var self = this;
    
        if (0 == self._fd) {
            return;
        }
    
        var _idxStart = 0;
        var idx = 0;
        while ((self._leftOver.indexOf('\n', _idxStart)) == -1) {
            var read;
            try {
                read = fs.readSync(self._fd, self._buffer, 0, self._bufferSize, null)
            }
            catch (exception) {
                console.log('reading file failed.');
                self.close();
                return;
            }
            if (read !== 0) {
                self._leftOver += self._buffer.toString('utf8', 0, read);
            } else {
                try {
                    fs.closeSync(self._fd);
                }
                catch (exception) {
                    console.log('closing file failed.');
                }
                self._EOF = true;
                self._fd = 0;
                return;
            }
        }
        if ((idx = self._leftOver.indexOf('\n', _idxStart)) !== -1) {
            var line = self._leftOver.substring(_idxStart, idx);
            _idxStart = idx + 1;
            self._leftOver = self._leftOver.substring(_idxStart);
            _idxStart = 0;
            return line;
        }
    }
    open(thePath) {
        var self = this;
        self._filename = thePath;
    
        if (0 !== self._fd) {
            self.close();
        }
    
        try {
            self._fd = fs.openSync(self._filename, 'r');
        }
        catch (exception) {
            console.log('open(): ' + self._filename + ' not found.');
            self._EOF = true;
            return;
        }
        self._EOF = false;
        return;
    }

}

module.exports = LineReader;