const encrpyt = require("../helper/encrpyt.js");
//don't have user model yet so this is dummy data for now, replace later.
let user1 = {
  username: "dummy",
  password: "dummy"
}
//

module.exports = (app) => {
  app.post("/api/login",(req,res) => {
    console.log(req.body);
    let token = encrpyt.encrpyt(req.body.username,req.body.password);
    //the token will also get saved to the user database
    //if login checks out we'll return a token to the client
    res.json(token);
  });
};
