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

    filters = {
		QB:!document.getElementById('filter_qb').classList.contains('inactive'),
		RB:!document.getElementById('filter_rb').classList.contains('inactive'),
		WR:!document.getElementById('filter_wr').classList.contains('inactive'),
		TE:!document.getElementById('filter_te').classList.contains('inactive'),
		DST:!document.getElementById('filter_dst').classList.contains('inactive'),
		K:!document.getElementById('filter_k').classList.contains('inactive'),
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
		document.getElementById(id).classList.remove('inactive');
    }
    filterPlayerList();
}

function filterSelectOne(showPos){
    for (pos of ['qb', 'rb', 'wr', 'te', 'dst', 'k']){
		id = 'filter_' + pos;
		if (pos == showPos) {
			document.getElementById(id).classList.remove('inactive');
		} else {
			document.getElementById(id).classList.add('inactive');
		}
    }
    filterPlayerList();
}

function filterToggle(pos){
	id = 'filter_' + pos;
	document.getElementById(id).classList.toggle('inactive');
	filterPlayerList();
}

function updatePlayerAvailability(){
    activePlayer.row.classList.toggle('available');
    activePlayer.row.classList.toggle('unavailable');
	document.getElementById('isAvailable').classList.toggle('active');
	document.getElementById('isAvailable').classList.toggle('inactive');
}

function initMyTeam(){
    var tbl = document.getElementById('myteam');
    var pos;

    for (pos of (["QB", "RB", "WR", "TE", "DST", "K"])) {
	row = tbl.insertRow(-1);
	row.classList.add('depthchart');
	th = document.createElement("TH");
	th.innerHTML = pos;
	row.appendChild(th);
	th.classList.add('depthchart');
    }
}

function displayMyTeam(){
    document.getElementsByClassName('onmyteam');

    var tbl = document.getElementById('myteam');
    var pos;

    positions = ["QB", "RB", "WR", "TE", "DST", "K"];

    for (let i = 0; i < positions.length; i++) {
	pos = positions[i];
	row = tbl.rows[i];
	while (row.cells.length > 1){ /** need one cell to make row display */
	    row.deleteCell(-1);
	}
        row.cells[0].player = null;
    }

    for (p of document.getElementsByClassName('onmyteam')){
	player = p.player;
	pos = player.pos;
	i = positions.indexOf(pos);
	row = tbl.rows[i];
	cell = row.insertCell(-1);
	cell.innerHTML = player.name + ' (' + teamByes[player.team] + ')';
	cell.player = player;
	cell.classList.add('depthchart');
	cell.classList.add('myteamplayer');
    }

    if (!activePlayer.row.classList.contains('onmyteam')) {
        player = activePlayer;
        pos = player.pos;
        i = positions.indexOf(pos);
        row = tbl.rows[i];
        i = 1;
        while (i < row.cells.length && player.rank > row.cells[i].player.rank) {
            i += 1;
        }
        cell = row.insertCell(i); 
        cell.innerHTML = player.name + ' (' + teamByes[player.team] + ')';
        cell.player = player;
        cell.classList.add('depthchart');
        cell.classList.add('prospectiveteamplayer');
    }

    highlightPlayerOverlap();
}

function updatePlayerMyTeam(){
    activePlayer.row.classList.toggle('onmyteam');
	document.getElementById('isOnMyTeam').classList.toggle('active');
	document.getElementById('isOnMyTeam').classList.toggle('inactive');
    displayMyTeam();
}

function highlightPlayerOverlap(){

    if (activePlayer.row.classList.contains('onmyteam')) {
        return ;
    }

    for (cell of document.getElementsByClassName('myteamplayer')){
	myPlayer = cell.player;
	if (myPlayer.pos == activePlayer.pos){
	    cell.classList.add('activePosition');
	}
	else {
	    cell.classList.remove('activePosition');
	}

	if (teamByes[myPlayer.team] == teamByes[activePlayer.team]){
	    cell.classList.add('activeByeWeek');
	}
	else {
	    cell.classList.remove('activeByeWeek');
	}
    }
}

function clearPlayerDisplay(){
    document.getElementById('playerName').innerHTML = "The Player";
    document.getElementById('playerRank').innerHTML = "Rank";
    document.getElementById('playerCategorization').innerHTML = "Categorization";
    document.getElementById('playerNotes').innerHTML = "Notes";
}

function selectPlayer(p){

	/* do this now so, if previously selected player became unavailable, he'll be removed from list */
	filterPlayerList(); 
	
    console.log("selectPlayer" + p.name);
    t = p.team;
    displayTeamDepthChart(t);
    document.getElementById('playerSearch').value = p.name;
    activePlayer = p;

	coll = 	document.getElementsByClassName('selectedPlayer');
	for (let i=0; i < coll.length; i++) {
		coll[i].classList.remove('selectedPlayer');
	}
	p.row.classList.add('selectedPlayer');

	if (p.row.classList.contains('available')) {
		console.log('Setting available active');
		document.getElementById('isAvailable').classList.remove('inactive');
	} else {
		console.log('Setting available inactive');
		document.getElementById('isAvailable').classList.add('inactive');
	}

	if (p.row.classList.contains('onmyteam')) {
		document.getElementById('isOnMyTeam').classList.remove('inactive');
	} else {
		document.getElementById('isOnMyTeam').classList.add('inactive');
	}

    document.getElementById('playerName').innerHTML = p.name;

    document.getElementById('playerRank').innerHTML = 
	"Rank: " + p.rank + " (avg)</br>Range: " + p.best + "-" + p.worst + ".   StdDev: " + p.stddev;

    document.getElementById('playerCategorization').innerHTML = 
        p.pos + " Tier: " + p.tier + "</br>ECR vs ADP: " + p.ecrvsadp;

    document.getElementById('playerNotes').innerHTML = "Notes: " + p.notes;

    displayMyTeam();
}

