
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
$(document).ready(function() {
    main();
    var checkViewport = setInterval(function() {
    suggestion()
}, 500);
});


function main() {
    console.log('debug: main function is entered');
    initial_setup();
    $("div.player").not('.champion').click(function(){
        console.log('mouse clicked')
        if(current_selected != $(this)){
            current_selected.toggleClass('selected');
            $(this).toggleClass('selected');
            current_selected = $(this);
            current_selected_id = parseInt($(this)[0].id);
            console.log(current_selected_id);
        }
    });
    $('.image').click(function(event) {
        let clicked_src = $(this).attr('src'); //getting the clicked image src from the hero pool
        current_selected.children('img').attr('src',clicked_src); //actually changing the  image of the selected
        update_player(current_selected_id, $(this).attr('alt'));


        // TODO: there should finding next available selection slot for hero selection.
    });
    $(document).keypress(function(e) {
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
        }
    });

}

function initial_setup(){
    console.log("sign up the players by assigning them to the objects");
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

function update_player(player_id, champion_name) {
    let temp = listofplayers[player_id-1];
    temp.selected = true;
    temp.hero = champion_name;
    return;
}

function checkAll(){
    for (var i = 0; i < listofplayers.length; i++) {
        if(listofplayers[i].selected){
            continue;
        }
        else{
            return false;
        }
    }
    return true;
}

function find_champion_weakness(champion_name){
    let suggestPoolList = []
    for (var i = 0; i < info.length; i++) {
        if(champion_name == info[i].Name.toLowerCase()){
            for (var j = 0; j < 3; j++) {
                suggestPoolList.push(info[i].weakAgainst[j].name.toLowerCase());
            }
        }
    }
    let result = {}
    result[champion_name] = suggestPoolList;
    return result;
}




function Classificationfunction(heroName){
    if(offense.indexOf(heroName) > -1){
        return 0;
    }
    else if (tank.indexOf(heroName) > -1) {
        return 1;
    }
    else {
        return 2; //healer
    }
}

function suggestion(){
    // TODO: LAST FREAKING PART FOR THIS PROJECT,, what should i compare now.. i have ups and downs and champion name...
    if(checkAll()){
        // give suggestion

        for (var a = 0; a < 6; a++) {
            myteam.push(listofplayers[a].hero);
            enemyteam.push(listofplayers[a+6].hero)
        }
        let counters = []; //start off with empty list of counters
        var teamcomp = {
            offense: 0,
            tank: 0,
            healer: 0,
            checkBalance: function(){
                if(this.healer == 2 && this.offense == 2 && this.tank == 2){
                    return true;
                }
                else{
                    return false;
                }
            }
        };
        let countered = [false, false, false, false, false, false];
        for(var u = 0; u < myteam.length; u++){
            let heroClass = Classificationfunction(myteam[u]) //classify which hero it is, 0: offense, 1: tank, 2: healer
            if(heroClass == 0){
                teamcomp.offense =  teamcomp.offense + 1;
            }
            else if (heroClass == 1) {
                teamcomp.tank = teamcomp.tank + 1;
            }
            else{
                teamcomp.healer = teamcomp.healer +1;
            }
        }

        if(teamcomp.checkBalance()){
            console.log("balanced");
        }


        // for (var b = 0; b < 6; b++){
        //     counters.push(find_champion_weakness(enemyteam[b]));
        // }
        // // after getting the counters of the current enemy team, we need to check the composition
        // // check if all the champions are first countered:
        // for (var c = 0; c < 6; c++){
        //     for(var d = 0; d < myteam.length; d++){
        //         let suggestpool = counters[c][enemyteam[c]];
        //         for(var e = 0; e < suggestpool.length; e++){
        //             if(myteam[d].toLowerCase() == suggestpool[e]){
        //                 countered[c] = true;
        //             }
        //         }
        //     }
        // }

    }
}
