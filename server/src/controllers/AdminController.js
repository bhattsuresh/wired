
const db = require('../models');
class AdminController{

	async login(req,res){
		var {password,username} = req.body;
		if(!password || !username)
		res.status(400).json({status:false,message:'Must provide username and password',data:null})
		db.Admin.findOne({username}).then(async (doc)=>{
			if(!doc)
				return res.status(401).json({status:false,message:'User not found!',data:null});
        
		 var token = await app.token(username);
		 var st =  await app.checkPassword(password,doc.password);
		 	if(st)
				return res.status(200).json({status:true,message:'login successs',data:doc,token:token});
			else
				return res.status(401).json({status:false,message:'Password did not match',data:null});
		}).catch(err=>{
			return res.status(403).json({status:false,message:`${err}`,data:null});
		})
	}

	async signup(req,res){
		var {name,username,password} = req.body;
		if(!name || !username || !password)
			return res.json({status:false,message:'name, username and password are required!',data:null});

		var pass = await app.setPassword(password);

		var admin = new db.Admin;
		admin.name = name;
		admin.username = username;
		admin.password = pass;
		try{
			admin.save(err=>{
				return res.json({status:true,message:'New admin created',data:admin});
			});
		}catch(err){
			return res.json({status:false,message:`${err}`,data:err});
		}
		
	}

	async updateProfile(req,res){
		var {name,username,password} = req.body;
		if(!name || !username || !password)
			return res.json({status:false,message:'name, username and password are required!',data:null});

		var pass = await db.config.setPassword(password);

		var admin = new db.Admin;
		admin.name = name;
		admin.username = username;
		admin.password = pass;
			admin.save(err=>{
				if(!err)
				return res.json({status:true,message:'New admin created',data:admin});
			   else
			return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}


	sitterList(req,res){

		db.User.find({type:'sitter'}).lean().then(docs=>{
			res.status(200).json({status:true,message:'Users sitter',data:docs});
		}).catch(err=>{
			res.status(403).json({status:false,message:'No data found!',data:err});
		})
	}

	parentList(req,res){

		db.User.find({type:'parent'}).lean().then(docs=>{
			res.status(200).json({status:true,message:'Users parent',data:docs});
		}).catch(err=>{
			res.status(403).json({status:false,message:'No data found!',data:err});
		})
	}





	
	async addUpdateFaq(req,res){
		var {_id,question,answer} = req.body;
		if(!question || !answer )
			return res.json({status:false,message:'question and answer are required!',data:null});
       if(!_id){
			var faq = new db.Faq;
			var message ='faq has been created';
       }
	   else{
	   	   var faq = await db.Faq.findOne({_id});
	   	   var message ='faq has been updated.';
	   }

		faq.question = question;
		faq.answer = answer;
		faq.createdAt = app.dateTime();
		faq.updatedAt = app.dateTime();
		

			faq.save(err=>{
				if(!err)
				return res.json({status:true,message,data:faq});
			   else
			    return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}
	
	async faqDelete(req,res){
		var {_id} = req.body;
		if(!_id)
			return res.json({status:false,message:'question and answer are required!',data:null});
     
	   	   var faq = await db.Faq.findOne({_id});
	   	   var message ='faq has been deteted';
	  

			faq.delete(err=>{
				if(!err)
				return res.json({status:true,message,data:faq});
			   else
			    return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}

	faq(req,res){
		

		db.Faq.find().lean().then(docs=>{
			 docs.map(doc=>{
			 	return doc.dates = app.dateTime(1645487928033);
			 });
			res.status(200).json({status:true,message:'faq',data:docs});
		}).catch(err=>{
			res.status(403).json({status:false,message:'No data found!',data:err});
		})
	}

   async staticData(req,res){
		var data = await db.StaticData.findOne();
	    return res.json({status:true,message:'Static Data',data});	
	} 


	staticDataAdd(req,res){
		var {about,privacy,terms} = req.body;
		if(!about ||!privacy || !terms)
			return res.json({status:false,message:'must provide about,privecy and terms',data:null});

		var data = new db.StaticData;
	    	data.about= about;
			data.terms= terms;
			data.privacy=privacy ;
		    data.save(err=>{
				if(!err)
				return res.json({status:true,message:'created',data});
			   else
			return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}
	
  async staticDataUpdate(req,res){
		var {_id,about,privacy,terms} = req.body;
		if(!_id || !about || !privacy || !terms)
			return res.json({status:false,message:'must provide about,privecy and terms',data:null});

		var data = await db.StaticData.findOne({_id});
	    	data.about= about;
			data.terms= terms;
			data.privacy=privacy ;
		    data.save(err=>{
				if(!err)
				return res.json({status:true,message:'Updated',data});
			   else
			return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}
	


	getMembership(req,res){

		db.Membership.find().then(data=>{
			return res.json({status:true,message:'get Membership',data});
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:err});
		});
		
	}


   addMembership(req,res){
		var {type,detail,price} = req.body;
		if(!type || !detail || !price)
			return res.json({status:false,message:'must provide type,detail and price',data:null});

		var data = new db.Membership;
	    	data.type = type;
			data.detail = detail;
			data.price = price;
		    data.save(err=>{
				if(!err)
					return res.json({status:true,message:'created',data});
			  	else
					return res.json({status:false,message:`${err}`,data:err});
	    });
		
	} 

	async updateMembership(req,res){
		var {_id,type,detail,price} = req.body;
		if(!_id || !type || !detail || !price)
			return res.json({status:false,message:'must provide _id, type,detail and price',data:null});

		var data = await db.Membership.findOne({_id});
	    	data.type = type;
			data.detail = detail;
			data.price = price;
		    data.save(err=>{
				if(!err)
					return res.json({status:true,message:'Updated',data});
			  	else
					return res.json({status:false,message:`${err}`,data:err});
	    });
		
	}

	async deleteMembership(req,res){
		var {_id} = req.body;
		if(!_id)
			return res.json({status:false,message:'_id are required!',data:null});
     
	   	   var data = await db.Membership.findOne({_id});
	   	   var message ='Membership has been deleted';
	  

			data.delete(err=>{
				if(!err)
				return res.json({status:true,message,data:true});
			   else
			    return res.json({status:false,message:`${err}`,data:err});
	        	});
		
	}

	

	getBooking(req,res){
	
		db.Booking.find().then(data=>{
			return res.json({status:true,message:'get Booking',data});
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:err});
		});
		
	}
	parent(req,res){

		db.User.find({type:'parent'}).then(data=>{
			return res.json({status:true,message:'parent list',data});
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:err});
		});
		
	}


	sitterList(req,res){

		db.User.find({type:'sitter'}).then(data=>{
			return res.json({status:true,message:'sitter list',data});
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:err});
		});
		
	}

	sitterInfo(req,res){
		let {_id} = req.body;
		if(!_id)
		return res.json({status:false,message:'muset provide _id of user',data:null});

		db.Sitter.find({userId:_id}).then(data=>{
			return res.json({status:true,message:'sitter info',data});
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:err});
		});
		
	}






 test(req,res){
 	let {profile} = req.body;
    if(!profile)
    	return res.status(404).send("profile base64 string  required");

 	//var img = app.uploadbase64(profile,'user');
 	var img = app.uploadbase64(profile,'tst/user');
 	//var img = app.uploadbase64(profile);
 	res.status(200).send(img);
 }










}



























module.exports = AdminController;