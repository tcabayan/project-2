require('dotenv').config()

const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.listen(PORT, () => console.log(`App listening on port ${PORT} ...`))