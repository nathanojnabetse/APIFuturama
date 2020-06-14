const db = require("../models");
const Episode = db.episodes;
const Character = db.characters;
const Place = db.places;

// Crear y guardar un nuevo episodio
exports.create = (req, res) => {
    // Validate request
    if (!req.body._id) {
      res.status(400).send({ message: "Mensaje vacio" });
      return;
    }

    console.log("******"+req.body._id);
    console.log("******"+req.body.name);
    console.log("******"+req.body.season);
    console.log("******"+req.body._idCharacter);
    console.log("******"+req.body._idPlace);
    // Crear un episodio
    const episode = new Episode({
        _id: req.body._id,
        name: req.body.name,
        season: req.body.season,
        _idCharacter: req.body._idCharacter,
        _idPlace: req.body._idPlace
    });

    // Guardar el episodio en la BDD
    episode
      .save(episode)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error al crear un nuevo episodio."
        });
      });
  };

  //Recuperar los elementos de la BDD
  exports.findAll = (req, res) => {
    const _id = req.query._id;
    var condition = _id ? { _id: { $regex: new RegExp(_id), $options: "i" } } : {};
  
    Episode.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al listar los Episodios"
        });
      });
  };

// Actualizar un episodio por id en la petición
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "No pueden estar los datos vacios"
      });
    }
  
    const _id = req.body._id;
  
    Episode.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar el episodio con el id=${_id}. `
          });
        } else res.send({ message: "episodio actualizado existosamente" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el episodio con el id=" + _id
        });
      });
  };

//Eliminar un episodio por id
exports.delete = (req, res) => {
    const _id = req.body._id;
  
    Episode.findByIdAndRemove(_id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede borrar el episodio con el id=${_id}.`
          });
        } else {
          res.send({
            message: "Episodio Borrado Exitosamente!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se puede borrar el episodio con el id=" + _id
        });
      });
  };