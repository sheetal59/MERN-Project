const { Schema, model, Mongoose } = require("mongoose");

const serviceSchema = new Schema({
    name: {type: String, required: true},
    age_group:{type: String, required: true},
    levels:{type: String, required: true},
    description:{type:String, required: true},
    suitable_disorders:{type: String, required: true},
});

const Service = model("Services",serviceSchema);

module.exports = Service;