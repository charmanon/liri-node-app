# liri-node-app
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

##Description on how to use the app
* Use command 'node liri.js my-tweets' to call the app to use Twitter API to enable a user to see their 20 newest tweets
* Use command 'node liri.js spotify-this-song <song name here>'
 	This will show the following information about the song in your terminal/bash window
 	```
	    * Artist(s)
	    * The song's name
	    * A preview link of the song from Spotify
	    * The album that the song is from

	    * if no song is provided then your program will default to
	    * "The Sign" by Ace of Base
	```
* Use command `node liri.js movie-this '<movie name here>'
	* This will output the following information to your terminal/bash window:

	     ```
	       * Title of the movie.
	       * Year the movie came out.
	       * IMDB Rating of the movie.
	       * Country where the movie was produced.
	       * Language of the movie.
	       * Plot of the movie.
	       * Actors in the movie.
	       * Rotten Tomatoes Rating.
	       * Rotten Tomatoes URL.
	     ```

	   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

* In addition to logging the data to your terminal/bash window, the data is output to a .txt file called `log.txt`.


##Requirements
* Use Twitter npm package, spotify npm package, request npm package and OMDB package. 

##Technologies Used
Node JS 

