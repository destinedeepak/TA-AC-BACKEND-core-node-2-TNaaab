var http = require('http');
var fs = require('fs');

http.createServer((req, res)=>{
    fs.createReadStream('./readme.txt').pipe(res);
}).listen(5000)

