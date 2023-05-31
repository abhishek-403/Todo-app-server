const express = require('express')
require('dotenv').config('./.env')
const cookieParser = require('cookie-parser')
const mongoDB = require('./dBconnnect')
mongoDB();
const app = express();

const cors = require('cors')

app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


const port = process.env.PORT
const mainRouter = require('./routes')

app.use('/api', mainRouter)
app.use('/',(req,res)=>{
    return res.send("Ok from server")
})


app.listen(port, () => {
    console.log("Listening on ", port);

})