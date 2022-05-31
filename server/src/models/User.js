const {Schema,model} = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    mobile: { type: Number, default:0},
    email: { type: String,required: true,  index:{unique: true}},
    password: { type: String,required:true},
    profile: { type: String,default:''},
    dob:{type:Date,default:''},
    gender:{type: String,default:''},
    address:{type: String,default:''},
    city:{type: String,default:''},
    isActive:{ type: Number,default:1}
},{ timestamps: true });


schema.post('find', (docs) => {
  if (Array.isArray(docs)) 
    docs.map(doc=>{
        doc.profile = app.url(doc.profile);
        return doc;
    });
   else{
    
     docs.profile = app.url(docs.profile);
   }
    
  
  return docs
})



module.exports = model('user', schema);