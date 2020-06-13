const db = require("../models");
const Character = db.characters;

// Crear y guardar un nuevo personaje
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({ message: "Mensaje vacio" });
      return;
    }
    // Crear un personaje
    const character = new Character({
      _id: req.body.id,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      species: req.body.species,
      occupation: req.body.occupation,
      image: req.body.image,
      location: req.body.location,
      isAlive: req.body.isAlive ? req.body.isAlive : false
    });

    // Guardar el personaje en la BDD
    character
      .save(character)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error al crear un nuevo personaje."
        });
      });
  };

  //Recuperar los elementos de la BDD
  exports.findAll = (req, res) => {
    const _id = req.query.id;
    var condition = _id ? { _id: { $regex: new RegExp(_id), $options: "i" } } : {};
  
    Character.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar los personajes"
        });
      });
  };

// Actualizar un personaje por id en la petición
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "No pueden estar los datos vacios"
      });
    }
  
    const id = req.params.id;
  
    Character.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar el personaje con el id=${id}. `
          });
        } else res.send({ message: "Personaje actualizado existosamente" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el personaje con el id=" + id
        });
      });
  };

//Eliminar un personaje por id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede borrar el personaje con el id=${id}.`
          });
        } else {
          res.send({
            message: "Personaje Borrado Exitosamente!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se puede borrar el personaje con el id=" + id
        });
      });
  };
