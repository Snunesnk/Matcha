module.exports = app => {
    const user = require("../handlers/user.handler.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/", user.findAll);
  
    // Retrieve all verified Users
    router.get("/verified", user.findAllVerified);
  
    // Retrieve a single User with login
    router.get("/:login", user.findOne);
  
    // Update a User with login
    router.put("/:login", user.update);
  
    // Delete a User with login
    router.delete("/:login", user.delete);
  
    // Delete all Users
    router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
  };