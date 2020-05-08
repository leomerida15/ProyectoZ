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
		if (formatos.indexOf('PNG') == -1) {
			formatos.push('PNG');
		}
	})
);
var PSD = document.getElementById('PSD').addEventListener(
	'click',
	(PSD = () => {
		if (formatos.indexOf('PSD') == -1) {
			formatos.push('PSD');
		}
	})
);
var JPEG = document.getElementById('JPEG').addEventListener(
	'click',
	(JPEG = () => {
		if (formatos.indexOf('JPEG') == -1) {
			formatos.push('JPEG');
		}
	})
);
var JPG = document.getElementById('JPG').addEventListener(
	'click',
	(JPG = () => {
		if (formatos.indexOf('JPG') == -1) {
			formatos.push('JPG');
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
		if (tipos.indexOf('Gratis') == -1) {
			tipos.push('Gratis');
		}
	})
);

buscar.addEventListener(
	'submit',
	(busqueda = async (e) => {
		e.preventDefault();

		var data = new FormData(buscar);

		var search = data.get('search');

		var cheq = 0;

		var search1 = await search.split(',');

		if (search1.length > 1) {
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

			cuerpo.innerHTML = `
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

			const resul = await fetch('/buscar', {
				method: 'post',
				body: datos,
			});
		}
	})
);
