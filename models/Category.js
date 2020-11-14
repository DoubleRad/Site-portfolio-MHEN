const { model, Schema , Types} = require("mongoose");

const schema = new Schema({
    name : {type:String}
})


module.exports = model("Category", schema);