const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

function start(response) {
    console.log('request handler start was called');
        
        const body = '<html>'+
            'head'+
            '<meta http-equiv="Content-Type"' + 'content="text/html; charset=UTF =8" />' +
            '</head>' +
            '<body>' +
            '<form action="/upload"' + 'enctype="multipart/form-data" '+ 'method="post">'
            '<input type="file" name="upload" multiple="multiple" />' +
            '<input type="sunmit" value="Upload File" />' +
            '</form>' +
            '</body>' +
            '</html>';
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(body);
        response.end();
}

function upload(response, request) {
    console.log('request handler upload was called');

    var form = new formidable.IncomingForm();
    console.log('about to parse some data, yeah!');
    form.parse(request, function(error, fields, files) {
        console.log('parsing completed')

        fs.rename(fields.upload + '', './tmp/breezy.png', function(error) {
            if(error) {
                console.log(error)
            } 
        });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('image received: <br/>');
        response.write("<img src='/show ' />");
        response.end();
    });
}

function show (response) {
    console.log('request handler show was called');
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./tmp/breezy.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;