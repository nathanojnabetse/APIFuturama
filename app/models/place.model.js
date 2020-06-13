module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
          _id: String,
          name: String,
          location: String,
          nativeSpecies: String,
          memberOf: String,
          image: String
        }
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object._id = _id;
      return object; 
  });
    
  const Place = mongoose.model("place", schema);
      return Place;
  };