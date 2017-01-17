var app = require('express')();
var http = require('http').Server(app);

var mysql = require('mysql');
// IMPORTS MYSQL 

var connection = function(){
	return mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		port     : '/Applications/MAMP/tmp/mysql/mysql.sock',
		database : 'exo'
	})
}; // TURN IT INTO VAR CAUSE USED MULTIPLE TIMES

var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))


// Pages Routes
app.get('/', function(req, res){
res.sendFile(__dirname + '/tmpl/index.html');
});
app.use(‘/js’, express.static(‘assets/js’));
app.use(‘/css’, express.static(‘assets/css’));

// API Routes
app.get('/api/voter', function(req, res){

	var _c = connection(),
		_q = 'SELECT * FROM user';
		
	_q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id : '';
    
	_c.connect();
	_c.query(_q, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
	});
	_c.end();


});

app.get('/api/positions', function(req, res){

	var _c = connection(),
		_q = 'SELECT * FROM positions';
	
	_c.connect();
	_c.query(_q, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
	});
	_c.end();

});


app.post('/api/voter', function(req,res){
    
    var _body = req.body;
    
    console.log(_body);    
    
    var _c = connection(),
        _q = "INSERT INTO user (firstname,lastname,age) VALUES ('"+_body.firstname+"', "+_body.lastname+"','"+_body.age+"');"
    console.log(_q);
    _c.connect();
	_c.query(_q, function(err, rows, fields) {
	  if (err) res.status(500).send(err);
	  res.status(201).send({status:'success'});
	});
	_c.end();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});