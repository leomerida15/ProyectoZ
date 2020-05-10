// alert('hola');

(dat = async () => {
	const dataTags = await fetch('/data', { method: 'post' });
	const data = await dataTags.json();

	const dataComp = {};

	await data.forEach(async (dato) => {
		Object.defineProperty(dataComp, dato.tag, {
			value: null,
			writable: true,
			enumerable: true,
			configurable: true,
		});
	});

	$(document).ready(function () {
		$('.chips').material_chip();
		$('.chips-initial').material_chip({
			data: [
				{
					tag: 'Apple',
				},
				{
					tag: 'Microsoft',
				},
				{
					tag: 'Google',
				},
			],
		});
		$('.chips-placeholder').material_chip({
			placeholder: 'Enter a tag',
			secondaryPlaceholder: '+Tag',
		});
		$('.chips-autocomplete').material_chip({
			autocompleteOptions: {
				data: dataComp,
				limit: Infinity,
				minLength: 1,
			},
		});
	});
	$(document).ready(function () {
		$('input.autocomplete').autocomplete({
			data: dataComp,
			limit: Infinity, // The max amount of results that can be shown at once. Default: Infinity.
			onAutocomplete: function (val) {
				// Callback function when value is autcompleted.
			},
			minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
		});
	});
})();

$(document).ready(function () {
	$('ul.tabs').tabs();
});

$(document).ready(function () {
	$('.modal').modal();
});

$(document).ready(function () {
	$('.tooltipped').tooltip({ delay: 50 });
});
$(document).ready(function () {
	$('.button-collapse').sideNav({
		draggable: true,
	});
});

$(document).ready(function () {
	$('select').material_select();
});

$(document).ready(function () {
	$('.collapsible').collapsible();
});
