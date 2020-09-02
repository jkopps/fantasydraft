function displayTeamDepthChart(t) {
    dc = document.getElementById('depthchart');
    dc.innerHTML = t;
}

function selectPlayer(p){
    t = p.team;
    displayTeamDepthChart(t);
}

function addPlayer(p){
    players = document.getElementById('players');
    row = players.insertRow(-1);
    row.addEventListener("click",
			 function() { selectPlayer(p); }
			)
    row.insertCell(-1).innerHTML = p.rank;
    row.insertCell(-1).innerHTML = p.pos;
    row.insertCell(-1).innerHTML = p.team;
    row.insertCell(-1).innerHTML = p.name;
}

function initializeDraft(){
    playerDataYahoo.forEach(addPlayer);
    
}
