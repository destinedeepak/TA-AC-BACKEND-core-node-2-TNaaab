const path = require('path');
const http = require('http');
const qs = require('querystring');
const { parse } = require('path');
const fs = require('fs');
const url = require('url');
const { endianness } = require('os');
const { log } = require('console');

const userDir = path.join(__dirname, '/users/');
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

      fs.open(userDir + parsedData.username + '.json', 'wx', (error, file) => {
          if(error){
            //   console.log(error);
          }
        fs.writeFile(file, store, (err) => {
            // console.log(err);
            fs.close(file, (err) => {
                res.end(`${parsedData.username} is created`);
              });
          });
      });
    } 

    if (req.method === 'GET' && parsedURL.pathname === '/users'){
        fs.readFile(userDir + parsedURL.query.username + '.json',(err, user) => {
            res.end(user)
        })
    }
    
    if(req.method === 'DELETE' && parsedURL.pathname === '/users'){
        fs.unlink(userDir + parsedURL.query.username + '.json', (err) => {
            if(err){res.end('No such file available to delete')}
            res.end(`${parsedURL.query.username} is deleted`)
        })
    }

    if(req.method === 'PUT' && parsedURL.pathname === '/users'){
        fs.open(userDir + parsedURL.query.username + '.json', 'r+',(err, file) =>{
            fs.ftruncate(file, (err)=> {
                fs.writeFile(file, store, (err) => {
                    // console.log(err);
                    fs.close(file, (err) => {
                        res.end(`${parsedURL.query.username} is updated`);
                      });
                  });
            })
        })
    }
  });
}

server.listen(3333, () => {
  console.log('server is listening at 3333');
});
