module.exports = app => {
    const link = require("../handlers/link.handler.js");
  
    var router = require("express").Router();
  
    // Create a new link between two users
    router.post("/:login_a/:login_b", link.create);
    
    // Update a Link with logins
    // router.put("/:login_a/:login_b", link.update);
    
    // // Delete a Link with logins
    // router.delete("/:login_a/:login_b", link.delete);

    // // Retrieve all links for a user
    // router.get("/:login", link.findAllLinks);
    
    // // Retrieve all matchs for a user
    // router.get("/match/:login", link.findAllMatch);  
  
    // // Delete all Users
    // router.delete("/", link.deleteAll);
  
    app.use('/api/link', router);
  };