const path = require("path");
const fs = require("fs");
const jsonPathPaintings = pathjoin(__dirname, "data", "paintings-nested.json");
const jsonPathGalleries = pathjoin(__dirname, "data", "galleries.json");
const jsonPathArtists = pathjoin(__dirname, "data", "artists.json");

let paintings;
let artists;
let galleries;

fs.readFile(jsonPathPaintings, (err, data) => {
    if(err){
        console.log("Cannot read paintings data");
        resp.json({message : "Cannot read paintings data"});
    }
    else
        paintings = JSON.parse(data);
});
fs.readFile(jsonPathGalleries, (err, data) => {
    if(err){
        console.log("Cannot read galleries data");
        resp.json({message : "Cannot read galleries data"});
    }
    else
        galleries = JSON.parse(data);
});
fs.readFile(jsonPathArtists, (err, data) => {
    if(err){
        console.log("Cannot read artist data");
        resp.json({message : "Cannot read artist data"});
    }
    else
        artists = JSON.parse(data);
});

function getPaintings(){
    return paintings;
}
function getGalleries(){
    return galleries;
}
function getArtists(){
    return artists;
}

module.exports = {getArtists, getGalleries, getPaintings};