var express = require('express');
var app = express();
var fs = require('fs');

var server = app.listen(3000, () => {
	console.log("Listening. . . ");
})

var data = fs.readFileSync('words.json');
var words= JSON.parse(data);
console.log(words);

app.use(express.static('public'));

app.get('/search/:word/:score', addWord);
function addWord(req, res){
	var data = req.params;
	var word = data.word;
	var score = data.score;
	words[word] = score;
	var data = JSON.stringify(words, null, 2);
	fs.writeFile('words.json', data, finished);
	function finished(err){
		console.log('all set.');
	}
	var reply = {
		msg: "Thank you for your word"
	}
	res.send(reply);
}

app.get('/all', sendAll);
function sendAll(req, res){
	res.send(words);
}

app.get('/search/:word/', searchWord);
function searchWord(req, res){
	var word = req.params.word;
	var reply;
	console.log('searching');
	if (words[word]){
		reply = {
		status: "found",
		word: word,
		score: words[word],
		}
	} else {
		reply = {
			status: "not found",
			word: word
		}
	}
	res.send(reply);
}