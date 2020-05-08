// alert('hola');

const PSD = document.getElementById('PSD').addEventListener('click', PSD_file => {
	file.innerHTML = `	
	
	<div class="btn">
		<span>Archivos</span>
		<input name="subir_img" type="file" multiple/>
	</div>
		<div class="file-path-wrapper">
		<input class="file-path validate" type="text" placeholder="Sus archivos son." />
	</div> 

`;
});

const Otros = document.getElementById('Otros').addEventListener('click', Otros_file => {
	file.innerHTML = `	
	
	<div class="btn">
		<span>Archivos</span>
		<input name="subir_img" type="file" />
	</div>
		<div class="file-path-wrapper">
		<input class="file-path validate" type="text" placeholder="Sus archivos son." />
	</div> 
`;
});
