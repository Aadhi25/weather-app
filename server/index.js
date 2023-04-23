const http = require('http');
const axios = require('axios');
require('dotenv').config();

const host = '127.0.0.1'
const port = 3001

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://weatherapi-com.p.rapidapi.com/current.json?q=bangalore',
    headers: { 
        'X-RapidAPI-Key': process.env.API_KEY
    }
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        axios.request(config)
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            console.log(response.data);
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            console.log(err)
        })
    }
})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });