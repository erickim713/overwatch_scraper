
var current_selected_id;
var listofplayers = []; //beginning empty list where the hero has been selected or not.
var current_selected;
var full;
var myteam = [];
var enemyteam = [];
var offense = ['genji','mccree', 'pharah', 'reaper', 'soldier', 'tracer', 'sombra', 'bastion', 'hanzo', 'junkrat', 'mei', 'torbjorn', 'widowmaker'];
var tank = ['dva', 'reinhardt', 'roadhog', 'winston', 'zarya', 'orisa'];
var healer = ['lucio', 'mercy', 'symmetra', 'zenyatta', 'ana'];
var state;

//new point.
var myTeam = new Team();
var theirTeam = new Team();
var teamPointer;
var playerPointer;
$(document).ready(function() {
    main();
    var checkViewport = setInterval(function() {
    if(myTeam.checkAllready(theirTeam)){
        myTeam.suggestionDisplay(theirTeam);
    }
}, 500);
});


function main() {
    console.log('debug: main function is entered');
    initial_setup();
    $("div.player").not('.champion').click(function(){ //CLICKING ON THE PLAYER TO CHANGE
        console.log('mouse clicked')
        if(current_selected != $(this)){
            current_selected.toggleClass('selected');
            $(this).toggleClass('selected');
            current_selected = $(this); //this is done so that if statement checks if it's this or not. *removing unnecessary step to change current selected when it's not needed
            current_selected_id = parseInt($(this)[0].id);
            console.log(current_selected_id);
            //find the RIGHT player in a RIGHT team to update.
            if(current_selected_id <= 6){
                teamPointer = myTeam;
                playerPointer = teamPointer.find_by_id(current_selected_id);
            }
            else{
                teamPointer = theirTeam;
                playerPointer = teamPointer.find_by_id(current_selected_id-6);
            }
        }
    });
    $('.image').click(function(event) { //CLICKING ON THE HERO IMAGE IN THE POOL
        let clicked_src = $(this).attr('src'); //getting the clicked image src from the hero pool
        current_selected.children('img').attr('src',clicked_src); //actually changing the  image of the selected
        playerPointer.updateChampion($(this).attr('alt'));
        // update_player(current_selected_id, $(this).attr('alt'));


        // TODO: there should finding next available selection slot for hero selection.
    });
    $(document).keypress(function(e) { //PEOPLE USUALLY PRESS ENTER TO SKIP TO NEXT (ALTERNATIVE TO CLICKING)
        if(e.which == 13) {
            console.log('pressed enter');
            current_selected_id = (current_selected_id + 1) % 13;
            console.log(current_selected_id);
            if(current_selected_id == 0){
                current_selected_id = current_selected_id + 1;
                // since there's no id == 0 skip the 0
            }
            current_selected.toggleClass('selected');
            current_selected = $("#" + current_selected_id);
            current_selected.toggleClass('selected');
            if(current_selected_id <= 6){
                teamPointer = myTeam;
                playerPointer = teamPointer.find_by_id(current_selected_id);
            }
            else{
                teamPointer = theirTeam;
                playerPointer = teamPointer.find_by_id(current_selected_id-6);
            }
        }
    });

}

function initial_setup(){
    console.log("sign up the players by assigning them to the objects");
    teamPointer = myTeam;
    playerPointer = myTeam.find_by_id(1)
    //first initializing the two teams;
    let count = $("div.player").not('.champion').length; //number of players
    current_selected = $("div.player").not('.champion').first(); //first selected player
    ($("div.player").not('.champion').first()).toggleClass('selected'); //first selected player should be selected
    current_selected_id = 1;
    //add the players by making them into the Object
    for (var i = 0; i < count; i++) {
        var player = new Object();
        player.id = $("div.player").not('.champion')[i].id -1;
        player.selected = false;
        player.hero = undefined;
        listofplayers.push(player); //set up list so that all of them are not
    }
    // TODO: I wonder if i need this player information here. i mean it's not really needed, there should more like array of our team and their team
    // and the calculation of well matched/balanced should be done like that instead of combining all of them together into one array.
}


function find_the_player_info(player_id) {
        return listofplayers[player_id];
}
