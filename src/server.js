import http from 'node:http';
import { emitWarning } from 'node:process';

const users = []

const server = http.createServer((req, res)=>{
    const{method, url} = req

    

    if (method == 'GET' && url == '/users') {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }


    if (method == 'POST'&& url == '/users') {


        users.push({
            id:1,
            name:'zito doido',
            email:'zitodoido@zito',
        })
        return res.writeHead(201).end()
    }


    return res.writeHead(404).end()

})

server.listen(3334)