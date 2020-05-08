const peticion = async () => {
	let list = await fetch('http://localhost:3000/api/img-log');
	return list.json();
};

(img = async () => {
	var imagenes = await peticion();

	for (var i = 0; i <= 30; i++) {
		var aleatorio = Math.round(Math.random() * (imagenes.contenido.length - 1));
		cuerpo1.innerHTML += `
			<div class="col s12 m4 l3">
				<div class="material-placeholder">
					<a class="waves-effect waves-light modal-trigger" href="#${imagenes.contenido[aleatorio].name}">
					<img src="img/${imagenes.contenido[aleatorio].ubicacion}" class="responsive-img " alt="" />
					</a>
				</div>
			</div>
		`;
	}

	for (var i = 0; i <= 30; i++) {
		var aleatorio = Math.round(Math.random() * (imagenes.jpg.length - 1));
		cuerpo2.innerHTML += `
			<div class="col s12 m4 l3">
				<div class="material-placeholder">
					<a class="waves-effect waves-light modal-trigger" href="#${imagenes.jpg[aleatorio].name}">
					<img src="img/${imagenes.jpg[aleatorio].ubicacion}" class="responsive-img " alt="" />
					</a>
				</div>
			</div>
		`;
	}
	for (var i = 0; i <= 30; i++) {
		var aleatorio = Math.round(Math.random() * (imagenes.png.length - 1));
		cuerpo3.innerHTML += `
			<div class="col s12 m4 l3">
				<div class="material-placeholder">
					<a class="waves-effect waves-light modal-trigger" href="#${imagenes.png[aleatorio].name}">
					<img src="img/${imagenes.png[aleatorio].ubicacion}" class="responsive-img " alt="" />
					</a>
				</div>
			</div>
		`;
	}
	for (var i = 0; i <= 30; i++) {
		var aleatorio = Math.round(Math.random() * (imagenes.psd.length - 1));
		cuerpo4.innerHTML += `
			<div class="col s12 m4 l3">
				<div class="material-placeholder">
					<a class="waves-effect waves-light modal-trigger" href="#${imagenes.psd[aleatorio].name}">
					<img src="img/${imagenes.psd[aleatorio].ubicacion}" class="responsive-img " alt="" />
					</a>
				</div>
			</div>
		`;
	}
})();

const list = peticion;
