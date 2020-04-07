const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const mongoone = require("mongoose");
require("./models/user"); // just execute the js file
require("./models/survey");
const keys = require("./config/keys");
const passport = require("passport");
require("./services/passport");

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    keys: [keys.cookieKey] // encrypt cookies
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoone.connect(keys.mongoURI);

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/*
  app.use are middlewares middleware are used to modify incomming
  request before they are sent to route handlers.

  middleware are used to peform some common task before executing every 
  route handler in this case middle ware is taking incomming request
  and extracting cookie data from it and deserilising it to give us our 
  current user and this is executed before every route handler as for 
  every route handler we need current users object
*/

/*
the alternative to cookie session is express session and main diffrence
between them is cookie session store all session related data  on the cookie
itself

express session stores only session id on the cookie and the users data
is stored in some cookie store which is somewhere else
with this we can save as much data as we want to for incomming users request

with cookie session we can store on 14kb of session data on the cookie
*/
