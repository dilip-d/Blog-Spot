import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routes from './routes/index'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({ msg: 'hai welcome' })
})

import './config/database'

app.use('/api', routes.authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})