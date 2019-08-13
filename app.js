const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
///passport config
require("./config/passport")(passport);
const connectDB = require("./config/db");
//connect to db
connectDB();
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
// bodyparser
app.use(express.urlencoded({ extended: false }));
//Express sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
/* 
routes config
*/
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));
/* port*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
