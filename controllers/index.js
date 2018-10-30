module.exports = (app) => {

  require('../routes/create-routes')(app);
  require('../routes/custom-routes')(app);
  require('../routes/delete-routes')(app);
  require('../routes/read-routes')(app);
  require('../routes/update-routes')(app);

};
