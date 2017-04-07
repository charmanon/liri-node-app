var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var fs = require("fs");

var omdb = require('omdb');

//Requires user keys from Twitter to call API
var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

//Prints out latest twenty tweets of user
function callTwitter(){ 
	var params = {screen_name: 'char_m_anon'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < 20; i++){
		  	console.log("Tweeted on "+tweets[i].created_at+ ":");
		    console.log(tweets[i].text);    
	  		console.log("--------------------------");
	  		//Saves the data in log.txt
	  		fs.appendFile("log.txt", "Tweeted on "+tweets[i].created_at+ ": \n" + tweets[i].text + "\n" + "-------------------------- \n");
		}
	  }
	  else console.log('Error occured: ' + error);
	});
}

//Looks for songs that user searches for
function callSpotify(song){
	spotify.search({ type: 'track' , query: song }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 	else {
	 		//Goes through the data from API and picks properties we want
	 		var artist = "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2);
	 		var album = "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2);
	 		var track = "Track name: " + JSON.stringify(data.tracks.items[0].name, null, 2);
	 		var url = "Spotify preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2);
	 		console.log(artist);
	 		console.log(album);
	 		console.log(track);
	 		console.log(url);
	 		//Log data in log.txt
	 		fs.appendFile("log.txt", artist + "\n" + album + "\n" + track + "\n" + url + "\n--------------------------\n");

	 	}
	});
}

//Looks for movies that user searches for 
function callOMDB(movie){

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover movie information
	    var title = "Title: " + JSON.parse(body).Title;
	    var releaseYear = "Release Year: " + JSON.parse(body).Year;
		var rating = "Rating: " + JSON.parse(body).imdbRating;	
		var country = "Country: " + JSON.parse(body).Country;
		var language = "Language: " + JSON.parse(body).Language;
		var plot = "Plot: " + JSON.parse(body).Plot;
	    var actors = "Actors: " + JSON.parse(body).Actors;
	    console.log(title);
	    console.log(releaseYear);
	    console.log(rating);
	    console.log(country);
	    console.log(language);
	    console.log(plot);
	    console.log(actors);
	    // console.log(rotten);
	    fs.appendFile("log.txt", title + "\n" + releaseYear + "\n" + rating + "\n" + country + "\n" + language + "\n" + plot + "\n" + actors + "\n--------------------------\n");
	  }
	  else console.log("There was an error. Please try again.");
	});
}

function doWhatever(){
	fs.readFile("random.txt", "utf8", function(error, data) {
	  
	  // Then split the data from random.txt by commas (to make it more readable)
	  var dataArr = data.split(",");

	  var method = dataArr[0];
	  var arg = dataArr[1];

	  switch(method){
	  	case 'my-tweets':
	  		callTwitter();
	  		break;
	  	case 'spotify-this-song':
	  		callSpotify(arg);
	  		break;
	  	case 'movie-this':
	  		callOMDB(arg);
	  		break;
	  }

	});
}


if (process.argv[2] === "my-tweets"){
	var command = process.argv.slice(2).join(' ');
	fs.appendFile("log.txt", command + "\n");
	callTwitter();
}

else if (process.argv[2] === "spotify-this-song"){
	if (process.argv[3] !== undefined){
		var command = process.argv.slice(2).join(' ');
		fs.appendFile("log.txt", command + "\n");
		callSpotify(process.argv.slice(3).join(" "));
	}
	else {
		callSpotify("The Sign Ace of Base");
	}
}
else if (process.argv[2] === "movie-this"){
	if (process.argv[3] !== undefined){
		var command = process.argv.slice(2).join(' ');
		fs.appendFile("log.txt", command + "\n");
		callOMDB(process.argv.slice(3).join(" "));
	}
	else {
		callOMDB("Mr. Nobody");
		var command = process.argv.slice(2).join(' ');
		fs.appendFile("log.txt", command + "\n");
	}
}
else if (process.argv[2] === "do-what-it-says"){
	var command = process.argv[2];
	fs.appendFile("log.txt", command + "\n");
	doWhatever();
}
else {
	console.log("Please enter a command.");
	var command = process.argv.slice(2).join(' ');
	fs.appendFile("log.txt", command + "\n");
}

