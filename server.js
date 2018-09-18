var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// app.use(express.static("./public"));

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "news";
var collections = ["newsData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

app.get("/", function (req, res) {
  res.send("Hello world");
});

request("https://www.upi.com/Odd_News/", function (error, response, html) {

  var $ = cheerio.load(html);
  var results = [];
  var titleArray = [];
  var contentArray = [];
  var linkArray= [];
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

  // $(".content").each(function (i, element) {


  //   var title = $(element).text();
  //   // var summary = $(element).text(".content");

  //   console.log(title);

  //   var link = $(element).attr("href");

  //   console.log(link);

  //   // if (titleNumber >= 5) {
  //   //   titleArray.push(title);
  //   // }
  // });

  // db.scrapedData.insert({
  //   results

  // })

  console.log(contentArray[6]);
  console.log("")
  console.log(titleArray[6]);

  // for (var i = 0; i < contentArray.length; i++){
  //   results.push = ({
  //     title: titleArray[i],
  //     description: contentArray[i]
  //   });
  // }

  // console.log(results);

});



app.listen(3000, function () {
  console.log("App running on port 3000!");
});