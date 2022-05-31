const {Schema,model} = require('mongoose');
const schema = new Schema({
    question: { type: String, required: true, index:{unique: true} },
    answer: { type: String,required:true},
    isActive:{ type: Number,default:1}
},{ timestamps: true });

schema.pre('save', function (next) {
    this.createdAt = app.dateTime();
    next();
});
/*
schema.pre('find', function (next){
 // this.createdAt = app.dateTime(this.createdAt);
    next();
});
*/



schema.post('find', (docs) => {
  if (Array.isArray(docs)) 
	docs.map(doc=>{
		doc.createdAt = app.dateTime(doc.createdAt);
		doc.updatedAt = app.dateTime(doc.updatedAt);
		return doc;
	});
   else{
   	
   	docs.createdAt = app.dateTime(docs.createdAt);
   	docs.updatedAt = app.dateTime(docs.updatedAt);
   }
	
  
  return docs
})


module.exports = model('faq', schema);