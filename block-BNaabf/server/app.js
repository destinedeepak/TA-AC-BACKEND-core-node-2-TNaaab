const path = require('path');
const http = require('http');
const qs = require('querystring');
const { parse } = require('path');
const fs = require('fs');

//1.
console.log('../client/index.js');
console.log(path.join(__dirname, '..', 'client/index.js'));
//2.
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = ';';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
    if (req.method === 'POST' && req.url === '/form') {
      let parsedData = qs.parse(store);
      console.log(parsedData);
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `<h2>${parsedData.fname}</h2><p>${parsedData.email}</p><span>${parsedData.age}</span>`
      );
    }
  });
}

server.listen(5678, () => {
  console.log('server is listening at 5678');
});
