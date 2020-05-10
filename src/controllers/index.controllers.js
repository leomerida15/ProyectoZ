const indexCtrl = {};
const {
	select_Json,
	select_images_Json,
	select_gustas_Json,
	renderCarpetas,
} = require('../json.Query');

indexCtrl.renderIndex = async (req, res) => {
	let list = await select_Json();
	let coments = await select_images_Json();

	let gusta = await select_gustas_Json();
	var images = [];
	for (let j = 0; j <= list.length - 1; j++) {
		// console.log(coments[j].name, '   ', list[j].name);

		let datos = await list[j].datos;
		await datos.reverse();

		images[j] = await {
			name: coments[j].name,
			ubicacion: coments[j].ubicacion,
			code_formato: coments[j].code_formato,
			type: coments[j].type,
			titulo: coments[j].Titulo,
			datos,
			si: gusta[j].si,
			no: gusta[j].no,
		};
		// console.log(images[j]);
	}
	const colores = [
		{ text: 'azul' },
		{ text: 'rojo' },
		{ text: 'amarillo' },
		{ text: 'rosado' },
		{ text: 'púrpura' },
		{ text: 'purpura_profundo' },
		{ text: 'índigo' },
		{ text: 'cian' },
		{ text: 'verde' },
		{ text: 'verde_profundo' },
		{ text: 'ámbar' },
		{ text: 'naranja' },
		{ text: 'naranja_profundo' },
		{ text: 'marrón' },
		{ text: 'gris' },
		{ text: 'blanco' },
		{ text: 'negro' },
	];

	// console.log('hola');

	res.render('index', { images, colores });
};

indexCtrl.inicio = async (req, res) => {
	let list = await select_Json();
	let coments = await select_images_Json();
	let gusta = select_gustas_Json();
	var images = [];

	for (let j = 0; j <= list.length - 1; j++) {
		let datos = await list[j].datos;

		await datos.reverse();

		images[j] = await {
			name: coments[j].name,
			ubicacion: coments[j].ubicacion,
			code_formato: coments[j].code_formato,
			type: coments[j].type,
			titulo: coments[j].Titulo,
			datos,
			si: gusta[j].si,
			no: gusta[j].no,
		};

		// console.log(j);
	}
	const colores = [
		{ text: 'azul' },
		{ text: 'rojo' },
		{ text: 'amarillo' },
		{ text: 'rosado' },
		{ text: 'púrpura' },
		{ text: 'purpura_profundo' },
		{ text: 'índigo' },
		{ text: 'cian' },
		{ text: 'verde' },
		{ text: 'verde_profundo' },
		{ text: 'ámbar' },
		{ text: 'naranja' },
		{ text: 'naranja_profundo' },
		{ text: 'marrón' },
		{ text: 'gris' },
		{ text: 'blanco' },
		{ text: 'negro' },
	];
	// console.log(images);

	res.render('index-log', { images, colores });
};

indexCtrl.salir = (req, res) => {
	req.logOut();
	res.redirect('/');
};

module.exports = indexCtrl;
