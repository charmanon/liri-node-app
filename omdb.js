var omdb = require('omdb');

omdb.get({ title: 'Saw', year: 2004}, {fullPlot : false, tomatoes : true}, function(err, movie) {
    if(err) {
        return console.error(err);
    }

    if(!movie) {
        return console.log('Movie not found!');
    }

    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);
    console.log(movie.type);
    console.log(movie.imdb.id);
    // Saw (2004) 7.6/10
    // Two men wake up at opposite sides of a dirty, disused bathroom, chained
    // by their ankles to pipes. Between them lies...
});

//  omdb.get({ title: movie}, {fullPlot : false, tomatoes : true}, function(err, movie) {
//     if(err) {
//         return console.error(err);
//     }

//     if(!movie) {
//         return console.log('Movie not found!');
//     }

//     console.log('%s (%d) %d/10', movie.title, movie.year, movie.rated);
//     console.log(movie.countries);
//     console.log(movie.type);
//     console.log(movie.language);
//     // if (tomato){
//     //   console.log(movie.tomato.url);
//     // }
// });