const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
/* 
routes config
*/
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));
/* port*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
