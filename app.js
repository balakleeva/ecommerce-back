const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('DB connected')
})

mongoose.connection.on('error', (err) => {
    console.error(`DB connection error: ${err.message}`)
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use((cookieParser()))
app.use(expressValidator())
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

