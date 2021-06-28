var http = require('http');
var fs = require('fs');

http
  .createServer((req, res) => {
    var store = '';
    req.on('data', (chunk) => {
      store = store + chunk;
    });
    req.on('end', () => {
      res.write(store);
      res.end();
    });
  })
  .listen(3456, () => {
    console.log('Server is listening at 3456');
  });
