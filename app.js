//ALL THE VARS /o/
var express = require('express');
var app = express();

var http = require('http').Server(app);
var mysql = require('mysql');

var connection = function(){
	return mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		port     : '/Applications/MAMP/tmp/mysql/mysql.sock',
		database : 'exo'
	})
}; 
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));

// PAGE ROUTES

app.get('/', function(req, res){
    res.sendFile(__dirname + '/tmpl/index.html'); 
});
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/tmpl/admin.html');
});

app.use('/js', express.static('assets/js'));
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));

//API ROUTES

// VOTER REGISTRATION INTO THE DB + Maybe see option of using some form of Student ID
app.post('/api/voter', function(req,res){
    
    var _body = req.body;
    
    console.log(_body);    
    
    var _c = connection(),
        _q = "INSERT INTO voter (firstname,lastname,age,mail) VALUES ('"+_body.firstname+"', '"+_body.lastname+"','"+_body.age+"','"+_body.mail+"');"
    console.log(_q);
    _c.connect();
	_c.query(_q, function(err, rows, fields) {
      if (err) res.status(500).send(err);
        
        
	  res.status(201).send({status:'success', id: rows.insertId, });
        //res.json([statusCode, ] data);
        
        
	});
	_c.end();
});



// ADMIN PAGE - INSERT CANDIDATE INTO DB CANDIDATES

app.post('/api/candidate', function(req,res){
    
    var _body = req.body;
    
    console.log(_body);    
    
    var _c = connection(),
        _q = "INSERT INTO candidate (firstname,lastname) VALUES ('"+_body.firstname+"', '"+_body.lastname+"');"
    console.log(_q);
    _c.connect();
	_c.query(_q, function(err, rows, fields) {
      if (err) res.status(500).send(err);
	  res.status(201).send({status:'success'});
	});
	_c.end();
});

app.get('/api/candidate', function(req, res){

	var _c = connection(),
		_q = 'SELECT * FROM candidate';
	
	_c.connect();
	_c.query(_q, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(rows);
	});
	_c.end();

});

// REGISTER THE VOTE

app.post('/api/vote', function(req,res){  
     
    var voterid = $('#userId').val(),  // HOW TO GET THE VOTER ID BACK
        candidateid = $('input[name=radioName]:checked').val(), // HOW TO GET THE CANDIDATE ID BACK
        _c = connection(),
        _q = "INSERT INTO votes (voter,candidate) VALUES ('"+ voterid +"', '"+ candidateid+"');";
    console.log(_q);
    _c.connect();
	_c.query(_q, function(err, rows, fields) {
      if (err) res.status(500).send(err);
        console.log(rows);
	  res.status(201).send({status:'success', id: rows.insertId, });
        //res.json([statusCode, ] data);
            
	});
	_c.end();

});




// FIRST GET THE IDS FROM THE VOTERS 
// GET THE IDS FOR CANDIDATES
// LINK THE TWO







http.listen(3000, function(){
  console.log('listening on *:3000');
});
