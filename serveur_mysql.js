var express = require('express');
var bodyParser = require('body-parser');
var md5 = require('md5');

var app=express();
app.use(bodyParser());

var port = 4545;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '8080',
  user     : 'root',
  password : 'root',
  database : 'test_table'
});

app.get('/compte',function(req,res){
	res.render('compte.ejs');/*page issue du view*/
});

app.post('/compte',function(req,res){

	var myName = req.body.name;
	var myPassword = md5(req.body.password);
	var myMail = req.body.mail;
    var myRequest ='INSERT INTO user(name, password, mail) VALUES ("'+myName+'","'+myPassword+'","'+myMail+'")';
	var query = connection.query(myRequest, function(err, rows, fields) {
		if (err) throw err;
		res.redirect('/viewusers');
	});
	
});



app.get('/viewusers',function(req,res){

	
	connection.query('SELECT * FROM users', function(err, rows, fields) {
	if (err) throw err;
	res.render('viewusers.ejs',{userlist:rows});
	});

});




//définition du dossier de travail
app.use(express.static(__dirname + '/assets/'));


/*Gestion de l'erreur 404*/
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(port,function(){
	console.log('Server listening on port '+port);
});