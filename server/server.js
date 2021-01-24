//------PACKAGES
const express = require("express");
const app = express();

//----FILES
const retrieve_input_route = require("./routes/retrieve-input");
const retrieve_json_route = require("./routes/retrieve-json");
const retrieve_url_route = require("./routes/retrieve-id");
//----
const home_route = require("./page-routes/home-route");
const admin_route = require("./page-routes/admin-route");
const per_unit_route = require("./page-routes/per-unit-route");

//-----EXPRESS CONIFG
app.use(express.json());
app.use("/static", express.static(`${__dirname}/../client`));
app.set("view engine", "ejs");

//----API ROUTES
try {
  app.use(retrieve_input_route);
  app.use(retrieve_json_route);
  app.use(retrieve_url_route);
  app.use(home_route);
  app.use(admin_route);
  app.use(per_unit_route);
} catch (err) {
    console.log(err.message);
}

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("litening on port " + port);
});
