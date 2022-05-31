const {Schema,model} = require('mongoose');
const schema = new Schema({
    name:{type:String, required:true,index:{unique:true}},
    date: {type:String,default:app.dateTime()},  
    isActive: {type: Number,default:1}
},{ timestamps: true });

module.exports = model('Category', schema);