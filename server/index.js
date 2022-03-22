const express = require('express')
const axios = require('axios')
const  mongoose = require("mongoose");
const config = require('dotenv/config')

const PORT = 8000
const URL = `mongodb+srv://
    ${process.env.DB_USER}:
    ${process.env.DB_PASSWORD}@
    ${process.env.DB_NAME}`

const app = express()

//Connect to DB
mongoose.connect(URL, { useNewUrlParser: true},() => {
    console.log('conntected to database')
});

app.get('/api', (req, res) =>  {
    res.json('Welcome to the API')
})

app.listen(PORT, () => 
    console.log(`Server is running on ${PORT}`
))
