require('dotenv').config()

var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var omdb = require('omdb')
var request = require('request')
var fs = require('fs')

var call = process.argv[2]

var client_Twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var client_Spotify = new Spotify({
    id : process.env.SPOTIFY_CLIENT_ID,
    secret : process.env.SPOTIFY_CLIENT_SECRET
})


var  omdb_key = process.env.OMDB_API_KEY


var params = {screen_name: 'jcbthnflrs', count: 5}
client_Twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(i=0; i<tweets.length; i++){
        console.log(tweets[i].text)
    }
  }
  else{
      console.log(error)
      console.log("there's an error")
  }
})

client_Spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( !err ) {
        console.log("spotify: " + data.tracks.items[0].name)
    }
    else{
        console.log('Error occurred: ' + err)
        return
    }
    // Do something with 'data' 
})

function omdbCall() {
    // var title = process.argv[3]
    var title = 'avatar'
    var omdbURL = "http://www.omdbapi.com/?apikey=ce8ac768&t=" + title

   request(omdbURL, function(err, res, body){
       if(err){
           console.log(err)
       }
       else{
           console.log("body: " + body)
       }
   })
}


omdbCall()

