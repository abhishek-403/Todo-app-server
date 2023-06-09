const express = require('express')
require('dotenv').config('./.env')
const cookieParser = require('cookie-parser')
const mongoDB = require('./dBconnnect')
mongoDB();
const app = express();

const cors = require('cors')
let origin = "http://localhost:3000"
if (process.env.NODE_ENV?.trim() === "production") {
    origin = process.env.CLIENT_URL
}
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(cors({
    credentials: true,
    origin
}))


const port = process.env.PORT || 4000
const mainRouter = require('./routes')

app.use('/api', mainRouter)
app.use('/', (req, res) => {
    return res.send("Ok from server")
})


app.listen(port, () => {
    console.log("Listening on ", port);

})