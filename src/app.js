const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

//db connect
mongoose.connect('mongodb://localhost/crud-mango')
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err))

//import routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', indexRoutes)

//server
const port = app.get('port')

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
