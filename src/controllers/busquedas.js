const busquedas = {};
const { tags_search_Json } = require('../json.Query');

busquedas.buscar = async (req, res) => {
	try {
		var tags = await tags_search_Json();
		var search = req.body.search.split(' ').concat(req.body.search);
		var resul = { resul1: [], resul2: [] };

		var formatos = req.body.formatos.split(',');
		var orientacion = req.body.orientacion.split(',');
		var tipos = req.body.tipos.split(',');
		var colores = req.body.colores.split(',');

		search.forEach((isearch, index) => {
			for (let iTags = 0; iTags <= tags.length - 1; iTags++) {
				if (isearch === tags[iTags].tag) {
					if (
						req.body.formatos ||
						req.body.orientacion ||
						req.body.tipos ||
						req.body.colores != ''
					) {
						tags[iTags].data.forEach((itemBusq) => {
							let index2 = 0;
							if (itemBusq.fotmat == formatos[0] || formatos[1]) {
								resul2[index2] = itemBusq;
							}
						});
					}
					resul.resul1[index] = tags[iTags].name;
					iTags = tags.length - 1;
				}
			}
		});
		console.log(resul1);
	} catch (error) {}
};

module.exports = busquedas;
