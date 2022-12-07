const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const jsonPathPaintings = path.join(__dirname, "data", "paintings-nested.json");
const jsonPathGalleries = path.join(__dirname, "data", "galleries.json");
const jsonPathArtists = path.join(__dirname, "data", "artists.json");

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


app.get("/api/paintings", (req, resp) => {
    //returns JSON for all paintings
    resp.json(paintings);
});
app.get("/api/painting/:id", (req, resp) => {
    //returns JSON for the painting matching the given ID (assuming ID is unique)
    const results = paintings.filter(p => p.paintingID == req.params.id);
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : "No painting with that id"});
});
app.get("/api/painting/gallery/:id", (req, resp) => {
    //returns JSON for the gallery matching the given ID (assuming ID is unique)
    const results = galleries.filter(p => p.GalleryID == req.params.id);
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : "No gallery with that id"});
});
app.get("/api/painting/artist/:id", (req, resp) => {
    //returns JSON for the artist matching the given ID (assuming ID is unique)
    const results = artists.filter(p => p.ArtistID == req.params.id);
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : "No artist with that id"});
});
app.get("/api/painting/year/:min/:max", (req, resp) => {
    //returns JSON for all paintings whose year of work falls in the min, max range
    const results = paintings.filter(p => p.yearOfWork < req.params.max && p.yearOfWork > req.params.min);
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : `No paintings between ${req.params.min} and ${req.params.max}`});
});
app.get("/api/painting/title/:text", (req, resp) => {
    //returns JSON for all paintings whose title includes the given substring. Case insensitive
    const results = paintings.filter(p => p.title.toString().toLowerCase().includes(req.params.text.toLowerCase()));
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : `No painting titles containing ${req.params.text}`});
});
app.get("/api/painting/color/:name", (req, resp) => {
    //returns JSON for all paintings whose dominant color array contains the given color. Case insensitive
    const results = [];
    for(let painting of paintings){
        for(let color of painting.details.annotation.dominantColors){
            if(color.name.toString().toLowerCase().includes(req.params.name.toLowerCase())){
                results.push(painting);
                break;
            }
        }
    }

    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : "No paintings with that color name"});
});
app.get("/api/artists", (req, resp) => {
    //returns JSON for all artists
    resp.json(artists);
});
app.get("/api/artists/:country", (req, resp) => {
    //returns JSON for all artists from the given country. Case insensitive
    const results = artists.filter(p => p.Nationality.toString().toLowerCase().includes(req.params.country.toLowerCase()));
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : `No artists from ${req.params.country}`});
});
app.get("/api/galleries", (req, resp) => {
    //returns JSON for all galleries
    resp.json(galleries);
});
app.get("/api/galleries/:country", (req, resp) => {
    //returns JSON for all galleries from the given country. Case insensitive
    const results = galleries.filter(p => p.GalleryCountry.toString().toLowerCase().includes(req.params.country.toLowerCase()));
    if(results.length > 0)
        resp.json(results);
    else
        resp.json({message : `No galleries from ${req.params.country}`});
});

app.listen(8080, ()=>{
    console.log("Server running at port 8080");
});
