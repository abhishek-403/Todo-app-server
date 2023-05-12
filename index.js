const express = require('express')
require('dotenv').config('./.env')
const cookieParser = require('cookie-parser')
const mongoDB = require('./dBconnnect')
mongoDB();
const app = express();

app.use(cookieParser())
app.use(express.json({limit:'10mb'}))

const port = process.env.PORT
const mainRouter = require('./routes')

app.use('/api', mainRouter)


app.listen(port, () => {
    console.log("Listening on ", port);

})