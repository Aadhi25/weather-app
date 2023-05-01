const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('dotenv').config();

const port = 8080

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://weatherapi-com.p.rapidapi.com/current.json?q=abcd',
    headers: { 
        'X-RapidAPI-Key': process.env.API_KEY
    }
}

app.get('/', async (req, res) => {
    try {
        const result = await axios.request(config)
        res.status(200).json(result.data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

if(process.env.NODE_ENV !== 'test') {
    app.listen(port)
}

module.exports = {
    app
}