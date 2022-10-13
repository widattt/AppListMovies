import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import movie from './routers/movie'
import auth from './routers/auth'
import mongoose from 'mongoose'


const app = express()
const PORT = process.env.port || 5000

const URI = 'mongodb+srv://admin:Dat0947500692@listmovies.siuxacj.mongodb.net/?retryWrites=true&w=majority'


app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb'}))

app.use(cors())

app.use('/', movie)
app.use('/auth', auth)

app.use(express.json())

mongoose.connect(URI)
    .then(() => {
        console.log('Db connected ...')
    })
    .catch((err) => {
        console.log('err', err)
    })

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})