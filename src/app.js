const app = require('./index');

require('./database');

app.listen(app.get('port'), () => {
	console.log('                                                                  ()_()');
	console.log('app corriendo en el puerto http://localhost:3000 leoM             (o.o)');
	console.log('                                                                  (|_|)*');
});
