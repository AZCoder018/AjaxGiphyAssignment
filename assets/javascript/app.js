//Create array for movie titles

var movies = ["Ghostbusters", "E.T. the Extra-Terrestrial", "Poltergeist", "Aliens", "Ferris Bueller's Day Off", "The Empire Strikes Back", "The Blues Brothers", "Raiders of the Lost Ark", "Back to the Future", "Platoon", "Amadeus",
    "Star Trek II: the Wrath of Khan", "The Thing", "Splash", "Big", "Rain Man", "Top Gun"];

//Create buttons in HTML for movie titles in array; use a loop that appends a button for each string in array

function addHtmlButtons() {
    $("#movieButtons").empty();
    for (var i = 0; i < movies.length; i++) {
        var htmlButton = $("<button>");
        htmlButton.text(movies[i]);
        htmlButton.addClass("htmlButton");
        htmlButton.attr("data-name", movies[i]);
        $("#movieButtons").append(htmlButton);

    }
}

/*When user clicks on a button, the pages should grab 10 static, 
non-animated gif images from the GIPHY API and place them on the page*/
