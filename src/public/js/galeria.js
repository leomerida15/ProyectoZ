(async function img() {
	const img = await fetch('/api/img');
	const imgJsonS = await img.json();
	// console.log(imgJson[0].name);
	// alert('hola');
	var imagenes = imgJsonS;
	for (var i = 0; i <= 30; i++) {
		var aleatorio = Math.round(Math.random() * (imgJsonS.length - 1));

		cuerpo.innerHTML += `
        <div class="col s12 m4 l3">
            <div class="material-placeholder">
                <a class="waves-effect waves-light modal-trigger" href="#${imagenes[aleatorio].name}">
                  <img src="img/${imagenes[aleatorio].ubicacion}" class="responsive-img " alt="" />
                </a>
            </div>
		</div>
		
		
		`;
	}

	// console.log(imagen);
})();
