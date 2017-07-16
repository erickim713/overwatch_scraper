// classes will be all defined here for effing sakes...
// it's too complicated to write everything in one file.

class Team {
    constructor() {
        this.members = [];
        for (var i = 0; i < 6; i++) {
            this.members.push(new Member(i)); // insert members into the Team with their id.
        }
    }

    checkBalance(){
        //function to check balance of the current team.
        console.log("balance check :)");
        let offense = 0;
        let tanker = 0;
        let healer = 0;
        for (var i = 0; i < this.members.length; i++) {
            if(this.members[i].getRole() == 'offense'){
                offense++;
            }
            else if (this.members[i].getRole() == 'tanker') {
                tanker++;
            }
            else{
                healer++;
            }
        }
        if(offense == 2 && tanker == 2 && healer ==2){
            console.log("good team balance!");
        }
        else{
            offense = 2 - offense;
            tanker = 2 - tanker;
            healer = 2 - healer;
            if(offense < 0){
                console.log('we have too many offense heroes');
            }
            if(offense > 0){
                console.log('we need more offense heroes');
            }
            if(tanker < 0){
                console.log('we have too many tanker heroes');
            }
            if(tanker > 0){
                console.log('we need more tanker heroes');
            }
            if(healer < 0){
                console.log('we have too many healer heroes');
            }
            if(healer > 0){
                console.log('we need more healer heroes');
            }
        }
    }
    checkPicks(enemyTeam){
        //function to check if the picks are to counter the other team.
        console.log("hero pick check :)");
        let suggestion = [];
        for (var i = 0; i < 6; i++) {
            let current_enemy_counters = find_champion_weakness(enemyTeam.members[i].champion.name);
            console.log(current_enemy_counters);
            console.log(enemyTeam.members[i].champion.name);
            let counter = 0;
            for(var j = 0; j < 6; j++){
                if(current_enemy_counters[enemyTeam.members[i].champion.name].indexOf(this.members[j].champion.name) > -1){
                    console.log(this.members[j].champion.name);
                    counter++;
                }
            }
            if(counter == 0){
                suggestion.push(current_enemy_counters[enemyTeam.members[i].champion.name]);
            }
        }
        return suggestion;

    }
    suggestionDisplay(){
        //function to display the suggestions for the team to be more "successful" and have higher chance of winning.
        console.log("suggestion display :)");
    }
    find_by_id(id){
        //access the player's information for update by finding them with their id.
        return this.members[id-1]
    }
    find_champion_weakness(champion_name){
        let suggestPoolList = []
        for (var i = 0; i < info.length; i++) {
            if(champion_name == info[i].Name.toLowerCase()){
                for (var j = 0; j < 3; j++) {
                    suggestPoolList.push(info[i].weakAgainst[j].name.toLowerCase());
                }
                break;
            }
        }
        let result = {}
        result[champion_name] = suggestPoolList;
        return result;
    }
}


class Member {
    constructor(id) {
        this.id = id; //id of each player?
    }
    updateChampion(championName){
        this.champion = new Champion(championName); //each member is playing a champion...
    }
    getRole(){
        return this.champion.role;
    }
}

class Champion {
    constructor(championName) {
        this.name = championName.toLowerCase(); //champion's name
        this.role = this.checkRole(championName.toLowerCase()); //champion's role
    }
    checkRole(championName){
        //list of roles
        let offense = ['genji','mccree', 'pharah', 'reaper', 'soldier', 'tracer', 'sombra', 'bastion', 'hanzo', 'junkrat', 'mei', 'torbjorn', 'widowmaker'];
        let tanker = ['dva', 'reinhardt', 'roadhog', 'winston', 'zarya', 'orisa'];
        let healer = ['lucio', 'mercy', 'symmetra', 'zenyatta', 'ana'];
        if(offense.indexOf(championName) > -1){
            return "offense";
        }
        else if (tanker.indexOf(championName) > -1) {
            return "tanker";
        }
        else{
            return "healer";
        }
    }
}
