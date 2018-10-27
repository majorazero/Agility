module.exports = (app) => {

  app.post("/api/login",(req,res) => {
    console.log(req.body);
    res.json("Got it.");
  });
};
