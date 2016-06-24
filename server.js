
/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/


var express = require('express');
var parser = require('body-parser').urlencoded({extended : false});
var md5 = require('md5');
var app = express();
var livres = [
    "Le seigneur des anneaux - Livre I",
    "Le seigneur des anneaux - Livre II",
    "Le seigneur des anneaux - Livre III",
    "Le Silmarillon"
];

var mysql      = require('mysql');
var connection = mysql.createConnection({
  // port     : '8080',
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test_table'
});

// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });
// connection.end();


//Définition du dossier public pour charger 
//les fichiers types CSS/JS/IMG...
app.use(express.static(__dirname+'/assets'));

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
})

.get('/home', function(req,res) {
    res.render('home.ejs', {});
})

.get('/portfolio/:numero([1-3])', function (req, res) {
    var portfolioHTML = '<h1>Bibliothèque</h1>';
//        portfolioHTML += '<h2>Bienvenue dans mon Portfolio</h2>';
    var key = req.params.numero;
    
    /*if( key <= livres.length && key!=0) {
        var mon_livre = livres[key-1];
        portfolioHTML += '<h3>En ce moment je lis '+mon_livre+'</h3>'
    } else {
        portfolioHTML += '<h3>Ceci n\'est pas mon portfolio</h3>'
    }    */
//  res.send(portfolioHTML);
    
    res.render('portfolio.ejs',{
        livre_en_cours : livres[key-1],
        mes_livres : livres
        //pour faire passer les variables dans le html
    });
})

.get('/createUser', function (req,res){
  res.render('createUser.ejs', {});
})

.get('/viewUsers', function(req,res){
  res.render(viewUsers.ejs,{});
})


.post('/createUser', parser, function(req, res) {
  var username = req.body.username;
  var mail = req.body.mail;
  var password = md5 (req.body.password);
  var strquery = "INSERT INTO users VALUES (0,'"+username+"','"+password+"','"+mail+"')";
  // var strquery = "SELECT * from users";
  res.send('success')

  connection.query(strquery, function(err,rows,fields){
    if (err) throw err;
    res.redirect('/home');
  });
  // connection.end(); apparemment cette commande ne peut etre invoquée une seul fois par fichier
});

app.use(function(req, res, next) {
    res.status(404).send('This fucking page does not exist, code it yourself !');
});

app.listen(8181, function () {
  console.log('Example app listening on port', this.address().port);
});
