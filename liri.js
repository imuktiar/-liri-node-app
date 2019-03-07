require("dotenv").config();

//vars
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var request = require("request");
var liriReturn = process.argv[2];
var input = process.argv[3];

switch(liriReturn) {
    case "spotify-this-song":
    song();
    break;
    //Fail
    default:
    console.log("I'm sorry but I don't understand.");
    break;
    case "do-what-it-says":
    doit();
    break;
}

function song() {
    var song = "";
    if (input === undefined) {
        song = "This Old Dog"
    } else {
        song = input;
    }
    console.log("------------------");
    console.log("Here's what I found!")
    spotify.search({ type: 'track', query: song}, function (error, data) {
        if (!error) {
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
            var songData = `\nUsed spotify-this-song to find: \Artist: ${data.tracks.items[0].artists[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name}\n................`
            fs.appendFile('log.txt', songData, function (error) {
                if (error) throw error;
            });

        }
    });
}



function doit() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
          }
         
		var dataArr = data.split(",");

		
		if (dataArr[0] === "spotify-this-song") {
			var songcheck = dataArr[1].slice(1, -1);
            song(songcheck);
        }

        });
    }