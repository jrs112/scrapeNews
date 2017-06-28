$("#scrapeESPN").on("click", function() {
    $("#scrapeESPN").text("Scraping ESPN...");
    $.get("/scrapeespn").done(refresh);
});

$("#scrapeFox").on("click", function() {
    $("#scrapeFox").text("Scraping FOX Sports...");
    $.get("/scrapefox").done(refresh);
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
      $("#notes").append("<div class='panel panel-primary'><div class='panel-heading'><h2>" + data.articleNumber + ". " + data.title + "</h2>" +
                        "</div><div class='panel-body'><h3>Enter a Note for This Article:</h3><h4><input id='titleinput' name='title' placeholder='Title' ></h4>" +
                        "<textarea id='bodyinput' name='body' placeholder='Note' rows='10' cols='50'></textarea>" +
                        "<p><button data-id='" + data._id + "' id='savenote'>Save Note</button></p>" +
                        "<a href='" + data.link + "' target='_blank'>" + data.link + "</a></div></div>");
    });
      // If there's a note in the article
        $.get("/notes/" + thisId, function(req) {
          if (req.length > 0) {
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
      } else {
        $("#prevNotes").empty();
        $("#prevNotes").prepend("<h3>There are no previous notes for this article.</h3>");
      }
    //     // Place the title of the note in the title input
        // $("#titleinput").val(data.note.title);
        // // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.note.body);
      });
        $(window).scrollTop($('#notes').offset().top-20)
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
      $("#prevNotes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

function refresh() {
    setTimeout(function() {
        window.location.href = "/";
    }, 2000);
}