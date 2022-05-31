const db = require('../models');


class UserController{

	constructor(){
		//
	}

	

	users(req,res){
		db.User.find().then(users=>{
			res.json({status:true,message:'User List',data:users});
		}).catch(err=>{
			res.json({status:false,message:'No User found!',data:err});
		})
		
	}

	addCategory(req,res){
		var {name} = req.body;
		var category = new db.Category;
		category.name = name;
		category.save();
		return	res.json({status:true,message:'Category',data:category});
		
	}

	async getCategory(req,res){
		
		var category = await db.Category.find().lean();

		return	res.json({status:true,message:'All category',data:category});
		
	}

	async getFeed(req,res){
		
		//var feed = await db.Feed.find().lean();
		var feed = await db.Feed.find().populate({
		    "path": "User",
		    "match": { "userId": "id" }
	}).exec(function(err,entries) {
	 return	res.json({status:true,message:'All Feeds',data:entries});
   
});
		
		
	}

	addFeed(req,res){
		var {message} = req.body;
		if(!message)
			return	res.json({status:false,message:'message required',data:null});

		var feed = new db.Feed;

		feed.userId = req.userId;
		feed.message = message;
		feed.save(err=>{
			if(!err)
				return	res.json({status:true,message:'Question placed',data:feed});
		});
	}



}

module.exports = UserController;


