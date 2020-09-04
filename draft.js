function displayTeamDepthChart(t) {
    for (dc of document.getElementsByClassName("depthchart")){
	dc.style.display = 'none';
	dc.style.visibility = 'hidden';
	if (dc.team == t){
	    dc.style.display = 'table';
	    dc.style.visibility = 'visible';
	}
    }
}

function selectPlayer(p){
    t = p.team;
    displayTeamDepthChart(t);
}

function addPlayer(p){
    players = document.getElementById('players');
    row = players.insertRow(-1);
    row.classList.add('playerListEntry');
    row.addEventListener("click",
			 function() { selectPlayer(p); }
			)
    row.insertCell(-1).innerHTML = p.rank;
    row.insertCell(-1).innerHTML = p.pos;
    row.insertCell(-1).innerHTML = p.team;
    row.insertCell(-1).innerHTML = p.name;

    opt = document.createElement("OPTION");
    opt.value = p.name;
    document.getElementById('playersList').appendChild(opt);
}


function addDepthChart(dc){
    var tbl = document.createElement("TABLE");
    var pos;
    tbl.team = dc.team;
    for (pos of (["QB", "RB", "WR", "TE"])) {
	row = tbl.insertRow(-1);
	row.insertCell(-1).innerHTML = pos;
	for (name of dc[pos]) {
	    row.insertCell(-1).innerHTML = name;
	}
    }
    tbl.style.display = 'none';
    tbl.style.visibility = 'hidden';
    tbl.classList.add('depthchart');
    document.getElementById('s_depthchart').appendChild(tbl);

    opt = document.createElement("OPTION");
    opt.value = dc.team;
    document.getElementById('teamsList').appendChild(opt);
}


function initializeDraft(){
    playerDataYahoo.forEach(addPlayer);
    teamDepthCharts.forEach(addDepthChart);
}
