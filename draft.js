function addPlayer(p){
    players = document.getElementById('players');
    row = players.insertRow(-1);
    row.insertCell(-1).innerHTML = p.rank;
    row.insertCell(-1).innerHTML = p.pos;
    row.insertCell(-1).innerHTML = p.team;
    row.insertCell(-1).innerHTML = p.name;
}

function initializeDraft(){
    playerDataYahoo.forEach(addPlayer);
    
}
