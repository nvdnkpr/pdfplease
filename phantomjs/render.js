/* jshint strict: true, node: true */
/* global phantom, document */

/* this file is passed to phantomjs and controls the rendering of the PDF */

"use strict";

var system = require('system'),
    page = require('webpage').create(),
    fs = require('fs');

var htmlContainerFile = system.args[1];
var htmlContentFile = system.args[2];
var cssFile = system.args[3];
var pdfFile = system.args[4];

page.open(htmlContainerFile, function (status) {

    // if there was an issue, exit
    if (status === 'fail') {
        page.close();
        console.log('Phantomjs failed to open page (' + htmlContainerFile + ')');
        return phantom.exit();
    }
    
    // load in the CSS
    page.evaluate(function (cssFile) {
        
        var head = document.querySelector('head');
        var cssEl = document.createElement('link');
        
        cssEl.rel = 'stylesheet';
        cssEl.href = cssFile;
        
        head.appendChild(cssEl);
        
    }, cssFile);
    
    // load in the content HTML
    page.evaluate(function (html) {
        
        var body = document.querySelector('body');
        var divEl = document.createElement('div');
        
        body.innerHTML = html;
        
        body.appendChild(divEl);
        
    }, fs.read(htmlContentFile));
    
    // define the paper size
    page.paperSize = {
    
        format: 'A4',
        orientation: 'portrait',
        border: '1.2cm'
    
    };
    
    setTimeout(function () {
        
        page.render(pdfFile);
        phantom.exit();
        
    }, 100);
    
});