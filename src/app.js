const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// db connect
try {
  mongoose.connect('mongodb://localhost/crud-mango', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Db connected');
} catch (error) {
  console.error('Error connecting to the database: ', error);
  process.exit(1); // Stops the application if it can't connect to the database
}

// import routes
const indexRoutes = require('./routes/index')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// routes
app.use('/', indexRoutes)

// server
const port = app.get('port')

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
