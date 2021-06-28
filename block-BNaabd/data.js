var http = require('http');
var fs = require('fs');
var qs = require('querystring')

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  var dataFormat = req.headers['content-type'];
  console.log(dataFormat);

  req.on('data', (chunk) => {
      store += chunk;
  })

  req.on('end', ()=>{
      if(dataFormat === 'application/json'){
        let parsedData = JSON.parse(store);
        console.log(parsedData)
      }

      if(dataFormat === 'application/x-www-form-urlencoded'){
        let formParseData = qs.parse(store);
        console.log(JSON.stringify(formParseData));
      }
      
      res.end(store);
  })
}

server.listen(7000, () => {
  console.log('Server is listening at 7k');
});
