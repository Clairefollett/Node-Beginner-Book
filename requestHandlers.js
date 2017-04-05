function start(response) {
    console.log('request handler start was called');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('hello start');
        response.end();
}

function upload(response) {
    console.log('request handler upload was called');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello upload');
    response.end();
}

exports.start = start;
exports.upload = upload;