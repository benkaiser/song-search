var YouTube = require('youtube-node');
var async = require('async');
var searchitunes = require('searchitunes');

var youtube = new YouTube();
var lfm = null;

module.exports.search = function search(options, callback) {
  var internalOpts = {
    search: options.search || '',
    limit: options.limit || 50,
    itunesCountry: options.itunesCountry,
    youtubeAPIKey: options.youtubeAPIKey,
  };

  // init youtube and lastfm
  youtube.setKey(internalOpts.youtubeAPIKey);

  itunesLookup(
    internalOpts.search,
    internalOpts.itunesCountry,
    internalOpts.limit,
    function (err, tracks) {
      if (err) {
        callback(err); return;
      } else {
        async.map(
          tracks,
          findYoutubeURLForTrack,
          function (err, tracksWithYoutube) {
          if (err) {
            callback(err); return;
          }

          var tracksFound = tracksWithYoutube.filter(function (item) {
            return item != null;
          });

          callback(null, uniqueTracks(tracksFound));
        });
      }
    }
  );
};

function findYoutubeURLForTrack(trackObj, callback) {
  youtube.search(
    trackObj.title + ' ' + trackObj.artist,
    1,
    function (error, result) {
    if (error || result.items.length === 0) {
      callback(error, null);
    } else {
      trackObj.youtubeId = result.items[0].id.videoId;
      callback(null, trackObj);
    }
  });
};

function itunesLookup(search, country, limit, callback) {
  searchitunes({
    country: country,
    term: search,
    limit: limit,
  }, function (err, data) {
      if (err) {
        callback(err, []);
      } else {
        var songs = data.results.map(function (result) {
          var song = {
            title: result.trackName,
            artist: result.artistName,
            album: result.collectionName,
            discNumber: result.discNumber,
            trackNumber: result.trackNumber,
            genre: result.primaryGenreName,
            coverUrl: result.artworkUrl100.replace('100x100', '600x600'),
          };
          return song;
        });

        callback(null, songs);
      }
    }
  );
};

function uniqueTracks(tracks) {
  var unique = {};
  var distinct = [];
  for (var i in tracks) {
    if (typeof (unique[tracks[i].youtubeId]) === 'undefined') {
      distinct.push(tracks[i]);
    }

    unique[tracks[i].youtubeId] = 0;
  }

  console.log(distinct);
  return distinct;
}
