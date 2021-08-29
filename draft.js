var activePlayer;

function displayTeamDepthChart(t) {
    for (dc of document.getElementsByClassName("teamdepthchart")){
	dc.style.display = 'none';
	dc.style.visibility = 'hidden';
	if (dc.team == t){
	    dc.style.display = 'table';
	    dc.style.visibility = 'visible';
	}
    }

    document.getElementById("teamsSearch").value = t;
}

function filterPlayerList(){
    document.getElementById('console').innerHTML = "blah";

    filters = {
	QB:document.getElementById('filter_qb').checked,
	RB:document.getElementById('filter_rb').checked,
	WR:document.getElementById('filter_wr').checked,
	TE:document.getElementById('filter_te').checked,
	DST:document.getElementById('filter_dst').checked,
	K:document.getElementById('filter_k').checked,
	unavailable:document.getElementById('filter_unavailable').checked
    }

    for (row of document.getElementById('players').rows){
	p = row.player;
	var show = filters[p.pos];
	if (filters['unavailable'] == false && row.classList.contains("unavailable")){
	    show = false;
	}
	if (show){
	    row.classList.remove("hiddenPlayer");
	}
	else {
	    row.classList.add("hiddenPlayer");
	}
    }
    
}

function filterSelectAll(){
    for (pos of ['qb', 'rb', 'wr', 'te', 'dst', 'k', 'unavailable']){
	id = 'filter_' + pos;
	document.getElementById(id).checked = true;
    }
    filterPlayerList();
}

function updatePlayerAvailability(){
    activePlayer.row.classList.toggle('available');
    activePlayer.row.classList.toggle('unavailable');
}

function updatePlayerMyTeam(){
    activePlayer.row.classList.toggle('onmyteam');
}

function displayMyTeam(){
    /** @todo */
    document.getElementsByClass('onmyteam');
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

    document.getElementById('playerName').innerHTML = p.name;

    document.getElementById('playerRank').innerHTML = 
	"Rank: " + p.rank + " (avg)</br>Range: " + p.best + "-" + p.worst + ".   StdDev: " + p.stddev;

    document.getElementById('playerCategorization').innerHTML = 
        p.pos + " Tier: " + p.tier + "</br>Value: " + p.value;

    document.getElementById('playerNotes').innerHTML = "Notes: " + p.notes;
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
    row.insertCell(-1).innerHTML = p.tier;
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

    tbl.classList.add('teamdepthchart'); /* for searching */
    tbl.classList.add('depthchart'); /* for styling */
    tbl.team = dc.team;
    row = tbl.insertRow(-1);
    row.classList.add('depthchart');
    th = document.createElement("TH");
    th.innerHTML = dc.team;
    th.classList.add('depthchart');
    row.appendChild(th);

    for (pos of (["QB", "RB", "WR", "TE"])) {
	row = tbl.insertRow(-1);
	row.classList.add('depthchart');
	th = document.createElement("TH");
	th.innerHTML = pos;
	row.appendChild(th);
	th.classList.add('depthchart');
	for (name of dc[pos]) {
	    cell = row.insertCell(-1);
	    cell.innerHTML = name;
	    cell.classList.add('depthchart');
	}
    }
    tbl.style.display = 'none';
    tbl.style.visibility = 'hidden';
    document.getElementById('s_depthchart').appendChild(tbl);

    opt = document.createElement("OPTION");
    opt.value = dc.team;
    document.getElementById('teamsList').appendChild(opt);
}

function getPlayerByName(name) {
    return playerData.find(
				function (value, index, array){ 
				    return value.name == name; 
				});
}

function initializeDraft(){
    playerData.forEach(addPlayer);
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

    /* Add player list filtering */
    for (pos of ['qb', 'rb', 'wr', 'te', 'dst', 'k', 'unavailable']){
	id = 'filter_' + pos;
	document.getElementById(id).addEventListener(
            "click", 
	    filterPlayerList);
    }

    document.getElementById('isAvailableBox').addEventListener("click", updatePlayerAvailability);
    document.getElementById('isOnMyTeamBox').addEventListener("click", updatePlayerMyTeam);
}
