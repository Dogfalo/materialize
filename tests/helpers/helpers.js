function setupPage(pageName) {
	return $.ajax('/tests/pages/' + pageName + '.html',{
		async: false
	}).then(function (html) {
		document.getElementById('materialize-testing-container').innerHTML = html;
	});
}

window.setupPage = setupPage;