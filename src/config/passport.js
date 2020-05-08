const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const pool = require('../database');
const query = require('../query');
const helpers = require('./helpers');

// console.log(query[0].text);

passport.use(
	'login',

	new localstrategy(
		{
			usernameField: 'correo_login',
			passwordField: 'clave_login',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			// await img.select_img();

			const datosUser = {
				username,
				password,
			};

			// console.log(datosUser.username);
			// var savePassword = '';

			query[2].values = [datosUser.username];

			await pool.query(query[2], async (err, res) => {
				if (err) {
					console.log(err.stack);
				} else {
					// console.log(res.rows[0]);
					const user = res.rows[0];
					if (user) {
						// console.log('savePassword estoy =', user.password);
						const validPassword = await helpers.matchPassword(
							password,
							user.password
						);

						if (validPassword) {
							done(null, user, req.flash('success', 'correcto'));
						} else {
							done(null, false, req.flash('mensaje', 'verifique su clave'));
						}
					} else {
						return done(
							null,
							false,
							req.flash('mensaje', 'el usuario no existe')
						);
					}
				}
			});
		}
	)
);

passport.use(
	'registro',
	new localstrategy(
		{
			usernameField: 'correo',
			passwordField: 'clave',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			// console.log(req.body);
			const { confir_clave, usuario } = req.body;
			const newUser = {
				username,
				password,
				confir_clave,
				usuario,
			};

			var cheq = 0;

			query[0].values = [
				`${newUser.username}`,
				`${newUser.usuario}`,
				`${newUser.password}`,
				'usuarioBasico',
			];

			const result = await pool.query(query[1], async (err, res) => {
				if (err) {
					done(null, false, req.flash('mensaje', 'Error al conectar'));
				} else {
					for (let j = 0; j <= res.rows.length - 1; j++) {
						if (
							newUser.username == res.rows[j].email ||
							newUser.usuario == res.rows[j].username
						) {
							cheq = cheq + 1;
							done(
								null,
								false,
								req.flash('mensaje', 'Su usuario o correo ya estan en uso')
							);
						}
					}
					if (cheq == 0) {
						if (newUser.password == newUser.confir_clave) {
							newUser.password = await helpers.encryptPassword(password);

							query[0].values = [
								`${newUser.username}`,
								`${newUser.usuario}`,
								`${newUser.password}`,
								'usuarioBasico',
							];

							const guardar_todo = await pool.query(query[0], (err, res) => {
								if (err) {
									done(null, false, req.flash('mensaje', 'Error al conectar'));
								} else {
									done(null, newUser, req.flash('mensaje', 'correcto'));
								}
							});
						} else {
							done(
								null,
								false,
								req.flash(
									'mensaje',
									'Su Clave y la confirmacion tienen que ser iguales'
								)
							);
						}
					}
				}
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
