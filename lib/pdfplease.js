/* jshint strict: true, node: true */

"use strict";

var HTMLPlease = require('./htmlplease'),
    fs = require('fs');

function PDFPlease (markdown, resultFile) {
    
    this._markdown = markdown || '';
    this._resultFile = resultFile || '';
    this._html = null;
    
    // use HTMLPlease to convert the content into HTML
    this.htmlp = new HTMLPlease();
    
}

PDFPlease.prototype.generatePDF = function (callback) {
  
    var _this = this;
    
    // update HTMLPlease with the source
    this.htmlp.source = this._markdown;
    
    // convert the source into HTML
    this.htmlp.convert(function (err, convertedText) {
        
        if (err) {
            callback(err, null);
        }
        
        // store the convertedText for later
        _this._html = convertedText;
        
        // write the file
        fs.writeFile(_this._resultFile, convertedText, function (err) {
         
            callback(err || null, _this._resultFile);
            
        });
        
    });
    
};

/* module.exports.pdfplease */
module.exports.pdfplease = PDFPlease;

/* module.exports.generatePDF, a helper function */
module.exports.generatePDF = function (markdown, resultFile, callback) {
    
    var pdfp = new PDFPlease(markdown, resultFile);
    pdfp.generatePDF(function (err, result) {
        
        callback(err, result, pdfp);
        
    });
    
};