module.exports = {
	isloggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.redirect('/');
		}
	},
	isnologgedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			return res.redirect('/inicio');
		}
	}
};
