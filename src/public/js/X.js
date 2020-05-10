function xrespuesta() {
	respuesta.innerHTML = '';
}
document.getElementById('logo').addEventListener('click', async () => {
	// alert('hola');
	let list = await fetch('/api/img-log');
	let imagenes = await list.json();
	muro.innerHTML = `inicio`;
	cuerpo1.innerHTML = ``;
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
});
