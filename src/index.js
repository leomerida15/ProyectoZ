const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

// initialize
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'secreto',
		resave: false,
		saveUninitialized: false
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
	destination: path.join(__dirname, './public/img/subidas'),
	filename: (req, file, cb, filename) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	}
});

app.use(
	multer({
		/*storage,*/
		dest: path.join(
			__dirname,
			'./public/img/subidas'
		) /*,
		limits: 5000000,
		fileFilter: (req, file, cb) => {
			const filetype = /jpeg|png|jpg|gif|psd|rar|zip/;
			const mimetype = filetype.test(file.mimetype);
			const extname = filetype.test(path.extname(file.originalname));
			if (mimetype && extname) {
				return cb(null, true);
			}
			cb('error tipo de archivo incorrecto');
		}*/
	}).array('subir_img', 2)
);

// gloval var

app.use((req, res, next) => {
	app.locals.mensaje = req.flash('mensaje');
	app.locals.datos_img = req.flash('datos_img');
	app.locals.success = req.flash('success');
	app.locals.user = req.user;
	next();
});

// routers
app.use(require('./routes/index.routes'));

// archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));

// exportar modulo
module.exports = app;
