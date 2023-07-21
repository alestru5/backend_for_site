require('dotenv').config()
const express = require('express')
const sequalize = require('./db')

const PORT = process.env.PORT || 5000
const models = require('./models/models')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())



const start = async() => {
    try{
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start();