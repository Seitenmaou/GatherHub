//server index
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const defineCurrentUser = require('./middleware/defineCurrentUser')

//use
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

//for porduction
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'public', 'build')));
}

// routes
app.use(express.urlencoded({ extended: true }))
app.use('/profile', require('./controllers/profile'))
app.use('/authentication', require('./controllers/authentication'))
app.use('/messageboard', require('./controllers/messageBoard'))

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}

//listen at port
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})