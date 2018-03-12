
$(document).ready(function() {

//Create an array and save it to a variable called 'topics'.
    
    var topics = ["Back to the Future", "E.T. the Extra-Terrestrial", "Ferris Bueller's Day Off", "Big", "Aliens", "The Blues Brothers", "Rain Man", "Ghostbusters", 
    "Platoon","Raiders of the Lost Ark", "The Terminator", "The Empire Strikes Back", "Star Trek II: The Wrath of Kahn", "Poltergeist", "War Games"];
   
//Take topics from above array and create buttons in HTML, using a loop that appends a button for each string in the array.

    function displayGifButtons(){
        $("#htmlButtons").empty(); // erasing anything in this div id so that it doesnt duplicate the results
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

  // Function to get gifs from Giphy
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        
    .done(function(response) {
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
   
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    