// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  if (!date) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  }
  if (isNaN(date)) {
    const d = new Date(date);

    if (d.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
    // console.log(Date.UTC(d))
    res.json({ unix: d.getTime(), utc: d.toUTCString() });
  }
  const d = new Date(Number(date));
  if (d.toString() === "Invalid Date") {
    const da = new Date(parseInt(date));
    res.json({ error: "Invalid Date" });
  }
  // console.log(Date.UTC(d))
  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

app.get("/api/", (req, res) => {
  res.json({ unix: new Date().toTimeString(), utc: new Date().toTimeString() });
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
