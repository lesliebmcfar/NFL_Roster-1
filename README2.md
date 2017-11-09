---
# Players Service & Encapsulation
---

We have already briefly talked about one of the three pillars of object oriented programming, Encapsulation.
We discussed the important role it plays in software development, and how it promotes efficient, maintainable code.

Encapsulation is an Object Oriented Programming concept that binds together the data and functions that manipulate the data, and that keeps both safe from outside interference and misuse. Data encapsulation led to the important OOP concept of data hiding.

While the concept of Encapsulation is very broad, and can be difficult to pull off completely, we are attempting to break it down into a few basic principles.

- Single Responsibility, or "One function, One job".
  - Do your best to ensure a function doesn't do too much. If it is doing too much
  try to separate(refactor) out each task into other smaller functions.

- Encapsulate/WrapUp common behavior.
  - If you have functions(methods) or data(properties) that are similar in behavior, wrap them up into a single unit, using a class(constructor).
  
- "Keep your private parts private".
  - Use closure to keep functionality specific to an object within the object itself. 

Now let's discuss how we are going to get player data from the CBS API and how we can encapsulate that data into its own unit. Our proof of concept is very basic.

  - Retrieve player data from an external source.
    - Only load this data one time, then store it to a local variable.
  - Filter player data by certain properties such as Name, Position, Team, etc... 
    - To make it simple we started with 2 basic functions.
      - getPlayersByTeam(teamName);
        - this method receives a name of a team and returns an array of all players on that team.  
      - getPlayersByPosition(position);
        - this method receives a player's position and returns an array of all players with that position.
    - Each function relies on the data retrieved from the external source.  
 
Because every item in our proof of concept is similar in behavior, we will want to place everything inside a common unit. 
Lets call it PlayersService. 

PlayersService is just a constructor.
```javascript
 function PlayersService(){
    //...
  } 
```

Looking back at our proof of concept, we know our service needs to have player data, and a few functions. Let's put a few examples in just to get the ball rolling. We will eventually want to sort players somehow so adding in the ability to do this by team and by position might be a good start.

```javascript
function PlayersService(callback){
  var playersData = [];
  
  this.getPlayersByTeam = function(teamName){
    //return an array of all players who match the given teamName.
  }
  
  this.getPlayersByPosition = function(position){
    //return an array of all players who match the given position.
  }
} 
``` 

Once we have the skeleton laid out, we can implement the functionality.
We will use a new method called <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">.filter()</a>. Check out that link, and the additional content below for more details on filter.

```javascript
function PlayersService(callback){
  var playersData = [];
  
  this.getPlayersByTeam = function(teamName){
    return playersData.filter(function(player){
      if(player.team == teamName){
        return true;
      }
    });
  }
  
  this.getPlayersByPosition = function(position){
    //return an array of all players who match the given position.
  }
} 
```

Now we just need to write the function to get the player data from the API. And call
that function every time we create a new Players Service.

```javascript
function PlayersService(callback){
    var playersData = [];
    
    this.getPlayersByTeam = function(teamName){
    	// ...
    }
    
    this.getPlayersByPosition = function(position){
      // ...
    }
    
    function loadPlayersData(){
      
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      
      var localData = localStorage.getItem('playersData');
      if(localData){
      	playersData = JSON.parse(localData);
      	return callback(); 
      	//return will short-circuit the loadPlayersData function
      	//this will prevent the code below from ever executing
      }
      
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(apiUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback()4590-i=
        });
    }	
loadPlayersData(); //call the function above every time we create a new service
} 
```

And there you have it. A basic, easy to use Players Service. To make it work, we will go back to our main controller and instantiate the PlayerService. The PlayerService is going out to make an async call, and we will want to make sure our page shows some sort of loader while we are waiting for the data to load. To accomplish this task we can setup a simple bool for loading and then flip that bool once the ready function is called by our player service.

```javascript
var loading = true; //Start the spinner
var playerService = new PlayerService(ready);

function ready(){
    loading = false; //stop the spinner

    //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
    
    $('some-button').on('click',function(){
      var teamSF = playerService.getPlayersByTeam("SF");
    }
}
    
```

Before you are turned loose there are a few things you will want to know about this API. First, it will give you back a ton of data, and not all of it comes how you would expect, nor is all of it usable. Since this is coming from a fantasy football API each team will have "players" that aren't actual people. 

For example the Seahawks have a player with the name "Seahawks" and the position of "D" in a fantasy league this represents the entire defense, giving the player all the points racked up from the defence. It is up to you if you want to keep these "empty" players in your roster. 

Additionally you will find some of the players pictures are different sizes or non-existant make sure that you have contingencies for such things.

Once it is all set up feel free to re-integrate adding players, adding and removing players from your roster, etc.

Good luck, and Happy Coding.


## REQUIREMENTS

 ##### Functionality
  - Utilizes a PlayerService & PlayerController
  - Players can be added and removed from user team
  
 ##### Visualization
  - Players can be filtered by Team
  - Players can be filtered by Position
  - Players can be filtered by Name
 

---
##### Bonus Challenges
  - Only one instance of a player on the team is allowed
  - Teams have a max size 
  - Only one player of each position
---

# Array.Filter
---
In its simplest form, Array.filter is a way to filter a large array intto a smaller array. 

Let's look at the following example of filtering an array using Array.forEach();
In the examples below, our goal is to filter a list of players, retaining only the players on the team "SF".
```javascript
var playersData = [] //Assume this is a large collection of players.
var filteredPlayers = [];
playersData.forEach(function(player){    //on a for each, it takes in a function that's parameter is an single item from the array
    if(player.team === "SF"){ //check to see if they are on the team SF
      filteredPlayers.push(player); //if they are, add them to the array.
    }
});

console.log(filteredPlayers); //this should be all players that are on SF.
```

That's not too much code, and pretty easy to follow; however, JavaScript has an easier, cleaner way
to filter arrays. This is where we use Array.filter() instead of Array.forEach().

```javascript
var playersData = [] //Assume this is a large collection of players.

var filteredPlayers = playersData.filter(function(player){ //replace forEach with filter.
    if(player.team === "SF"){ //check to see if they are on the team SF
      return true; //instead of adding it to an array, just return true.
    }
});

console.log(filteredPlayers); //this should be all players that are on SF.
```

The code is very similar, but we do not need to push any objects to a temporary array.
Array.filter() works by looking at the response from the callback. If we return TRUE inside 
the callback it will add the current item to the filtered list, if we return FALSE or nothing, 
then it will exclude the current item from the filtered list.

Note, Array.filter() does not modify the original array; instead it creates a new one.
