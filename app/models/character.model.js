module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
          _id: String,
          name: String,
          gender: String,
          age: Number,
          species: String,
          occupation: String,
          image: String,
          location: String,
          isAlive: Boolean
        }
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object._id = _id;
      return object; 
  });
    
  const Character = mongoose.model("character", schema);
      return Character;
  };