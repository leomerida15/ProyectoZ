const pagos = {};
const pool = require('../database');
const query = require('../query');

// env
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
// Stripe
const stripe = require('stripe')(STRIPE_SECRET_KEY);

pagos.Membresia = async (req, res) => {
	try {
		// console.log(req.body);
		var { stripeEmail, stripeToken } = req.body;
		const customer = await stripe.customers.create({
			email: stripeEmail,
			source: stripeToken,
		});
		const charge = await stripe.charges.create({
			amount: '3000',
			description: 'Membresia',
			currency: 'usd',
			customer: customer.id,
		});
		// Save this charge in your database

		query[11].values = [charge.id, charge.amount / 100, stripeEmail];
		let res = await pool.query(query[11]);
		query[12].values = ['premium', stripeEmail];
		await pool.query(query[12]);
	} catch (err) {
		console.log(err);
	}
	// Finally Show a Success View
	res.redirect('/inicio');
};

module.exports = pagos;
