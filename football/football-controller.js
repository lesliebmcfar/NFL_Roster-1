function FootballController() {
  // getter on instruction from init, send server notice to stat with constructor 
  var playerService = new PlayerService(getData)
  //getter tell service to load the data (run function) and return it to template for display

  function getData(playersData) {
    var template = ""
    // for loop iterates over data  
    for (var i = 0; i < playersData.length; i++){
      var player = playersData[i]
    
      template += `
    <template class = "player-card">
    <div class="w3-card-4 player-card"id="player-card">
     <div class="row">
     <div class="my-team id='filteredPlayers'">
            <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt=""></div> 
            <h6>${player.fullName}</h6>
            <h6>${player.teamName}</h6>
            <h6>${player.position}</h6>
          </div>
        </div>
      </div>`

      document.getElementById("players").innerHTML = template
    }



    {
      template += `
  <template class = "player-card">
  <div class="w3-card-4 player-card"id="player-card"> 
  <div class="player-roster" id="myPlayer">
    <div class="row">
      <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt=""></div> 
      <h6>${player.fullName}</h6>
      <h6>${player.teamName}</h6>
      <h6>${player.position}</h6>
      {/*   add button to remove players from myTeam */}
    </div>
  </div>
</div>`
    }
    document.getElementById("myPlayer").innerHTML = template;
  }
}
/*   
  this.getPlayerByTeam = function 
  currently stumped, skip and go straight to buttons for now  
 */









