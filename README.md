pdfplease
=========

A command line utility to convert .md files into PDF files.

    pdfplease markdownfile.md
    
It's that easy!

## Installation

    [sudo] npm install pdfplease -g
    
You need to install it globally, because it's a command line interface, not something you can require in your code (not yet anyway).

## Usage

Simple:

    pdfplease markdownfile.md

### But there are some other options too.

Would you like to supply your own CSS file?

    pdfplease markdownfile.md -c style.css
    
Would you like to supply your own HTML file?

    pdfplease markdownfile.md -h container.html
    
Or do both...

    pdfplease markdownfile.md -c style.css -h container.html
    
## Supplying your own HTML file

There's a small catch! pdfplease looks for a tag with an id of #content, and drops the resulting HTML (converted from the markdown file) in that. If you don't have a tag with an id of content, your PDF will be empty. You can use the following as a really simple starting point.

    <!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <div id="content"></div>
        </body>
    </html>