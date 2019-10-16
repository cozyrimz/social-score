const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') })

app.use(cors());
const twRoutes = require('./routes/twitter.js')
const igRoutes = require('./routes/instagram.js')
const hpRoutes = require('./routes/homepage.js')
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/',twRoutes)
app.use('/',igRoutes)
app.use('/',hpRoutes)

const port = process.env.PORT;
app.listen(port, () =>{
    console.log(`A Node JS API is listening on port: ${port}`)
})