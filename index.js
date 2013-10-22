#!/usr/bin/env node

/* jshint strict: true, node: true */

"use strict";

/* requires */
var program = require('commander'),
    path = require('path'),
    marked = require('marked'),
    fs = require('fs'),
    pdfplease = require('./lib/pdfplease.js');

/* work out command line options */
program
    .version('0.0.5')
    .option('-m --markdown [file]', 'Markdown file')
    .parse(process.argv);

/* also allow a default argument to be passed, being the MD file */
if(!program.markdown && process.argv.length) {
    program.markdown = path.relative('./', program.args[0]);
}

/* ensures we have a markdown file */
if (!program.markdown) {
    console.error('Please supply a markdown file.');
    process.exit(0);
}

/* determine the output name and load the markdown content */
var pdfFile = path.dirname(program.markdown) + '/' + path.basename(program.markdown, path.extname(program.markdown)) + '.pdf',
    markdown = fs.readFileSync(program.markdown, 'utf8'),
    pdfp;

/* let's generate the HTML file! */
pdfplease.generatePDF(markdown, pdfFile, function (err, result, pdfpref) {
   
    if (err) {
        console.error(err);
        process.exit(0);
    }
    
    pdfp = pdfpref;
    
    console.log('The PDF was successfully created (%s)', result);
    
});