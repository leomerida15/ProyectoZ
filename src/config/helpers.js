const helpers = {};
const bcrypt = require('bcrypt');

helpers.encryptPassword = async password => {
	// console.log('hola');
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

helpers.matchPassword = async (password, savePassword) => {
	try {
		return await bcrypt.compare(password, savePassword);
	} catch (e) {
		console.log(e);
	}
};

module.exports = helpers;
