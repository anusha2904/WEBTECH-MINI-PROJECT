const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 5000;
const {MongoClient, ResumeToken} = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
var _db;

client.connect(function(err, db) {
  console.log("Connected successfully to server");

  _db = db.db("quiz-app");

  //client.close();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//Login
app.post('/login', (req, res) => {
  
	console.log(req.body);

	_db.collection("user").findOne({"username":req.body.username}, function(err, result) {

		if(result != null)
		{
			if(req.body.password == result.password)
			{
				res.send({"login":"true"});
			}
			else
			{
				res.send({"login":"false"});
			}
		}

	});
});

//Check if user has taken test
app.post('/checkHasTakenTest', (req, res) => {

	_db.collection("user").findOne({"username":req.body.username}, function(err, result) {

		if(result != null)
		{
			if(result.hasTakenTest == "true")
			{
				res.send({"hasTakenTest":"true"});
			}
			else
			{
				res.send({"hasTakenTest":"false"});
			}
		}
	});
});

app.post('/signup', (req, res) => {
  
	console.log(req.body);

	_db.collection("user").insert({"username":req.body.username, "password":req.body.password}, function(err, result) {

		if(result != null)
		{
			res.send({"signup":"true"});
		}

	});
});

app.post('/profile', (req, res) => {
  
	console.log(req.body);
	var myquery = { username: req.body.username };
	var newvalues = { $set: {math:req.body.math, chem:req.body.chem, phy:req.body.phy, cetRank:req.body.cetRank} };
	_db.collection("user").updateOne(myquery, newvalues, function(err, result)	
		 {
			console.log(result);
			console.log(err);
			if(result != null)
			{
				res.send({"profile":"true"});
			}
	
		});
	
});

app.post('/getQuizResult', (req, res) => {
  
	_db.collection("quiz").findOne({"username":req.body.username}, function(err, result) {

		if(result != null)
		{
			res.send({"hasQuizResult":"true", "quizResult":result.quizResult});
		}
		else
		{
			res.send({"hasQuizResult":"false"});
		}

	});
	
});

app.post('/submitQuiz', (req, res) => {
  
	console.log(req.body);

	// _db.collection("user").insert({"username":req.body.username, "password":req.body.password}, function(err, result) {

	// 	if(result != null)
	// 	{
	// 		res.send({"signup":"true"});
	// 	}

	// });
});

app.post('/suggestion', (req, res) => {
  
	console.log("hi"); 
	console.log(req.body);
	const myquery = {"courseOffered" : req.body.courseOffered}; 
	

	_db.collection("colleges").find(myquery).toArray(function(err, result) {

		if(result != null)
		{
			console.log(result);
			res.send({"colleges":result});
		}

	});
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));