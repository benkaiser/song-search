## Song Search

This library takes a search string and using the youtube and itunes APIs
returns a list of tracks you might be looking for and their youtube video ids.

### Usage

```javascript
var songSearch = require('song-search');

songSearch.search({
  search: 'Taylor Swift',
  limit: 50, // defaults to 50
  itunesCountry: 'us', // defaults to 'us'
  youtubeAPIKey: 'YOUR_YOUTUBE_KEY_HERE',
}, function(err, songs) {
  console.log(songs); // will print out the 50 most
  /*
  [{ title: 'Shake It Off',
    artist: 'Taylor Swift',
    album: '1989',
    discNumber: 1,
    trackNumber: 6,
    genre: 'Pop',
    coverUrl: 'http://is2.mzstatic.com/image/thumb/Music5/v4/29/fa/b6/29fab67f-c950-826f-26a0-5eebcd0e262b/source/600x600bb.jpg',
    youtubeId: 'nfWlot6h_JM' },
  { title: 'Blank Space',
    artist: 'Taylor Swift',
    album: '1989',
    discNumber: 1,
    trackNumber: 2,
    genre: 'Pop',
    coverUrl: 'http://is2.mzstatic.com/image/thumb/Music5/v4/29/fa/b6/29fab67f-c950-826f-26a0-5eebcd0e262b/source/600x600bb.jpg',
    youtubeId: 'e-ORhEE9VVg' },
    ...
  ]
  */
});
```

### License

[MIT](https://opensource.org/licenses/MIT)
