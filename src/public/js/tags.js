var inset_tags = document.getElementById('tags');
var newtag = [];
$(document).ready(function () {
	$('.chips').on('chip.add', function (e, chip) {
		let cheq = 0;
		let tags = chip.tag;
		for (let i = 0; i <= tags.length - 1; i++) {
			if (tags.charAt(i) == ',') {
				cheq = 1;
			}
		}
		if (cheq == 0) {
			if (tags.split(' ').concat(tags.search).length == 2) {
				var revision = tags.split(' ');
				newtag.push(revision[0]);
			} else {
				var revision = tags.split(' ').concat(tags);
				revision.forEach((element) => {
					newtag.push(element);
				});
			}

			inset_tags.value = newtag;
		} else {
			alert('las Tags NO pueden llevar , Coma');
		}
	});
	$('.chips').on('chip.delete', function (e, chip) {
		var i = newtag.indexOf(chip.tag);
		if (i !== -1) {
			newtag.splice(i, 1);
		}
	});
});
