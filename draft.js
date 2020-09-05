var activePlayer;

function displayTeamDepthChart(t) {
    for (dc of document.getElementsByClassName("depthchart")){
	dc.style.display = 'none';
	dc.style.visibility = 'hidden';
	if (dc.team == t){
	    dc.style.display = 'table';
	    dc.style.visibility = 'visible';
	}
    }

    document.getElementById("teamsSearch").value = t;
}

function filterPlayersByPosition(){
    document.getElementById('console').innerHTML = "blah";

    filters = {
	QB:document.getElementById('filter_qb').checked,
	RB:document.getElementById('filter_rb').checked,
	WR:document.getElementById('filter_wr').checked,
	TE:document.getElementById('filter_te').checked,
	DST:document.getElementById('filter_dst').checked,
	K:document.getElementById('filter_k').checked
    }

    players = document.getElementById('players').rows;
    for (i=0; i < players.length; i++){
	if (filters[players[i].player.pos]){
	    players[i].style.visibility = "visible";
	    players[i].style.display = "table";
	}
	else{
	    players[i].style.visibility = "hidden";
	    players[i].style.display = "none";
	}
    }
    
}

function filterSelectAll(){
    document.getElementById('filter_qb').checked = true;
    document.getElementById('filter_rb').checked = true;
    document.getElementById('filter_wr').checked = true;
    document.getElementById('filter_te').checked = true;
    document.getElementById('filter_dst').checked = true;
    document.getElementById('filter_k').checked = true;
    filterPlayersByPosition();
}

function updatePlayerAvailability(){
    activePlayer.row.classList.toggle('available');
    activePlayer.row.classList.toggle('unavailable');
}

function updatePlayerMyTeam(){
    activePlayer.row.classList.toggle('onmyteam');
}

function selectPlayer(p){
    t = p.team;
    displayTeamDepthChart(t);
    document.getElementById('playerSearch').value = p.name;
    activePlayer = p;

    document.getElementById('isAvailableBox').checked = 
	p.row.classList.contains('available');

    document.getElementById('isOnMyTeamBox').checked = 
	p.row.classList.contains('onmyteam');
}

function addPlayer(p){
    players = document.getElementById('players');
    row = players.insertRow(-1);
    row.player = p;
    row.classList.add('playerListEntry');
    row.addEventListener("click",
			 function() { selectPlayer(p); }
			)
    row.insertCell(-1).innerHTML = p.rank;
    row.insertCell(-1).innerHTML = p.pos;
    row.insertCell(-1).innerHTML = p.team;
    row.insertCell(-1).innerHTML = p.name;

    p.row = row;

    opt = document.createElement("OPTION");
    opt.value = p.name;
    document.getElementById('playersList').appendChild(opt);

    row.classList.add('available');
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

function getPlayerByName(name) {
    return playerDataYahoo.find(
				function (value, index, array){ 
				    return value.name == name; 
				});
}

function initializeDraft(){
    playerDataYahoo.forEach(addPlayer);
    teamDepthCharts.forEach(addDepthChart);


    var searchBar = document.getElementById('playerSearch');

    searchBar.addEventListener(
        "select",
	function (){
	    selectPlayer(getPlayerByName(
			     document.getElementById('playerSearch').value));
	});

    /* @todo: This isn't working */
    searchBar.addEventListener(
        "onfocus",
	function (){
	    document.getElementById('console').innerHTML = "blah";
	});

    document.getElementById('teamsSearch')
	.addEventListener("select", 
			  function() {
			      displayTeamDepthChart(document.getElementById('teamsSearch').value);
			  });

    filterSelectAll();

    document.getElementById('isAvailableBox').addEventListener("click", updatePlayerAvailability);
    document.getElementById('isOnMyTeamBox').addEventListener("click", updatePlayerMyTeam);
}
