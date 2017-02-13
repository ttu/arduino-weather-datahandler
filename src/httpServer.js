'use strict';

const http = require('http');

const port = 8080;
const hostname = '0.0.0.0';

const error404 = function (res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
};

module.exports = function (store) {

    const server = http.createServer(function (req, res) {
        console.log(`method: ${req.method} url: ${req.url}`);
        
        if (req.method != 'GET' || !req.url)
            return error404(res);

        switch (req.url) {
            case '/data':
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(store.data);
                break;
            case '/':
                res.writeHead(200, { 'Content-Typ': 'text/html' });
                res.end('hello');
                break;
            default:
                error404(res);
                break;
        }
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
};
