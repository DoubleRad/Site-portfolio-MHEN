const { model, Schema , Types} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema(
    {
        title:String,
        text:String,
        date:{ 
            year:String,
            month:String,
            day:String 
        },
        imageSrc:{
            type:String ,
            default:""
        },
        category:[]
    },
    
    {
        timestamps:true
    },
    
)

schema.plugin(mongoosePaginate)

module.exports = model("Post", schema);