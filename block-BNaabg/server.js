const path = require('path');
const http = require('http');
const qs = require('querystring');
const { parse } = require('path');
const fs = require('fs');
const url = require('url');

const userPath = path.join(__dirname, '/users/');
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  var parsedURL = url.parse(req.url,true);
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.method === 'POST' && parsedURL.pathname === '/users') {
      var parsedData = JSON.parse(store);
    //   console.log(parsedURL.query.username);

      fs.open(userPath + parsedData.username + '.json', 'wx', (err, file) => {
          if(err) return res.end('Users already exists');
        fs.writeFile(file, store, (err) => {
            if(err) return res.end(err);
            fs.close(file, () => {
                return res.end(`${parsedData.username} is created`);
              });
          });
      });
    } 

    if (req.method === 'GET' && parsedURL.pathname === '/users'){
        fs.readFile(userPath + parsedURL.query.username + '.json',(err, user) => {
            if(err) return res.end(err);
            return res.end(user);
        })
    }
    
    if(req.method === 'DELETE' && parsedURL.pathname === '/users'){
        fs.unlink(userPath + parsedURL.query.username + '.json', (err) => {
            if(err) return res.end(err);
            return res.end(`${parsedURL.query.username} is deleted`)
        })
    }

    if(req.method === 'PUT' && parsedURL.pathname === '/users'){
        fs.open(userPath + parsedURL.query.username + '.json', 'r+',(err, file) =>{
            if(err) return res.end(err);
            fs.ftruncate(file, (err)=> {
                if(err) return res.end(err);
                fs.writeFile(file, store, (err) => {
                    if(err) return res.end(err);
                    fs.close(file, (err) => {
                        if(err) return res.end(err);
                        return res.end(`${parsedURL.query.username} is updated`);
                      });
                  });
            })
        })
    }
    // res.statusCode = 404;
    // res.end("page not found");
  });
}

server.listen(3333, () => {
  console.log('server is listening at 3333');
});
