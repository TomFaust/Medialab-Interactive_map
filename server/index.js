const PORT = 8000
const express = require('express')
const axios = require('axios')

const app = express()

app.get('/api', (req, res) =>  {
    res.json('Welcome to the API')
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
