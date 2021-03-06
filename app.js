const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

if(process.env.ENV == 'Test'){
    console.log('working on test DB')
    const db = mongoose.connect('mongodb://localhost/bookAPI_Test')
}else{
    console.log('working on live DB')
    const db = mongoose.connect('mongodb://localhost/bookAPI')
}

const port = process.env.PORT || 3000
const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api', bookRouter)

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

module.exports = app
