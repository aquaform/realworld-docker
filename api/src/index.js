const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const { connectDb } = require('./helpers/db')
const { port, host, db, authApiUrl } = require('./configuration')
const  app = express()

const postSchema = new mongoose.Schema({
    name: String
})

const Post = mongoose.model('Post', postSchema)
const startServer = () => {
    app.listen(port, () => {
        console.log(`Server listening on ${port}`)
        console.log(`On host ${host}`)
        console.log(`Our db ${db}`)

        Post.find(function (err, posts) {
            if (err) return console.error(err);
            console.log(posts);
        })

        const silence = new Post({name: "silence"})
        silence.save((function (err, savedPost) {
            if(err) return console.error(err)
            console.log('save post:', savedPost)
        }))

    })
}

app.get('/test', (req, res) => {
    res.send('Its works')
})

app.get('/testwithcurrentuser', async (req, res) => {
    console.log(authApiUrl + '/currentUser')
    const result = await axios.get(authApiUrl + '/currentUser')
    res.json({
        testwithcurrentuser: true,
        currentUserFromAuth: result.data
    })
})

app.get('/api/testapidata', (req, res) => {
    res.json({
        message: "Hello Man"
    })
})


connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer)