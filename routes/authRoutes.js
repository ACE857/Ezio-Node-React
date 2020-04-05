const passport = require("passport");
module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Hey Yo");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/current_user", (req, res) => {
    //res.send(req.session); // session is nothing but mongo document id
    res.send(req.user); // passport deseriliser is giving us the user model
  });

  app.get("/api/logout", (req, res) => {
    req.logout(); // req.logout is function that is attached to request by passport
    res.redirect("/");
  });
};
