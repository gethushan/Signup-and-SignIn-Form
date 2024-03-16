const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')
const userRouter = require("./userRouter")
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


mongoose.set('strictQuery',true);
mongoose.connect(process.env.DATABASE_CONNECTION_VARIABLE)
app.use('/j',userRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

