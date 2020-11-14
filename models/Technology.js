const { model, Schema , Types} = require("mongoose");

const schema = new Schema({
    name: {type:String},
    technologies:[]
})


module.exports = model("Technology", schema);