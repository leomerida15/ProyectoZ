const busquedas = {};
const { tags_search_Json } = require('../json.Query');

busquedas.buscar = async (req, res) => {
	try {
		var tags = await tags_search_Json();
		var search = req.body.search.split(' ').concat(req.body.search);
		var resul = [];

		var formatos = req.body.formatos.split(',');
		var orientacion = req.body.orientacion.split(',');
		var tipos = req.body.tipos.split(',');
		var colores = req.body.colores.split(',');
		var cheq = 0;
		search.forEach((isearch) => {
			for (let iTags = 0; iTags <= tags.length - 1; iTags++) {
				if (isearch === tags[iTags].tag) {
					tags[iTags].data.forEach((itemBusq) => {
						if (
							formatos.includes(itemBusq.fotmat) &&
							tipos.includes(itemBusq.type) &&
							orientacion.includes(itemBusq.orientacion) &&
							colores.includes(itemBusq.color)
						) {
							resul.push({ lugar: itemBusq.lugar, id: itemBusq.name, lvl: 4 });
							cheq = cheq + 1;
						} else if (
							formatos.includes(itemBusq.fotmat) &&
							tipos.includes(itemBusq.type) &&
							orientacion.includes(itemBusq.orientacion)
						) {
							resul.push({ lugar: itemBusq.lugar, id: itemBusq.name, lvl: 3 });
							cheq = cheq + 1;
						} else if (
							formatos.includes(itemBusq.fotmat) &&
							tipos.includes(itemBusq.type)
						) {
							resul.push({ lugar: itemBusq.lugar, id: itemBusq.name, lvl: 2 });
							cheq = cheq + 1;
						} else {
							resul.push({ lugar: itemBusq.lugar, id: itemBusq.name, lvl: 1 });
							cheq = cheq + 1;
						}
					});
				}
			}
		});
		if (resul == 0) {
			res.json(['err']);
		} else {
			res.json(resul);
		}
	} catch (error) {}
};

module.exports = busquedas;
