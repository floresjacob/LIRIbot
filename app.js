require('dotenv').config()

var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var request = require('request')
var fs = require('fs')

var call = process.argv[2]

var client_Twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
})

var client_Spotify = new Spotify({
    id : process.env.SPOTIFY_CLIENT_ID,
    secret : process.env.SPOTIFY_CLIENT_SECRET
})

