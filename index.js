const http = require('http');
const url = require('url');
const config = require('./config');
const stringDecoder = require('string_decoder').StringDecoder;
const port = config.httpPort;
const fs = require('fs');
const _data = require('./lib/data');

// _data.create('test', 'newFile', {'foo':'bar'},(err)=>{
// console.log('This is an error : ',err);
// });

// _data.read('test', 'newFile', (err,data)=>{
//     console.log('This is an error : ',err,data);
// });
    
// _data.update('test','newFile', {'akhil':'teja'},(err)=>{
//     console.log('There is an error : ',err);
// })

_data.delete('test','newFile',(err,data)=>{
    console.log('this is an error: ',err);
})

const server = http.createServer((req,res)=>{
  const parsedURL = url.parse(req.url, true);
  const path = parsedURL.pathname;
  const method = req.method.toLowerCase();
  const queryStringObject = parsedURL.query;
  const headers = req.headers;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');
  const decoder = new stringDecoder('utf-8');
  let buffer = '';

    // console.log(headers);
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });
    req.on('end',()=>{
        buffer += decoder.end();
        const chosenHandler = typeof(router[trimmedPath])!== 'undefined' ? router[trimmedPath] : handlers.notFound;
        const data = {
            "trimmedPath":trimmedPath,
            "queryStringObject" : queryStringObject,
            "method" : method,
            "headers" : headers,
            "payload" : buffer
        }
        chosenHandler(data, (statusCode, payload)=>{
            statusCode = typeof(statusCode == 'number') ? statusCode :200;
            payload = typeof(payload == 'object') ? payload : {};
            payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(payloadString);
                console.log(statusCode,payloadString);
        });
           
    });

});

server.listen(port, ()=>{
    console.log(`Server Started on ${port} in ${config.envName} mode`);
});
const  handlers = {};
handlers.users = (data,callback) =>{
    callback(406,{'name':'Akhilll'});
};
handlers.notFound = (data,callback)=>{
    callback(404, {'status': 'Not Found dude'});
}


const router  = {
    "users" : handlers.users
}
