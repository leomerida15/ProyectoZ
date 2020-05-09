// alert('hola');

document.getElementById('PSD_file').addEventListener('click', () => {
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

document.getElementById('Otros_file').addEventListener('click', () => {
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
