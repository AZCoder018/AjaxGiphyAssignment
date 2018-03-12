
$(document).ready(function() {

//Create an array and save it to a variable called 'topics'.
    
    var topics = ["Back to the Future", "Scarface", "Ferris Bueller's Day Off", "Amadeus", "Aliens", "The Blues Brothers", "Rain Man", "Ghostbusters", 
    "Platoon","Raiders of the Lost Ark", "The Terminator", "The Empire Strikes Back", "Star Trek II: The Wrath of Kahn", "Poltergeist", "War Games", "Big"];
   
/*Take topics from above array and create buttons in HTML, using a loop that appends a 
button for each string in the array; start with empty div */

    function displayGifButtons(){
        $("#htmlButtons").empty(); 
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#htmlButtons").append(gifButton);
        }
    }

// Function to add a new action button and not allow for blank buttons

    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false; 
        }
        topics.push(action);
    
        displayGifButtons();
        return false;
        });
    }

  // Function to get gifs from Giphy; change to https
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
  //Need to clear gifsView container and send new gifs div, ratings, and gif attributes to HTML

    .done(function(response) {
            $("#gifsView").empty(); 
            var results = response.data; 
   
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
    
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
            
            
                $("#gifsView").prepend(gifDiv);
            }
        });
    }

    displayGifButtons(); 
    addNewButton();

    //OnClick for animating image and stii
    
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
         }
        
        else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    