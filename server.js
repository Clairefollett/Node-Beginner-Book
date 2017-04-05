const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var postData = '';
        const pathname = url.parse(request.url).pathname;
        console.log('request received for ' + pathname);

        request.setEncoding('utf8');

        request.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
            console.log('received POST chunk ' + postDataChunk + '.');
        });
        
        request.addListener('end', function() {
            route(handle, pathname, response, postData);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log('server has started')
}

exports.start = start;