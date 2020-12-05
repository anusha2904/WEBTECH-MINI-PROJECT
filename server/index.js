const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 5000;
const {MongoClient} = require('mongodb');

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
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))