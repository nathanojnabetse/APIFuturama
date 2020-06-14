module.exports = app => {
    const episodes = require("../controllers/episode.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo personaje
    router.post("/", episodes.create);
  
    // Retrieve all Tutorials
    router.get("/", episodes.findAll);

    // Update a Tutorial with id
    router.put("/:id", episodes.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", episodes.delete);
  
    app.use('/api/episodes', router);
  };