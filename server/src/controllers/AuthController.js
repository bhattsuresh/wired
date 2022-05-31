const db = require('../models');

class AuthController{

	constructor(){
		//
	}

	
	async userRegister (req,res){
		let {name,email,mobile,password} = req.body;
		if(!name || !email || !password)
			return res.status(400).json({status:false,message:'Must provide name,email,password ',data:null})
		var user = new db.User;
		user.name = name;
		user.email = email;
		user.password = await db.config.setPassword(password);
		if(mobile)
			user.mobile = mobile;

		user.save(err=>{
			if(!err){
				user = user.toObject();
				user.token = app.token({_id:user._id})
				res.status(201).json({status:true,message:'Register successs',data:user});
			}
			else
				res.status(200).json({status:false,message:`${err}`,data:null});
		});
		
	}

	async userLogin (req,res){
		var {password,email} = req.body;
		if(!password || !email)
		res.status(200).json({status:false,message:'Must provide email and password',data:null})
		db.User.findOne({email}).lean().then(async (docs)=>{
			
			if(!docs)
				return res.status(200).json({status:false,message:'User not found!',data:null});
        
		
		 var st =  await app.checkPassword(password,docs.password);
		 	if(st){
		 	
				docs.token = app.token({_id:docs._id})
				return res.status(200).json({status:true,message:'login successs',data:docs});
		 	}
			else
				return res.status(200).json({status:false,message:'Password did not match',data:null});
		}).catch(err=>{
			return res.status(200).json({status:false,message:`${err}`,data:null});
		})
		
	}

	userSendOtp(req, res) {
    	var { email } = req.body;
    		if (!email) {
      		res.json({status:false,message:'Must provide email id',data:null});
      		return;
    	}

    	db.User.findOne({email}).then(async (doc)=>{
			if(!doc)
				return res.json({status:false,message:'User not found!',data:null});

	    var otp = 1234;//app.otp(6);
	    var token = app.token({email,otp},{ expiresIn: '2h' });
	    //var token = app.token({mobile,otp});
	    res.json({status:true,message:'OTP has been sent on your email!',data:{otp,token}});
	    return;
		}).catch(err=>{
			return res.json({status:false,message:`${err}`,data:null});
		})
	      
	}

	updatePassword(req,res){
		var {email,otp,password} = req.body;
		if (!email || !otp || !password){
      		return res.status(400).json({status:false,message:'Must provide email,otp and password',data:null});
		}

      	//app.checkToken(req,res,data=>{
      				//return res.json({status:true,message:'data',data});
      				if(parseInt(otp) != 1234)
      					return res.status(400).json({status:true,message:'OTP Does not match!',data:null});

      		db.User.findOne({email}).then(async (doc)=>{
				if(!doc)
				
					return res.json({status:false,message:'User not found!',data:null});
				doc.password =  await app.setPassword(password);
				doc.save();
				return res.status(200).json({status:true,message:'Password has been updated successful.',data:doc});

			}).catch(err=>{
				return res.status(403).json({status:false,message:`${err}`,data:null});
			})
      	//});
      	
		
	}

updateProfile(req,res){
		var {email,otp,password} = req.body;
		if (!email || !otp || !password)
      		return res.json({status:false,message:'Must provide email,otp and password',data:null});

      	//app.checkToken(req,res,data=>{
      				//return res.json({status:true,message:'data',data});
      				if(parseInt(otp) != 1234)
      					return res.json({status:true,message:'OTP Does not match!',data:null});

      		db.User.findOne({email}).then(async (doc)=>{
				if(!doc)
					return res.json({status:false,message:'User not found!',data:null});
				doc.password =  await app.setPassword(password);
				doc.save();
				return res.json({status:true,message:'Password has been updated successful.',data:doc});
			}).catch(err=>{
				return res.json({status:false,message:`${err}`,data:null});
			})
      	//});
      	
		
	}



}

module.exports = AuthController;


