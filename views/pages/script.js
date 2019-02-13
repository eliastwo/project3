console.log("connected");

$(document).ready(function() {
    $('#btnClick').click(function(event) {
        var myView = ($('#optView option:selected').text());
		var myDB = ($('#optDB option:selected').text());
		var isPrimary = ($('#isPrimary option:selected').text());
		var dataType = ($('#dataType option:selected').text());
		var isNell = ($('#isNell option:selected').text());
		var dbName = $('#dbName').val();
		var dbLoginName = $('#dbLoginName').val();
		var dbLoginPassword = $('#dbLoginPassword').val();
		var t1Name = $('#t1Name').val();
		console.log(myView);
		console.log(myDB);
		console.log(dbName);
		console.log(dbLoginName);
		console.log(dbLoginPassword);
		console.log(t1Name);
		console.log(isPrimary);
		console.log(dataType);
		console.log(isNell);
    });
});