// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', function (req, res){
    utcDate = new Date();
    res.json({'unix': utcDate.getTime(), 'utc': utcDate.toUTCString()});
});

app.get('/api/:date?', function (req, res){
    let dateInput = req.params.date;
    
    if(parseInt(dateInput) > 10000){ 
        /*For some reason if I left the timestamp as a String it would not recognice it as a valid date
        So first I check that it's greater than 10000 to be sure its a timestamp and not a year and then I convert it to an integer to create the UTC date*/
        let unixDate = new Date(parseInt(dateInput));
        if(unixDate == 'Invalid Date')
            return res.json({'error': 'Invalid Date'});
        return res.json({'unix': unixDate.getTime(), 'utc': unixDate.toUTCString()});
    }
    
    let utcDate = new Date(dateInput);
    if (utcDate == 'Invalid Date')
        return res.json({'error': 'Invalid Date'});
    return res.json({'unix': utcDate.getTime(), 'utc': utcDate.toUTCString()});
});




// listen for requests :)
var listener = app.listen(process.env['PORT'], function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
