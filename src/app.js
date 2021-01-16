const express = require('express')
const path = require('path')
const ejs = require('ejs')

const partners = require('./routers/partners');

const app = express()
const port = process.env.port || 3000

// use router
app.use(express.json())
app.use(partners.router)

// defining paths for express
const publicDir = path.join(__dirname, '../public')
const viewsDir  = path.join(__dirname, '../templates/views')

// register the paths
app.set('view engine', 'ejs')
app.set('views', viewsDir)

app.use(express.static(publicDir))

console.log('Server started')

app.listen(port)