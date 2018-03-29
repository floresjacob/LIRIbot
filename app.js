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

//passing in artist names for mapping
function names(artist){
    return artist.name
}

var params = {screen_name: 'jcbthnflrs', count: 20}

function callTwitter(){
    client_Twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var tweetArray = []
          for(i=0; i<tweets.length; i++){
              tweetArray.push(tweets[i].text)
          }
          console.log(tweetArray)
        }
        else{
            console.log(error)
            console.log("there's an error")
        }
      })
}

function callSpotify(){
    var song = process.argv.slice(3)
    client_Spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( !err ) {
            console.log("Artist: " + data.tracks.items[0].artists.map(names))
            console.log("Song: " + data.tracks.items[0].name)
            console.log("Link: " + data.tracks.items[0].preview_url)
            console.log("Album: " + data.tracks.items[0].album.name)
        }
        else{
            console.log('Error occurred: ' + err)
            return
        }
        // Do something with 'data' 
    })
}

function omdbCall() {
    var title = process.argv.slice(3)
    

    var omdbURL = "http://www.omdbapi.com/?apikey="+ omdb_key +"&t=" + title

   request(omdbURL, function(err, res, body){
       if(err){
           console.log(err)
       }
       else{
           
           var movie = JSON.parse(body)
           console.log("Title: " + movie.Title)
           console.log("Year: " + movie.Year)
           console.log("IMDB: " + movie.Ratings[0].Value)
           console.log("Rotten Tomatoes: " + movie.Ratings[1].Value)
           console.log("Country: " + movie.Country)
           console.log("Language: " + movie.Language)
           console.log("Plot: " + movie.Plot)
           console.log("Actors: " + movie.Actors)
       }
   })
}

var command = process.argv[2]

switch(command){
    case 'movie-this':
        omdbCall()
        break
    case 'my-tweets':
        callTwitter()
        break
    case 'spotify-this-song':
        callSpotify()
        break
    case 'readFile':
        doIt()
        break
    default:
        console.log("the only commands are movie-this <movie>, my-tweets, spotify-this-song <song>")
}

function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        // console.log(data)
        var readData = data.split(',')
        var song = readData[0]
        console.log(song)
        client_Spotify.search({ type: 'track', query: song }, function(err, data) {
            if ( !err ) {
                console.log("Artist: " + data.tracks.items[0].artists.map(names))
                console.log("Song: " + data.tracks.items[0].name)
                console.log("Link: " + data.tracks.items[0].preview_url)
                console.log("Album: " + data.tracks.items[0].album.name)
            }
            else{
                console.log('Error occurred: ' + err)
                return
            }
            // Do something with 'data' 
        })
    })
    
}