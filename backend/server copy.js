import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import router from './routes/imageRoutes.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()

//allows json data in request sbody postman
app.use(express.json())

app.use(cors('http://localhost:3000'))

app.use('/', router)
// making a uploads folder static with express
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))