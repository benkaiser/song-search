// this file is simply a driver used to test the orchestrate from the command line
// USAGE: YOUTUBE_KEY=KEY node testdriver.js 'search'
var songSearch = require('./main.js');

if (process.argv.length < 2) {
  console.log('Add a search parameter');
} else {
  var youtubeAPIKey = process.env.YOUTUBE_KEY;
  var search = process.argv[2];

  // print the args out
  console.log('Searching for songs...');
  console.log('Search: ' + search);

  songSearch.search({
    search: search,
    limit: 50, // defaults to 50
    itunesCountry: 'us', // defaults to 'us'
    youtubeAPIKey: youtubeAPIKey,
  }, function (err, songs) {
    console.log([err, songs]);
    console.log('Done');
  });
}
