let path = require('path');
let http = require('http');
let qs = require('querystring');
const { parse } = require('path');

//1.
console.log(__filename);

let appAbsolutePath = path.join(__dirname, '/app.js');
console.log(appAbsolutePath);

console.log('./index.html');

let indexAbsolutePath = path.join(__dirname, '/index.html');
console.log(indexAbsolutePath);

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

//4.

let server4 = http.createServer(handleRequest4);

function handleRequest4(req,res){
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
            res.end(JSON.stringify(parsedFormData));
        }
    })
}

server4.listen(9000, ()=>{
    console.log('server is listening at 9k');
})

//.5
let server5 = http.createServer(handleRequest5);

function handleRequest5(req,res){
    let store = "";

    req.on('data',(chunk)=>{
        store += chunk; 
    })

    req.on('end', () => {
        // let parsedData = JSON.parse(store);
        // res.setHeader('Content-Type','text/html');
        // console.log(parsedData)
        // res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`);

        let parsedData = qs.parse(store);
        console.log(parsedData)
        res.end(`<h2>${parsedData.email}</h2>`)
    })
}

server5.listen(3335, ()=>{
    console.log('server is listening at 3335');
})
