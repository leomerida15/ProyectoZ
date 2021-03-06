const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const pool = require('../database');
const query = require('../query');
const helpers = require('./helpers');
const { crearCarpeta } = require('./../json.Query');

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

			try {
				query[2].values = [datosUser.username];

				var res = await pool.query(query[2]);

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
			} catch (error) {}
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
			try {
				const res = await pool.query(query[1]);

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
						j = res.rows.length - 1;
					}
				}
				if (cheq == 0) {
					if (newUser.password == newUser.confir_clave) {
						newUser.password = await helpers.encryptPassword(password);
						crearCarpeta(newUser.usuario);
						var user = [
							`${newUser.username}`,
							`${newUser.usuario}`,
							`${newUser.password}`,
							'usuarioBasico',
						];
						query[0].values = user;
						await pool.query(query[0]);

						done(null, user, req.flash('success', 'correcto'));
					} else {
						done(
							null,
							false,
							req.flash(
								'mensaje',
								'Su Clave y la confirmacion tienen que ser iguales '
							)
						);
					}
				}
			} catch (error) {}
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
