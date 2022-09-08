const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const hitlistRoutes = require('./routes/hitlist')
const PORT = process.env.PORT || 8080
const methodOverride = require('method-override')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//method override middleware, to send put and delete http methods from html forms
app.use(methodOverride( (req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )

  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
//added the hitlist route call
app.use('/hitlist', hitlistRoutes)


app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})    

