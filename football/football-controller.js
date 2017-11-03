function FootballController() {
    // PRIVATE PARTS
    var footballService = new FootballService()

    function ready(){
        loading = false; 
                     $('some-button').on('click',function(){
          var teamSF = footballService.getPlayersByTeam("SF");
        }
    
}