const serial = {};
const pool = require('../database');
const query = require('../query');

// console.log('hola');

serial.randonSerial = async () => {
	const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

	var randomNumber = { serial_1: '', RN_1: '', RN_2: '' };
	let serial_code = '';

	for (let i = 0; i < 6; i++) {
		randomNumber.RN_1 += possible.charAt(Math.floor(Math.random() * possible.length));
		randomNumber.RN_2 += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	serial_code = `${randomNumber.RN_1}_${randomNumber.RN_2}`;

	return serial_code;
};

module.exports = serial;
