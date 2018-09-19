var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var db = require("./models");

var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var path = require("path");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "news";
var collections = ["newsData"];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/week18Populater", { useNewUrlParser: true });

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

app.get("/api/all", function (req, res) {
  db.newsData.find({}, function (err, found) {
    if (err) {
      conslole.log(err);
    } else {
      res.json(found);
    }

  });
});

// app.get("/api/saved", function(req, res) {
//   res.render("saved");
// });

app.get("/saved", function (req, res) {
  res.render("saved");
});


app.get("/", function (req, res) {
  res.render("index");
});

// app.get("/saved", function (req, res) {
//   res.sendFile(path.join(__dirname+'/public/saved.html'));
// });

request("https://www.upi.com/Odd_News/", function (error, response, html) {

db.newsData.drop();

  var $ = cheerio.load(html);
  var results = [];
  var titleArray = [];
  var contentArray = [];
  var linkArray = [];
  var titleNumber = 0;
  var contentNumber = 0;

  $(".title").each(function (i, element) {

    titleNumber++;

    var title = $(element).text();
    // var summary = $(element).text(".content");

    // var link = $(element).attr("href");

    // console.log(link);

    if (titleNumber >= 5) {
      titleArray.push(title);
    }
  });

  $(".content").each(function (i, element) {

    contentNumber++;

    var title = $(element).text();
    // var summary = $(element).text(".content");

    // var link = $(element).attr("href");

    // console.log(link);


    // results.push({
    //   title: title,
    //   summary: summary
    // });
    if (contentNumber >= 2) {
      contentArray.push(title);
    }
  });

  // db.scrapedData.insert({
  //   results

  // })

  for (var i = 0; i < contentArray.length; i++) {
    // results.push({
    //   id:i,
    //   title: titleArray[i],
    //   description: contentArray[i]
    // });

    db.newsData.insert({
      title: titleArray[i],
      description: contentArray[i]
  
    })
    
  }

  // db.newsData.insert({
  //   results

  // })

});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/api/all/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.newsData.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbnewsData) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbnewsData);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/api/all/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.newsData.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbnewsData) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbnewsData);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.listen(3000, function () {
  console.log("App running on port 3000!");
});