

var listofplayers = []; //beginning empty list where the hero has been selected or not.
var current_selected;
$(document).ready(function() {
    main();
});


function main() {
    console.log('debug: main function is entered');
    initial_setup();
    $("div.player").not('.champion').click(function(){
        if(current_selected != $(this)){
            current_selected.toggleClass('selected');
            $(this).toggleClass('selected');
            current_selected = $(this);
        }
    });
    $('.image').click(function(event) {
        let clicked_src = $(this).attr('src'); //getting the clicked image src from the hero pool
        current_selected.children('img').attr('src',clicked_src); //actually changing the  image of the selected
        // TODO: there should finding next available selection slot for hero selection.
    });
}

function initial_setup(){
    let count = $("div.player").not('.champion').length; //number of players
    current_selected = $("div.player").not('.champion').first(); //first selected player
    ($("div.player").not('.champion').first()).toggleClass('selected'); //first selected player should be selected

    //add the players by making them into the Object
    for (var i = 0; i < count; i++) {
        var player = new Object();
        player.selected = false;
        player.hero = undefined;
        listofplayers.push(player); //set up list so that all of them are not
    }
    // TODO: I wonder if i need this player information here. i mean it's not really needed, there should more like array of our team and their team
    // and the calculation of well matched/balanced should be done like that instead of combining all of them together into one array.
}

function look_for_next_available_hero(){
    // dfsdfd
    continue;
}
