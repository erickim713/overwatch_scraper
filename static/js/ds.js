// classes will be all defined here for effing sakes...
// it's too complicated to write everything in one file.
// TODO: i need to change the suggestion into a more healer suggestion.
class Team {
    constructor() {
        this.balanceState = false;
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
            this.balanceState = true;
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
            let current_enemy_counters = this.find_champion_weakness_counter(enemyTeam.members[i].champion.name);
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
                let result = {}
                result["champion"] = enemyTeam.members[i].champion.name;
                result['counter'] = current_enemy_counters[enemyTeam.members[i].champion.name];
                suggestion.push(result);
            }
        }
        return suggestion;

    }
    suggestionDisplay(theirTeam){
        //function to display the suggestions for the team to be more "successful" and have higher chance of winning.
        //suggestion is
        this.checkBalance(); //check the balance
        let analysisResult = this.checkPicks(theirTeam); //check the pick against the enemy team.
        if(this.balanceState){ //if the team is balanced 2,2,2 formation then you should just see the list of champions to be selected
            //if the team is balanced then we just have to cover the non-countered champions
            for(var i = 0; i < analysisResult.length; i++){
                console.log("to cover " + analysisResult[i].champion + " you will need " + analysisResult[i].counter[0] + " " + analysisResult[i].counter[1] + " " + analysisResult[i].counter[2]);
                // console.log("hi");
            }
        }
        else{
            for(var j = 0; j <analysisResult.length; j++){
                let subResult = this.find_champion_weakness(analysisResult[j].champion);
                console.log("best offense to cover " + analysisResult[j].champion + " is " + subResult[0]);
                console.log("best tanker to cover " + analysisResult[j].champion + " is " + subResult[1]);
                console.log("best healer to cover " + analysisResult[j].champion + " is " + subResult[2]);
            }
        }
    }

    find_by_id(id){
        //access the player's information for update by finding them with their id.
        return this.members[id-1]
    }

    find_champion_weakness_counter(championName){
        let suggestPoolList = []
        for (var i = 0; i < info.length; i++) {
            if(championName == info[i].Name.toLowerCase()){
                for (var j = 0; j < 3; j++) {
                    suggestPoolList.push(info[i].weakAgainst[j].name.toLowerCase());
                }
                break;
            }
        }
        let result = {}
        result[championName] = suggestPoolList;
        return result;
    }

    find_champion_weakness(championName){
        //fixed finding champion counter by taking first counter respect to the enemy's pick. (for suggestion)
        let suggestPoolList = [];
        let offenseCounter = 0;
        let tankerCounter = 0;
        let healerCounter = 0;
        for (var i = 0; i < info.length; i++) {
            if(championName == info[i].Name.toLowerCase()){
                for (var j = 0; j < 3; j++) {
                    if(j == 0){
                        console.log("looking for offense")
                        //look for best offense counter
                        for(var k =0; k<info.length; k++){
                            if(new Champion(info[i].weakAgainst[k].name.toLowerCase()).role == "offense" && offenseCounter == 0){
                                suggestPoolList.push(info[i].weakAgainst[k].name.toLowerCase());
                                offenseCounter++;
                                break;
                            }
                        }
                    }
                    else if(j==1){
                        //look for the best tanker counter
                        for(var k =0; k<info.length; k++){
                            if(new Champion(info[i].weakAgainst[k].name.toLowerCase()).role == "tanker" && tankerCounter == 0){
                                suggestPoolList.push(info[i].weakAgainst[k].name.toLowerCase());
                                tankerCounter++;
                                break;
                            }
                        }
                    }
                    else{
                        //look for the best healer.
                        for(var k =0; k<info.length; k++){
                            if(new Champion(info[i].weakAgainst[k].name.toLowerCase()).role == "healer" && healerCounter == 0){
                                suggestPoolList.push(info[i].weakAgainst[k].name.toLowerCase());
                                offenseCounter++;
                                break;
                            }
                        }
                    }

                }
                break;
            }
        }
        let result = {}
        result[championName] = suggestPoolList;
        return result;
    }
    checkAllready(theirTeam){
        for(var i = 0; i<6; i++){
            if(this.members[i].champion == undefined){
                return false;
            }
            if(theirTeam.members[i].champion == undefined){
                return false;
            }
        }
        return true;
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