function addPlayer(p){
    players = document.getElementById('players');
    row = players.insertRow(-1);
    row.player = p;
    row.classList.add('playerListEntry');
	if ((p.tier % 2) == 0) {
		row.classList.add('eventier');
	} else {
		row.classList.add('oddtier');
	}
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
    row = tbl.insertRow(-1);
    row.classList.add('depthchart');
    th = document.createElement("TH");
    th.classList.add('depthchart');
    row.appendChild(th);
    cell = row.insertCell(-1);
    cell.classList.add('depthchart');

	if (dc != null) {
		tbl.team = dc.team;
		th.innerHTML = dc.team;
		cell.innerHTML = 'Bye: ' + teamByes[dc.team];
	} else {
		tbl.team = null;
		th.innerHTML = "Team";
		cell.innerHTML = 'Bye: ';
	}

	numToDisplay = {QB:1, RB:4, WR:5, TE:2};

    for (pos of (["QB", "RB", "WR", "TE"])) {
		row = tbl.insertRow(-1);
		row.classList.add('depthchart');
		th = document.createElement("TH");
		th.innerHTML = pos;
		row.appendChild(th);
		th.classList.add('depthchart');

		if (dc != null) {
			let i = 0;
			for (name of dc[pos]) {
				if (i >= numToDisplay[pos]) {
					break;
				}
				i += 1;
				cell = row.insertCell(-1);
				cell.innerHTML = name;
				cell.classList.add('depthchart');
			}
		}
    }

	if (dc != null) {
		opt = document.createElement("OPTION");
		opt.value = dc.team;
		document.getElementById('teamsList').appendChild(opt);
	
		tbl.style.display = 'none';
		tbl.style.visibility = 'hidden';
	}

    document.getElementById('s_depthchart').appendChild(tbl);
}

function getPlayerByName(name) {
    return playerData.find(
				function (value, index, array){ 
				    return value.name == name; 
				});
}

function initializeDraft(){
    playerData.forEach(addPlayer);
	addDepthChart(null);
    teamDepthCharts.forEach(addDepthChart);
    initMyTeam();

    var searchBar = document.getElementById('playerSearch');

    searchBar.addEventListener(
        "input",
	function (){
	    val = document.getElementById('playerSearch').value;
	    console.log("searchbar:input: " + val);
	    p = getPlayerByName(val);
	    if (p) {
		selectPlayer(getPlayerByName(val));
		rows = document.getElementById('players').rows;
		height = rows[1].getBoundingClientRect().top -
		    rows[0].getBoundingClientRect().top;
		console.log("height:" + height);
		rank=p.rank;
		document.getElementById('s_players').scrollTop=height*(rank-10);
	    }
	});

    document.getElementById('teamsSearch')
	.addEventListener("input",
			  function() {
			      clearPlayerDisplay();
			      displayTeamDepthChart(document.getElementById('teamsSearch').value);
			  });

    filterSelectAll();

    /* Add player list filtering */
	document.getElementById('filter_qb').addEventListener("click", function () { filterToggle('qb'); });
	document.getElementById('filter_rb').addEventListener("click", function () { filterToggle('rb'); });
	document.getElementById('filter_wr').addEventListener("click", function () { filterToggle('wr'); });
	document.getElementById('filter_te').addEventListener("click", function () { filterToggle('te'); });
	document.getElementById('filter_dst').addEventListener("click", function () { filterToggle('dst'); });
	document.getElementById('filter_k').addEventListener("click", function () { filterToggle('k'); });

	document.getElementById('filter_qb').addEventListener("dblclick", function () { filterSelectOne('qb'); });
	document.getElementById('filter_rb').addEventListener("dblclick", function () { filterSelectOne('rb'); });
	document.getElementById('filter_wr').addEventListener("dblclick", function () { filterSelectOne('wr'); });
	document.getElementById('filter_te').addEventListener("dblclick", function () { filterSelectOne('te'); });
	document.getElementById('filter_dst').addEventListener("dblclick", function () { filterSelectOne('dst'); });
	document.getElementById('filter_k').addEventListener("dblclick", function () { filterSelectOne('k'); });

	document.getElementById('filter_unavailable').addEventListener("click", filterPlayerList);
    document.getElementById('isAvailable').addEventListener("click", updatePlayerAvailability);
    document.getElementById('isOnMyTeam').addEventListener("click", updatePlayerMyTeam);
}
