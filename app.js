const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')//(session)
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const { json } = require('express');



// load config
dotenv.config({path: './config/config.env'})

// passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )
  

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true},
    ()=> {console.log('Connected to db!')})


// logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
//HELPERS
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

//handlebars 
app.engine(
    '.hbs', 
    //!Change: add '.engine' after exphbs
    exphbs.engine({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            editIcon,
            select,
        },
        defaultLayout: 'main',
        extname: '.hbs'
    })
);
app.set('view engine', '.hbs');

//sessions 
app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //!Change: MongoStore syntax has changed
    store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
})
    })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// set global var
app.use(function (req,res, next){
    res.locals.user = req.user || null
    next()
})

//static folder
app.use(express.static(path.join(__dirname,
    'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))
app.use('/esspri', require('./routes/esspri'))





const PORT = process.env.PORT || 1001

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )