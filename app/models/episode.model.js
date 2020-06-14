module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
          _id: String,
          name: String,
          season: String,
          _idCharacter: String,
          _idPlace: String
        }
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object._id = _id;
      return object; 
  });
    
  const Episode = mongoose.model("episode", schema);
      return Episode;
  };