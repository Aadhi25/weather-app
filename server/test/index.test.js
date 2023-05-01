const { app } = require('../index')
const supertest = require('supertest')

// Test the get request in index.js

describe('TEST /', () => {
    test('return the weather data of the searched place', async() => {
        const response = await supertest(app).get('/')
        expect(response.body)
    })
})