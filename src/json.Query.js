const fs = require('fs');

const jsonQuery = {};

const ruta_mensajes = 'src/json/mensajes.json';
const json_mensajes = fs.readFileSync(ruta_mensajes, 'utf-8');
const list_mensajes = JSON.parse(json_mensajes);

jsonQuery.agregar_mensajes_Json = (newName) => {
	var mensajes = list_mensajes;
	mensajes.push({ name: newName, datos: [] });
	// console.log(mensajes);

	var json_mensajes_new = JSON.stringify(mensajes);
	fs.writeFileSync(ruta_mensajes, json_mensajes_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
};
jsonQuery.ComentarioJson = (req) => {
	var lugar = 0;
	for (let i = 0; i <= list_mensajes.length - 1; i++) {
		if (list_mensajes[i].name == req.body.name_img) {
			list_mensajes[i].datos.push({
				usuario: req.body.usuario_mensaje,
				mensaje: req.body.contenido_mensaje,
			});
			lugar = i;
			i = list_mensajes.length - 1;
		}
	}

	const json_new = JSON.stringify(list_mensajes);
	fs.writeFile(ruta_mensajes, json_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
	return list_mensajes[lugar].datos;
};
jsonQuery.ComentInicioJson = (req) => {
	// var lugar = 0;
	for (let i = 0; i <= list.length - 1; i++) {
		if (list[i].name == req.body.name_img_mensajes) {
			var envio = list[i].datos;

			i = list.length - 1;
		}
	}

	return envio;
};
jsonQuery.select_Json = () => {
	return list_mensajes;
};

const ruta_images = 'src/json/images.json';
const json_images = fs.readFileSync(ruta_images, 'utf-8');
const list_images = JSON.parse(json_images);

jsonQuery.agregar_images_Json = (carpeta, lugar, newName) => {
	var images = list_images;
	images.contenido.push({
		name: newName,
		ubicacion: lugar,
		code_formato: carpeta,
	});

	// console.log(images.carpeta);

	if (carpeta == 'jpg') {
		images.jpg.push({ name: newName, ubicacion: lugar, code_formato: carpeta });
	} else if (carpeta == 'png') {
		images.png.push({ name: newName, ubicacion: lugar, code_formato: carpeta });
	} else if (carpeta == 'psd') {
		images.psd.push({ name: newName, ubicacion: lugar, code_formato: carpeta });
	} else if (carpeta == 'jpeg') {
		images.jpeg.push({
			name: newName,
			ubicacion: lugar,
			code_formato: carpeta,
		});
	}

	// console.log(images);

	var json_images_new = JSON.stringify(images);
	fs.writeFileSync(ruta_images, json_images_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
};

jsonQuery.select_images_Json = () => {
	return list_images.contenido;
};
jsonQuery.select_images_inicio_Json = () => {
	return list_images;
};

const ruta_gustas = 'src/json/gustas.json';
const json_gustas = fs.readFileSync(ruta_gustas, 'utf-8');
const list_gustas = JSON.parse(json_gustas);

jsonQuery.agregar_gustas_Json = (newName) => {
	var gustas = list_gustas;
	gustas.push({ name: newName, si: 0, no: 0, datos: [] });
	// console.log(gustas);

	var json_gustas_new = JSON.stringify(gustas);
	fs.writeFileSync(ruta_gustas, json_gustas_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
};

jsonQuery.new_gustas_Json = (req) => {
	var gustas = list_gustas;
	var lugar = 0;

	for (let i = 0; i <= gustas.length - 1; i++) {
		if (gustas[i].name == req.body.name_gusta) {
			let datos = gustas[i].datos;
			// console.log(datos.length);

			if (req.body.gusta == 'si') {
				if (datos.length == 0) {
					gustas[i].datos.push({
						usuario: req.body.usuario_gusta,
						gusta: req.body.gusta,
					});
				} else {
					for (let j = 0; j <= datos.length - 1; j++) {
						if (datos[j].usuario == req.body.usuario_gusta) {
							if (datos[j].gusta == 'no') {
								datos[j].gusta = 'si';
								lugar = i;
								if (gustas[i].no > 0) {
									gustas[i].no = gustas[i].no - 1;
								}
								gustas[i].si = gustas[i].si + 1;
								j = datos.length - 1;
							} else if (datos[j].gusta == 'si') {
								j = datos.length - 1;
							}
						}
					}
				}
			} else {
				if (datos.length == 0) {
					gustas[i].datos.push({
						usuario: req.body.usuario_gusta,
						gusta: req.body.gusta,
					});
				} else {
					for (let j = 0; j <= datos.length - 1; j++) {
						if (datos[j].usuario == req.body.usuario_gusta) {
							if (datos[j].gusta == 'si') {
								datos[j].gusta = 'no';
								lugar = i;
								if (gustas[i].si > 0) {
									gustas[i].si = gustas[i].si - 1;
								}
								gustas[i].no = gustas[i].no + 1;
								j = datos.length - 1;
							} else if (datos[j].gusta == 'no') {
								j = datos.length - 1;
							}
						}
					}
				}
			}
		}
	}

	var resp = { si: gustas[lugar].si, no: gustas[lugar].no };

	// console.log(resp);

	var json_gusta_new = JSON.stringify(gustas);
	fs.writeFileSync(ruta_gustas, json_gusta_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});

	return resp;
};

jsonQuery.select_gustas_Json = () => {
	return list_gustas;
};

const rutaTags = 'src/json/tags.json';
const json_tags = fs.readFileSync(rutaTags, 'utf-8');
const list_tags = JSON.parse(json_tags);

jsonQuery.tagsJson = () => {
	return list_tags.tags_existentes;
};

jsonQuery.tags_search_Json = () => {
	return list_tags.for_tag;
};

jsonQuery.agregarTags = async (req, lugar, fotmat) => {
	var cadenaADividir = req.body.tags;
	const newTags = await cadenaADividir.split(',');

	newTags.push(req.body.Titulo);

	var referencia = newTags;

	referencia.forEach((item) => {
		let indices = [];
		var idx = newTags.indexOf(item);
		while (idx != -1) {
			indices.push(idx);
			idx = newTags.indexOf(item, idx + 1);
		}
		if (indices.length > 1) {
			for (let index = 1; index < indices.length; index++) {
				newTags.splice(index, 1);
			}
		}
	});

	for (tag of newTags) {
		let cheq = 0;

		for (let i = 0; i <= list_tags.tags_existentes.length - 1; i++) {
			if (tag == list_tags.tags_existentes[i].tag) {
				for (let j = 0; j <= list_tags.for_tag.length - 1; j++) {
					if (tag == list_tags.for_tag[j].tag) {
						list_tags.for_tag[j].data.push({
							lugar: lugar,
							fotmat: fotmat,
							color: req.body.color,
							orientacion: req.body.orientacion,
						});
						j = list_tags.for_tag.length - 1;
					}
				}
				cheq = 1;
				i = list_tags.tags_existentes.length - 1;
			}
		}
		if (cheq == 0) {
			list_tags.tags_existentes.push({ tag: tag });
		}

		if (cheq == 0) {
			list_tags.for_tag.push({
				tag: tag,
				data: [
					{
						lugar: lugar,
						fotmat: fotmat,
						color: req.body.color,
						orientacion: req.body.orientacion,
					},
				],
			});
		}
	}

	var json_tags_new = JSON.stringify(list_tags);
	fs.writeFileSync(rutaTags, json_tags_new, 'utf-8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
};

const rutaType = 'src/json/type.json';
const json_Type = fs.readFileSync(rutaType, 'utf-8');
const list_Type = JSON.parse(json_Type);

jsonQuery.agregarType = async (lugar, type, orientacion) => {
	console.log(list_Type);

	if (type == 'gratis') {
		if (orientacion == 'Horizontal') {
			list_Type.gratis.horizontal.push(lugar);
		} else {
			list_Type.gratis.vertical.push(lugar);
		}
	} else {
		if (orientacion == 'Horizontal') {
			list_Type.premiun.horizontal.push(lugar);
		} else {
			list_Type.premiun.vertical.push(lugar);
		}
	}

	var json_type_new = JSON.stringify(list_Type);
	fs.writeFileSync(rutaType, json_type_new, 'utf-8', (err) => {
		if (err) {
			return console.log(err);
		}
	});
};

const rutacolor = 'src/json/color.json';
const json_color = fs.readFileSync(rutacolor, 'utf-8');
const list_color = JSON.parse(json_color);

jsonQuery.agregarColor = async (lugar, newColor) => {
	if (newColor == 'marrón') {
		color_a_guardar = 'marron';
	} else if (newColor == 'índigo') {
		color_a_guardar = 'indigo';
	} else if (newColor == 'ámbar') {
		color_a_guardar = 'ambar';
	} else {
		color_a_guardar = newColor;
	}

	for (let i = 0; i <= list_color.length - 1; i++) {
		if (color_a_guardar == list_color[i].color) {
			list_color[i].datos.push(lugar);
		}
	}

	var json_color_new = JSON.stringify(list_color);
	fs.writeFileSync(rutacolor, json_color_new, 'utf-8', (err) => {
		if (err) {
			return console.log(err);
		}
	});
};

module.exports = jsonQuery;
