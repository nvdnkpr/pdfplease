/* jshint strict: true, node: true */

"use strict";

var HTMLPlease = require('./htmlplease'),
    fs = require('fs'),
    childProcess = require('child_process'),
    path = require('path'),
    tmp = require('tmp');

function PDFPlease (markdown, resultFile, cssFile) {
    
    this._markdown = markdown || '';
    this._resultFile = resultFile || '';
    this._cssFile = cssFile || path.resolve(__dirname, '..', 'phantomjs', 'default.css');
    this._html = null;
    
    // use HTMLPlease to convert the content into HTML
    this.htmlp = new HTMLPlease();
    
}

/* PDFPlease.css getter setter */
Object.defineProperty(PDFPlease.prototype, "css", {

    get: function () {
        return this._cssFile;
    },
    
    set: function (css) {
        this._cssFile = css;
    }
    
});

PDFPlease.prototype.generatePDF = function (callback) {
  
    var _this = this;
    
    // update HTMLPlease with the source
    this.htmlp.source = this._markdown;
    
    // convert the source into HTML
    this.htmlp.convert(function (err, convertedText) {
        
        if (err) {
            callback(err, null);
        }
        
        var htmlFile = path.dirname(_this._resultFile) + '/' + path.basename(_this._resultFile, path.extname(_this._resultFile)) + '.html';
        
        // store the convertedText for later
        _this._html = convertedText;
        
        // write HTML file
        tmp.file(function (err, htmlPath, htmlFD) {
            
            if (err) {
                return callback(err);
            }
            
            fs.close(htmlFD);
        
            fs.writeFile(htmlPath, convertedText, function (err) {
                 
                if (err) {
                    callback(err);
                }
        
                var phantomArgs = [
                    path.resolve(__dirname, '..', 'phantomjs', 'render.js'),
                    path.resolve(__dirname, '..', 'phantomjs', 'container.html'),
                    htmlPath,
                    _this._cssFile,
                    _this._resultFile
                ];
                
                // make a call to phantomjs to render the page
                childProcess.execFile('phantomjs', phantomArgs, function (err, stdout, stderr) {
                    
                    return callback(err || null, _this._resultFile);
                    
                });
                
            });
            
        }); 
            
    });
    
};

/* module.exports.pdfplease */
module.exports.pdfplease = PDFPlease;

/* module.exports.generatePDF, a helper function */
module.exports.generatePDF = function (markdown, options, callback) {
    
    var opts = options;
    
    if (!opts.resultFile) {
        callback('Please define a result file for the PDF to be rendered too.');
    }
    
    var pdfp = new PDFPlease(markdown, opts.resultFile);
    if (opts.css) pdfp.css = opts.css;
    pdfp.generatePDF(function (err, result) {
        
        callback(err, result, pdfp);
        
    });
    
};