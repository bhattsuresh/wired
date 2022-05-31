const {Schema,model} = require('mongoose');
const schema = new Schema({
    userId:{type:String},
    message: {type:String,default:''},
    date: {type:String,default:app.dateTime()},
    comment:{type: Number,default:0},
    share:{type: Number,default:0},
    upVote:[{
        userId:{type:String},
        date:{type:String,default:app.dateTime()},
    }],
    downVote:[{
        userId:{type:String},
        date:{type:String,default:app.dateTime()},
    }],
    isActive: {type: Number,default:1}
},{ timestamps: true });

module.exports = model('feed', schema);