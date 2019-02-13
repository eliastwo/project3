console.log("connected");

    var myView = '';
    var myDB = '';
    var isPrimary = '';
    var dataType = '';
    var isNell = '';
    var dbName = '';
    var dbLoginName = '';
    var dbLoginPassword = '';
    var t1Name = '';
	
$(document).ready(function() {
    $('#btnClick').click(function(event) {
        myView = ($('#optView option:selected').text());
		myDB = ($('#optDB option:selected').text());
		isPrimary = ($('#isPrimary option:selected').text());
		dataType = ($('#dataType option:selected').text());
		isNell = ($('#isNell option:selected').text());
		dbName = $('#dbName').val();
		dbLoginName = $('#dbLoginName').val();
		dbLoginPassword = $('#dbLoginPassword').val();
		t1Name = $('#t1Name').val();
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