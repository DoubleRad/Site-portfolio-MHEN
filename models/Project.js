const { model, Schema } = require("mongoose");

const schema = new Schema({
    
    title:{type:String , default:"title"},
    subtitle:{type:String, default:"subtitle"},
    client:{type:String},
    text:{type:String, default:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    imageSrc:{type:String},
    date:{
        day:String,
        month:String,
        year:String,
    },
    category:[],
},
    {timestamps:true}

);

module.exports = model("Project", schema);
