const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const path = require('path')

app.use('/',express.static(path.join(__dirname, '/public')))

app.use('/',require('./routes/root'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))