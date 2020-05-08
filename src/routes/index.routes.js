const { Router } = require('express');
const router = Router();

const passport = require('passport');

const { isloggedIn, isnologgedIn } = require('../config/auth');
const {
	inicio,
	renderIndex,
	salir,
} = require('../controllers/index.controllers');

const { subir_img } = require('../controllers/image');
const {
	ComentarioJson,
	ComentInicioJson,
	select_images_Json,
	select_images_inicio_Json,
	new_gustas_Json,
	tagsJson,
} = require('../json.Query');

const { buscar } = require('../controllers/busquedas');

router.get('/', isnologgedIn, renderIndex);

router.post(
	'/registro',
	passport.authenticate('registro', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true,
	})
);

router.post(
	'/login',
	passport.authenticate('login', {
		successRedirect: '/inicio',
		failureRedirect: '/',
		failureFlash: true,
	})
);

router.post('/buscar', buscar);

router.post('/subir_img_log', subir_img);

router.get('/inicio', isloggedIn, inicio);

router.get('/salir', salir);

router.get('/api/img', async (req, res) => {
	let images = await select_images_Json();
	res.json(images);
});

router.get('/api/img-log', async (req, res) => {
	let images = await select_images_inicio_Json();
	res.json(images);
});

router.post('/new_mensaje', async (req, res) => {
	var resp = await ComentarioJson(req);
	res.json(resp);
});

router.post('/mensajes', async (req, res) => {
	var respu = await ComentInicioJson(req);
	res.json(respu);
});

router.post('/new_gusta', async (req, res) => {
	var resp = await new_gustas_Json(req);
	res.json(resp);
});

router.post('/data', async (req, res) => {
	const data = await tagsJson();
	res.json(data);
});

router.post('/profile', (req, res) => {
	console.log(req.files.length);
});

module.exports = router;