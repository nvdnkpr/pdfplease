#!/usr/bin/env node

/* jshint strict: true, node: true */

"use strict";

/* requires */
var program = require('commander'),
    path = require('path'),
    marked = require('marked'),
    fs = require('fs'),
    colors = require('colors'),
    pdfplease = require('./lib/pdfplease.js'),
    packageJSON = require('./package.json');

/* work out command line options */
program
    .version(packageJSON.version)
    .option('-m --markdown [file]', 'Markdown file', path.resolve)
    .option('-c --css [file]', 'CSS file', path.resolve)
    .option('-h --html [file]', 'HTML container file', path.resolve)
    .parse(process.argv);

/* also allow a default argument to be passed, being the MD file */
if(!program.markdown && process.argv.length) {
    program.markdown = path.relative('./', program.args[0]);
}

/* ensures we have a markdown file */
if (!program.markdown) {
    console.error('Please supply a markdown file.'.red);
    process.exit(0);
}

/* determine the output name and load the markdown content */
var pdfFile = path.dirname(program.markdown) + '/' + path.basename(program.markdown, path.extname(program.markdown)) + '.pdf',
    markdown = fs.readFileSync(program.markdown, 'utf8'),
    pdfp;

/* let's generate the HTML file! */

var pdfpleaseOptions = {
    resultFile: pdfFile
};

if (program.css) pdfpleaseOptions.css = program.css;
if (program.html) pdfpleaseOptions.htmlContainer = program.html;

pdfplease.generatePDF(markdown, pdfpleaseOptions, function (err, result, pdfpref) {
   
    if (err) {
        console.error(err);
        process.exit(0);
    }
    
    pdfp = pdfpref;
    
    console.log('The PDF was successfully created (%s).'.green, result);
    
});