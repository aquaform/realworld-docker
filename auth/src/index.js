const express = require('express')
const axios = require('axios')
const { port, host, db, apiUrl } = require('./configuration')
const { connectDb } = require('./helpers/db')
const  app = express()


const startServer = () => {
    app.listen(port, () => {
        console.log(`Server AUTH listening on ${port}`)
        console.log(`On host ${host}`)
        console.log(`Our db ${db}`)
    })
}

app.get('/test', (req, res) => {
    res.send('Its works')
})

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: "123",
        email: "aqua@ya.ru"
    })
})

app.get('/testapidata', async (req, res) => {
    const result = await axios.get(apiUrl + '/testapidata')
    res.json(result.data)
})


connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer)