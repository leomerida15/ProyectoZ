const query = [
	{
		text:
			'INSERT INTO i_fn_usuario(email, username, password, typeUser) VALUES($1, $2, $3, $4)',
		values: '',
	},
	{ text: 'SELECT * from i_fn_usuario' },
	{ text: 'SELECT * from i_fn_usuario where email = $1', values: '' },
	{
		text:
			'INSERT INTO ii_fn_img(code_email,code_format,code_orientation,code_color,code_tag,code_license,route,name,titulo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
		values: '',
	},
	{ text: 'SELECT * from ii_fn_img' },
	{ text: 'SELECT id_serial from ii_fn_img' },
	{
		text: 'SELECT ubicacion from ii_fn_img WHERE code_formato = $1',
		values: ['png'],
	},
	{
		text: 'SELECT ubicacion from ii_fn_img WHERE code_formato = $1',
		values: ['jpg'],
	},
	{
		text: 'SELECT ubicacion from ii_fn_img WHERE code_formato = $1',
		values: ['jpeg'],
	},
	{
		text: 'SELECT ubicacion from ii_fn_img WHERE code_formato = $1',
		values: ['psd'],
	},
	{ text: 'SELECT name , ubicacion , code_formato from ii_fn_img ' },
];

module.exports = query;
