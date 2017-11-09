/* //Service holds fuctions that are executed with buttons coded on controller
1. fetch and load all the data
2. create functions to create myTeam both add and remove
3. functions to list a roster of teams
functions(actions) only,  */

function PlayerService(callback) {

    //define variables to be accessed by all of service.js
    var playersData = []
    var myTeam = []
    var getData = []
    var playerCards = []

    function loadPlayersData() {

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData)
            console.log(playersData)
            return (callback);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
        //call the function above every time we create a new service
    }
    //all independent functions but need access to playersData


    /*   function PlayersService(callback){
          var playersData = [];
    */

    this.getPlayersByTeam = function (teamName) {
        playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });
    }

    this.getPlayersByPosition = function (position) {
        return playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }

    this.getPlayersByName = function (name) {
        return playersData.filter(function (player) {
            if (player.name == name) {
                return true;
            }
        });

    }
    loadPlayersData();
}



