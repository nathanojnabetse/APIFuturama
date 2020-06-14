const db = require("../models");
const Place = db.places;

// Crear y guardar un nuevo lugar
exports.create = (req, res) => {
    // Validate request
    if (!req.body._id) {
      res.status(400).send({ message: "Mensaje vacio" });
      return;
    }
    // Crear un lugar
    const place = new Place({
        _id: req.body._id,
        name: req.body.name,
        location: req.body.location,
        nativeSpecies: req.body.nativeSpecies,
        memberOf: req.body.memberOf,
        image: req.body.image
    });

    // Guardar el lugar en la BDD
    place
      .save(place)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error al crear un nuevo lugar."
        });
      });
  };

  //Recuperar los elementos de la BDD
  exports.findAll = (req, res) => {
    const _id = req.query._id;
    var condition = _id ? { _id: { $regex: new RegExp(_id), $options: "i" } } : {};
  
    Place.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar los lugares"
        });
      });
  };

// Actualizar un lugar por id en la petición
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "No pueden estar los datos vacios"
      });
    }
  
    const _id = req.body._id;


    Place.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar el lugar con el id=${_id}. `
          });
        } else res.send({ message: "lugar actualizado existosamente" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el lugar con el id=" + _id
        });
      });
  };

//Eliminar un lugar por id
exports.delete = (req, res) => {
    const _id = req.body._id;
  
    Place.findByIdAndRemove(_id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede borrar el lugar con el id=${_id}.`
          });
        } else {
          res.send({
            message: "Lugar Borrado Exitosamente!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se puede borrar el lugar con el id=" + _id
        });
      });
  };