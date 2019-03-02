var topics = [
    "Madonna",
    "Hall & Oates",
    "Culture Club",
    "Michael Jackson",
    "Cindy Lauper",
    "Eurythmics",
    "The Police",
    "Run DMC",
    "Guns & Roses",
    "LL Cool J",
    "Big Daddy Kane",
    "Heavy D and the Boyz",
    "The Thompson Twins",
    "Duran Duran"
];

for(var i = 0; i < topics.length; i++) {
         var button = $("<button>").text(topics[i]);
         button.attr("data-artist", topics[i]);
         button.addClass("artist-button");
         $("#button-group").append(button);
} 

$( "#add-artist-button").on("click", function(e) {
    e. preventDefault();
    var alreadyExist = false;
    if (topics.indexOf($("#new-artist-input").val()) !== -1) {
            alreadyExist = true;
     }
     if($("new-artist-input").val() !== "" && alreadyExist === false){
         var newArtist = $("#new-artist-input").val().toLowerCase();
         topics.push(newArtist);
         var button = $("<button>").text(newArtist);
         button.attr("data-artist", newArtist);
         button.addClass(artist-button);
         $("#button-group").append(button);
     } 
    $("new-artist-input").val("");
    
});

$(document).on("click", ".artist-button", function () {
        var artist = $(this).attr("data-artist");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + 
"&api_key=vMhlUdXpscuBLjJitOZnJwXzRtOiM4Ny";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
    var results = response.data;
    //console.log(results)

            var resultsContainSection =$("<section class='results-container'>");

            for(var i =0;i < results.length; i++) {
                 var singleResultDiv =$("<div class='result-container'>");
            

            var artistImg =$("<img class= 'results'>");
            artistImg.attr("src",results[i].images.fixed_height_still.url);
            artistImg.attr("data-state", "still");
            artistImg.attr("data-still", results[i].imgaes.fixed_height_still,url);
            artistImg.attr("data-animate", results[i].images.fixed_height.url);

            
            singleResultsDiv.prepend(artistImg);

            resultsContainerSection.prepend(singleResultDiv);

        }

        $("#artist-group").prepend(resultsContainerSection);
}


  $(document).on("click", ".result", function() {
        var state = $(this).attr("data-state");

        if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate");    
        }else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
        
        }
    })


            


                                                                        
