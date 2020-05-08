const pool = require('../database');
const query = require('../query');
const path = require('path');
const fs = require('fs-extra');
const { randonSerial } = require('../config/serial');
const imgCtrol = {};
const {
	agregar_images_Json,
	agregar_mensajes_Json,
	agregar_gustas_Json,
	agregarTags,
	agregarType,
	agregarColor,
} = require('../json.Query');

imgCtrol.subir_img = async (req, res) => {
	// console.log(req.files);
	// console.log(req.files.length);
	// console.log(req.body);
	if (req.files.length > 2) {
		await fs.unlink(`src/public/img/subidas/${req.files[0].filename}`);
		await fs.unlink(`src/public/img/subidas/${req.files[1].filename}`);
		req.flash('mensaje', 'Solo puede subir dos Archivos en simultaneo.');
		res.redirect('/inicio');
	} else if (req.files.length == 0) {
		req.flash('mensaje', 'no subio una imagen.');
		res.redirect('/inicio');
	} else if (req.files.length == 2) {
		const imageTempPath1 = req.files[0].path;
		const ext1 = path.extname(req.files[0].originalname).toLowerCase();

		const imageTempPath2 = req.files[1].path;
		const ext2 = path.extname(req.files[1].originalname).toLowerCase();

		if (ext1 == '.jpg' || ext1 == '.png' || ext1 == '.jpeg') {
			if (ext2 == '.psd' || ext2 == '.zip' || ext2 == '.rar') {
				const imgUrl = await randonSerial();

				var carpeta1 = '';
				var carpeta2 = 'psd';
				if (ext1 == '.jpg') {
					carpeta1 = 'jpg';
				} else if (ext1 == '.png') {
					carpeta1 = 'png';
				} else if (ext1 == '.jpeg') {
					carpeta1 = 'jpeg';
				}

				var Inicio_imgUrl = '';
				try {
					const res = await pool.query(query[4]);

					if (!res.rows.length) {
						Inicio_imgUrl = '1';
					} else {
						Inicio_imgUrl = res.rows.length + 1;
					}

					var Url = `${Inicio_imgUrl}_${imgUrl}`;

					var newName = `${Url}${ext1}`;

					const targetPath1 = await path.resolve(
						`src/public/img/${carpeta1}/${Url}${ext1}`
					);

					const targetPath2 = await path.resolve(
						`src/public/img/${carpeta2}/${Url}${ext2}`
					);

					const lugar = `${carpeta1}/${Url}${ext1}`;

					const repositorio = `${carpeta2}/${Url}${ext2}`;

					await fs.rename(imageTempPath1, targetPath1);

					await fs.rename(imageTempPath2, targetPath2);

					await agregar_mensajes_Json(newName);

					await agregar_images_Json(carpeta2, lugar, newName);

					await agregar_gustas_Json(newName);

					await agregarJson(newName);

					await agregarTags(req, newName);

					query[3].values = [
						`${req.body.correo}`,
						`${carpeta2}`,
						`${req.body.orientacion}`,
						`${req.body.color}`,
						`${req.body.tags}`,
						`basica`,
						`${lugar}`,
						`${Url}${ext1}`,
						`${repositorio}`,
					];

					pool.query(query[3]).catch((e) => console.error(e.stack));
				} catch (err) {
					console.log(err.stack);
				}

				res.redirect('/inicio');
			} else {
				await fs.unlink(`src/public/img/subidas/${req.files[0].filename}`);
				await fs.unlink(`src/public/img/subidas/${req.files[1].filename}`);
				req.flash('mensaje', 'El archivo 2 tiene que ser PSD, ZiP o RAR.');
				res.redirect('/inicio');
			}
		} else {
			await fs.unlink(`src/public/img/subidas/${req.files[0].filename}`);
			await fs.unlink(`src/public/img/subidas/${req.files[1].filename}`);
			req.flash('mensaje', 'El archivo 1 tiene que ser JPG,PNG o JPEG.');
			res.redirect('/inicio');
		}
	} else if (req.files.length == 1) {
		const ext = path.extname(req.files[0].originalname).toLowerCase();
		if (ext == '.jpg' || '.png' || '.jpeg') {
			const imgUrl = await randonSerial();
			const image = req.files[0];
			var carpeta = '';
			const imageTempPath = req.files[0].path;

			if (ext == '.jpg') {
				carpeta = 'jpg';
			} else if (ext == '.png') {
				carpeta = 'png';
			} else if (ext == '.psd') {
				carpeta = 'psd';
			} else if (ext == '.jpeg') {
				carpeta = 'jpeg';
			}

			var Inicio_imgUrl = '';
			try {
				const res = await pool.query(query[4]);

				if (!res.rows.length) {
					Inicio_imgUrl = '1';
				} else {
					Inicio_imgUrl = res.rows.length + 1;
				}

				var Url = `${Inicio_imgUrl}_${imgUrl}`;

				const targetPath = await path.resolve(
					`src/public/img/${carpeta}/${Url}${ext}`
				);
				const lugar = `${carpeta}/${Url}${ext}`;
				const newName = `${Url}${ext}`;

				await fs.rename(imageTempPath, targetPath);

				await agregar_mensajes_Json(newName);

				await agregar_images_Json(carpeta, lugar, newName);

				await agregar_gustas_Json(newName);

				await agregarTags(req, lugar, carpeta);

				query[3].values = [
					`${req.body.correo}`,
					`${carpeta}`,
					`${req.body.orientacion}`,
					`${req.body.color}`,
					`${req.body.tags}`,
					`${req.body.type}`,
					`${lugar}`,
					`${Url}${ext}`,
					`${image.originalname}`,
				];

				pool.query(query[3]).catch((e) => console.error(e.stack));
			} catch (err) {
				console.log(err.stack);
			}
			res.redirect('/inicio');
		} else {
			await fs.unlink(`src/public/img/subidas/${req.files[0].filename}`);
			req.flash('mensaje', 'El archivo tiene que ser jpg,png o jpe.');
			res.redirect('/inicio');
		}
	}
};

module.exports = imgCtrol;
