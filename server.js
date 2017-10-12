// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/
 var personalProfile = {
  name: 'Juhui(Ray) Xue',
  githubLink: 'https://github.com/xuejuhui',
  personalSiteLink: 'https://xuejuhui.github.io/',
  currentCity: 'San Francisco'
 }

 var games = [
 {
  name: 'League of Legend',
  type: 'Moba',
  timeSpend: 1312
},
{
  name: 'DarkSoul',
  type: 'ARPG',
  timeSpend: 120
},
{
  name: 'Clash of Royale',
  type: 'Mobile Strategy',
  timeSpend: 200
},
{
  name: 'Candy Crush Saga',
  type: 'Mobile Puzzle',
  timeSpend: 100
}
]

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function(req, res){
  res.json({profile: personalProfile});
  console.log(personalProfile);
});

app.get('/api/games',function(req, res){
  res.json({Games: games});
});

app.post('/api/games', function(req, res){
     let name = req.body.name;
       let type = req.body.type;
    var newGames = {name: name, type: type};
    todos.push(newGames);
    res.json(newGames);
})

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
