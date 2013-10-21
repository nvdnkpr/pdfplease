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
    .version('0.0.1')
    .option('-m --markdown [file]', 'Markdown file')
    .parse(process.argv);

/* ensures we have a markdown file */
if (!program.markdown) {
    console.error('Please supply a markdown file.');
    process.exit(0);
}

/* determine the output name and load the markdown content */
var htmlFile = path.dirname(program.markdown) + '/' + path.basename(program.markdown, path.extname(program.markdown)) + '.html',
    markdown = fs.readFileSync(program.markdown, 'utf8'),
    pdfp;

/* let's generate the HTML file! */
pdfplease.generatePDF(markdown, htmlFile, function (err, result, pdfpref) {
   
    if (err) {
        console.error(err);
        process.exit(0);
    }
    
    pdfp = pdfpref;
    
    console.log('The file was successfully saved (%s)', result);
    
});