const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

// Initializations
const app = express()
require('./database')

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'Layouts'),
	partialsDir: path.join(app.get('views'), 'Partials'),
	extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(session({
	secret: 'examplenosqlnodesession',
	resave: true,
	saveUninitialized: true
}))

// Global variables

// Routes
app.use(require('./routes'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))


// Server initialization
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})