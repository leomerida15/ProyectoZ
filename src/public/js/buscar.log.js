var buscar = document.getElementById('buscar_nolog');
// var search = document.getElementById('Busqueda');

var colores = [];
var formatos = [];
var tipos = [];
var orientacion = [];

var Vertical = document.getElementById('Vertical').addEventListener(
	'click',
	(Vertical = () => {
		if (orientacion.indexOf('Vertical') == -1) {
			orientacion.push('Vertical');
		}
	})
);
var Horizontal = document.getElementById('Horizontal').addEventListener(
	'click',
	(Horizontal = () => {
		if (orientacion.indexOf('Horizontal') == -1) {
			orientacion.push('Horizontal');
		}
	})
);

var PNG = document.getElementById('PNG').addEventListener(
	'click',
	(PNG = () => {
		if (formatos.indexOf('png') == -1) {
			formatos.push('png');
		}
	})
);
var PSD = document.getElementById('PSD').addEventListener(
	'click',
	(PSD = () => {
		if (formatos.indexOf('psd') == -1) {
			formatos.push('psd');
		}
	})
);
var JPEG = document.getElementById('JPEG').addEventListener(
	'click',
	(JPEG = () => {
		if (formatos.indexOf('jpeg') == -1) {
			formatos.push('jpeg');
		}
	})
);
var JPG = document.getElementById('JPG').addEventListener(
	'click',
	(JPG = () => {
		if (formatos.indexOf('jpg') == -1) {
			formatos.push('jpg');
		}
	})
);

var premium = document.getElementById('premium').addEventListener(
	'click',
	(premium = () => {
		if (tipos.indexOf('premium') == -1) {
			tipos.push('premium');
		}
	})
);
var Gratis = document.getElementById('Gratis').addEventListener(
	'click',
	(Gratis = () => {
		if (tipos.indexOf('gratis') == -1) {
			tipos.push('gratis');
		}
	})
);

buscar.addEventListener(
	'submit',
	(busqueda = async (e) => {
		e.preventDefault();

		var data = new FormData(buscar);

		var search = data.get('search');

		var cheq = await search.split(',');

		if (cheq.length > 1) {
			alert('Diculpe no puede colocar comas ,');
		} else {
			var datos = new URLSearchParams({
				search,
				colores,
				formatos,
				tipos,
				orientacion,
			});

			buscar.reset();

			$('.button-collapse').sideNav('hide');

			cuerpo1.innerHTML = `
				<div class='center-align '>
					<div class="preloader-wrapper big active center-align">
						<div class="spinner-layer spinner-blue">
						  <div class="circle-clipper left">
							<div class="circle"></div>
						  </div><div class="gap-patch">
							<div class="circle"></div>
						  </div><div class="circle-clipper right">
							<div class="circle"></div>
						  </div>
						</div>

						<div class="spinner-layer spinner-red">
						  <div class="circle-clipper left">
							<div class="circle"></div>
						  </div><div class="gap-patch">
							<div class="circle"></div>
						  </div><div class="circle-clipper right">
							<div class="circle"></div>
						  </div>
						</div>

						<div class="spinner-layer spinner-yellow">
						  <div class="circle-clipper left">
							<div class="circle"></div>
						  </div><div class="gap-patch">
							<div class="circle"></div>
						  </div><div class="circle-clipper right">
							<div class="circle"></div>
						  </div>
						</div>

						<div class="spinner-layer spinner-green">
						  <div class="circle-clipper left">
							<div class="circle"></div>
						  </div><div class="gap-patch">
							<div class="circle"></div>
						  </div><div class="circle-clipper right">
							<div class="circle"></div>
						  </div>
						</div>
					</div>
				</div>
			`;
			muro.innerHTML = `resultado`;
			const resul = await fetch('/buscar', {
				method: 'post',
				body: datos,
			});

			var resp = await resul.json();
			// alert(resp[0]);

			if (resp.includes('err')) {
				cuerpo1.innerHTML = ``;
				cuerpo1.innerHTML += `
					<h4 class="truncate hide-on-small-only">No encontramos lo que esta buscando</h4>
					<h5 class="truncate hide-on-med-and-up">No encontramos lo que busca</h5>
				`;
			} else {
				resp.sort((a, b) => {
					if (a.lvl > b.lvl) {
						return -1;
					}
					if (a.lvl < b.lvl) {
						return 1;
					}

					return 0;
				});
				muro.innerHTML = `resultado`;

				cuerpo1.innerHTML = ``;
				resp.forEach((res) => {
					cuerpo1.innerHTML += `
						<div class="col s12 m4 l3">
							<div class="material-placeholder">
								<a class="waves-effect waves-light modal-trigger" href="#${res.id}">
								<img src="img/${res.lugar}" class="responsive-img " alt="" />
								</a>
							</div>
						</div>
					`;
				});
			}
		}
	})
);
