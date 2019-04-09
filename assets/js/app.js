var topics = [
  "Madonna",
  "Culture Club",
  "Michael Jackson",
  "Cindy Lauper",
  "Eurythmics",
  "The Police",
  "Run DMC",
  "LL Cool J",
  "Duran Duran",
  "Millie Vanilli",
  "The Police",
  "Metallica"
];

for (var i = 0; i < topics.length; i++) {
  var button = $("<button>").text(topics[i]);
  button.attr("data-artist", topics[i]);
  button.addClass("artist-button");
  $("#button-group").append(button);
}

$("#add-artist-button").on("click", function(e) {
  e.preventDefault();
  var alreadyExist = false;
  if (topics.indexOf($("#new-artist-input").val()) !== -1) {
    alreadyExist = true;
  }
  if ($("new-artist-input").val() !== "" && alreadyExist === false) {
    var newArtist = $("#new-artist-input")
      .val()
      .toLowerCase();
    topics.push(newArtist);
    var button = $("<button>").text(newArtist);
    button.attr("data-artist", newArtist);
    button.addClass("artist-button");
    $("#button-group").append(button);
  }
  $("#new-artist-input").val("");
});

$(document).on("click", ".artist-button", function() {
  var artist = $(this).attr("data-artist");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    artist +
    "&api_key=vMhlUdXpscuBLjJitOZnJwXzRtOiM4Ny";

  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    //console.log(response);
    var results = response.data;
    //console.log(results);

    var resultsContainerSection = $("<section class='results-container'>");

    for (var i = 0; i < results.length; i++) {
      var singleResultDiv = $("<div class='result-container'>");
      var rating = results[i].rating;

      var p = $("<p>").text("Rating:" + rating);

      var artistImg = $("<img class= 'results'>");
      artistImg.attr("src", results[i].images.fixed_height_still.url);
      artistImg.attr("data-state", "still");
      artistImg.attr("data-still", results[i].images.fixed_height_still.url);
      artistImg.attr("data-animate", results[i].images.fixed_height.url);

      singleResultDiv.prepend(artistImg);
      singleResultDiv.prepend(p);

      resultsContainerSection.prepend(singleResultDiv);
    }

    $("#artist-group").prepend(resultsContainerSection);
  });
});

$(document).on("click", ".result", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
