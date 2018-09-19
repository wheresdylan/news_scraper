console.log("working")

function displayResults(newsData) {
  // First, empty the table
  $("#homePage").empty();

  console.log(newsData)

  for (var i = 0; i < newsData.length; i++) {

    var tr = $("<tr>").append(
      $("<td>").text(newsData[i].title),
      $("<td>").text(newsData[i].description)
      //  $("<td>").append("<textarea id='bodyinput' name='body'></textarea>"),
      //  // A button to submit a new note, with the id of the article saved to it
      //  $("<td>").append("<button data-id='" + newsData[i]._id + "' id='comment'>Submit Comment</button>")
    );

    $("#homePage").append(tr);

    $("#homePage").append("<textarea id='bodyinput" + newsData[i]._id + "' name='body'></textarea>"),

    $("#homePage").append("<button data-id='" + newsData[i]._id + "' class='comment'>Submit Comment</button>")
    $("#homePage").append("<button data-id='" + i + "' id='save'>Save Article</button>")
    $("#homePage").append(" <div id='notes" + newsData[i]._id  + "'></div><hr>")
    
  }

}

$.getJSON("/api/all", function (data) {
  // Call our function to generate a table body
  displayResults(data);
});

// $(document).on("click", "#comment", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   console.log(thisId);

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/api/all/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       // $("#notes").append("<input id='titleinput' name='title' >");
//       // // A textarea to add a new note body
//       // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // // A button to submit a new note, with the id of the article saved to it
//       // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // // If there's a note in the article
//       // if (data.note) {
//       //   // Place the title of the note in the title input
//       //   $("#titleinput").val(data.note.title);
//       //   // Place the body of the note in the body textarea
//       //   $("#bodyinput").val(data.note.body);
//       // }
//     });
// });

$(document).on("click", ".comment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  console.log(thisId);

  // console.log($("#bodyinput" + thisId).val());

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/api/all/" + thisId,
    data: {
      // Value taken from title input
      title: $("#bodyinput" + thisId).val(),
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      // console.log(data);
      // Empty the notes section
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#bodyinput" + thisId).val("");

    $.ajax({
    method: "GET",
    url: "/api/all/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(thisId);
      console.log(data.note.title);
      // The title of the article
      $("#notes" + thisId).append("<h7>new comment: " + data.note.title + "</h7><br>");
      // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // // If there's a note in the article
      // if (data.note) {
      //   // Place the title of the note in the title input
      //   $("#titleinput").val(data.note.title);
      //   // Place the body of the note in the body textarea
      //   $("#bodyinput").val(data.note.body);
      // }
    });
});


//still working on populating the saved page

// $(document).on("click", "#save", function(){
//   console.log("clicked button");
//   console.log($(this).attr("data-id"));

//   var savedArticle = $(this).attr("data-id");

//   $.getJSON("/api/all", function (data) {
//     // Call our function to generate a table body
//     console.log(data[savedArticle].title);

//     var tr = $("<tr>").append(
//       $("<td>").text(data[savedArticle].title),
//       $("<td>").text(data[savedArticle].description)

//     );

//     console.log(tr);

//     $("#saved").append(tr);

//   });
// });