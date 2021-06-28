const path = require('path');
const http = require('http');
const qs = require('querystring');
const { parse } = require('path');

//1.
console.log('/index.js');
console.log(path.join(`./${__dirname}`, 'index.js'));
//2.
let server = http.createServer(handleRequest);

function handleRequest(req,res){
    let store = "";
    let dataFormat = req.headers['content-type'];

    req.on('data',(chunk)=>{
        store += chunk; 
    })

    req.on('end', () => {
        if(req.method === 'GET' && dataFormat === 'application/json' && req.url === '/'){
            res.statusCode = 201;
            res.end(store);
        }
        if(req.method === 'GET' && dataFormat === 'application/x-www-form-urlencoded' && req.url === '/'){
            res.statusCode = 201;
            let parsedFormData = qs.parse(store);
            res.end(parsedFormData.captain);
        }
    })
}

server.listen(3333, ()=>{
    console.log('server is listening at 3333');
})