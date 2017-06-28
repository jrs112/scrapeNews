$("#scrapeESPN").on("click", function() {
    $.get("/scrape", refresh);
});


$(document).on("click", "h3", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<h4><input id='titleinput' name='title' placeholder='Enter Note Title' ></h4>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Enter Note'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<p><button data-id='" + data._id + "' id='savenote'>Save Note</button></p>");
    });
      // If there's a note in the article
        $.get("/notes/" + thisId, function(req) {
            console.log(req);
            $("#prevNotes").empty();
            $("#prevNotes").prepend("<h3>Previous Notes:</h3>");
        for (var i = 0; i < req.length; i++) {
            var prevTitle = $("<h4>");
            var prevNote = $("<p>");
            prevTitle.attr("id", "prevTitle-" + i);
            prevNote.attr("id", "prevNote-" + i);
            prevNote.append(prevTitle);
            $("#prevNotes").append(prevNote);
            $("#prevTitle-" + i).append(req[i].title);
            $("#prevNote-" + i).append(req[i].body + "<p>_______________________</p>");



        }
    //     // Place the title of the note in the title input
        // $("#titleinput").val(data.note.title);
        // // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.note.body);
      });

});


$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val(),
      article: thisId
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

function refresh() {
    setTimeout(function() {
        window.location.href = "/";
    }, 1000);
}