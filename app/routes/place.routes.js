module.exports = app => {
    const places = require("../controllers/place.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo personaje
    router.post("/", places.create);
  
    // Retrieve all Tutorials
    router.get("/", places.findAll);

    // Update a Tutorial with id
    router.put("/:id", places.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", places.delete);
  
    app.use('/api/places', router);
  };