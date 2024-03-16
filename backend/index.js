const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require("./userRouter")
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors(
  {
      origin: 'https://login-project-flame.vercel.app',
      methods: ["GET,POST"],
      credentials: true
}))

mongoose.set('strictQuery',true);
mongoose.connect(process.env.DATABASE_CONNECTION_VARIABLE)
app.use('/j',userRouter)

app.listen(4000, () => {
    console.log(`Example app listening on port 4000`)
  })

