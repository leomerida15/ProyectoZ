const pg = require('pg');
const { Pool } = require('pg');
const query = require('./query');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'imagenes',
	password: '123456',
	port: 5432,
});

module.exports = pool;

const buscar_DOM_log = async () => {
	pool
		.query(query[1])
		.then((res) => console.log(res.rows[0]))
		.catch((e) => console.error(e.stack));
};
// buscar_DOM_log();
// randomNumber();
