var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var fs = require("fs");

var omdb = require('omdb');

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

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
	 		fs.appendFile("log.txt", artist + "\n" + album + "\n" + track + "\n" + url + "\n");

	 	}
	});
}

function callOMDB(movie){
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    //console.log("Rotten Tomatoes URL: " + JSON.parse(body).Rotten);
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
		callOMDB(process.argv.slice(3).join(" "));
	}
	else {
		callOMDB("Mr. Nobody");
	}
}
else {
	console.log("Please enter a command.");
}

