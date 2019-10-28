var AWS = require("aws-sdk");
var fs = require('fs');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
console.log("Importing movies into DynamoDB. Please wait.");
var movies = new Array();
var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
allMovies.forEach(function (movie) {
    var params = {
        TableName: "MOVIES5",
        Item: {
            "year": { N: movie.year.toString() },
            "title": { S: movie.title }
        }
    };
    movies.push(params)
});
console.log(movies[0])
// Call DynamoDB to add the item to the table
movies.forEach(function (value) {
    ddb.putItem(value, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
});
