import {express} from 'express'
import {morgan} from 'morgan'
import {path} from 'path'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

//import routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(morgan('dev'))

//routes
app.use('/', indexRoutes)

//server
const port = app.get('port')

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
