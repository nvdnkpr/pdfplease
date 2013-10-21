/* jshint strict: true, node: true */
"use strict";

/* requires */
var marked = require('marked');

/* HTMLPlease class */
function HTMLPlease (source, type, options) {
    
    this._source = source || '';
    this._type = 'markdown';
    this._options = options || {gfm:true};
    
}

/* htmlplease.source getter setter */
Object.defineProperty(HTMLPlease.prototype, "source", {

    get: function () {
        return this._source;
    },
    
    set: function (source) {
        this._source = source;
    }
    
});

/* htmlplease.options getter setter */
Object.defineProperty(HTMLPlease.prototype, "options", {
 
    get: function () {
        return this._options;
    },
    
    set: function (options) {
        this._options = options;
    }
    
});

/* Used to convert from source into HTML */
HTMLPlease.prototype.convert = function (callback) {
    
    marked(this._source, this._options, callback);
    
};

module.exports = HTMLPlease;