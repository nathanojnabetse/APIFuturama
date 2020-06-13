module.exports = app => {
    const characters = require("../controllers/character.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo personaje
    router.post("/", characters.create);
  
    // Retrieve all Tutorials
    router.get("/", characters.findAll);

    // Update a Tutorial with id
    router.put("/:id", characters.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", characters.delete);
  
    app.use('/api/characters', router);
  };