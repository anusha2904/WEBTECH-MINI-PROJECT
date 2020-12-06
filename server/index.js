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

	var resultDict = {"Arts":0, "Business":0, "Engineering":0, "Law":0};

	var answers = req.body.quizQuestions;

	_db.collection("quizQuestion").find({}).toArray(function(err, result){

		if(result != null)
		{
			result.forEach(element => {

				if(element.containsAnswer == "true")
				{
					var questionId = element.questionId;
					var answerFromDb = element.answer;
					var answerFromReq = answers[questionId];

					if(answerFromDb == answerFromReq)
					{
						resultDict[element.aptitude] += 1;
					}
					console.log(answerFromDb, answerFromReq);
					console.log(resultDict);
				}

				else
				{
					var questionId = element.questionId;
					var answerFromReq = answers[questionId];
					answerFromReq = parseInt(answerFromReq);

					if(answerFromReq == 1)
					{
						resultDict["Arts"] += 1;
					}
					else if(answerFromReq == 2)
					{
						resultDict["Business"] += 1;
					}
					else if(answerFromReq == 3)
					{
						resultDict["Engineering"] += 1;
					}
					else
					{
						resultDict["Law"] += 1;
					}
					console.log(answerFromReq);
					console.log(resultDict);
				}
				
			});
			var maxKey = Object.keys(resultDict).reduce(function(a, b){ return resultDict[a] > resultDict[b] ? a : b });
			
			var updateQuery = {"username":req.body.username};
			var updateWith = { "$set": {"username":req.body.username, "quizResult":maxKey} };
			const options = { upsert: true };
			_db.collection("quiz").updateOne(updateQuery, updateWith, options);

			var updateQuery1 = {"username":req.body.username};
			var updateWith1 = {"$set":{"username":req.body.username, "hasTakenTest":"true"}};
			const options1 = {upsert: false};
			_db.collection("user").updateOne(updateQuery1, updateWith1, options1);

			res.send({"response":maxKey});
		}
	});
});

app.post('/getQuizQuestions', (req, res) => {
  
	console.log(req.body);

	var questions = [];
	var index = parseInt(req.body.questionIndex);
	var questionIndex = index + (index - 1);

	var query = {"questionId": { "$in" : [questionIndex.toString(),(questionIndex+1).toString()] }};

	_db.collection("quizQuestion").find(query).toArray(function(err, result) {

		if(result != null)
		{
			result.forEach(element => {
				var questionDetails = {"questionId": element.questionId, "questionText": element.questionText,
				"option1":element.options[0], "option2":element.options[1], "option3":element.options[2], 
				"option4":element.options[3], "choice":element.selectedChoice};
				questions.push(questionDetails);
			});
			res.send({"questions":questions});
		}

	});

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