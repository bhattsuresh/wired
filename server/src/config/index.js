var dotenv = require('dotenv');
const moment = require('moment-timezone');
const { resolve } = require('path');

dotenv.config()
const config = {
  port:process.env.PORT,
  host:process.env.HOST,
  dbUri:process.env.DB_URL,
  saltRounds:process.env.SALT,
  uploadDIR:process.env.UPLOAD_DIR,
  uploadURL:process.env.UPLOAD_URL
};


config.url = (endpoints)=>{
  return `${app.uploadURL}/${endpoints}`;
}
config.setPassword = async (plaintext)=>{
  const bcrypt = require('bcrypt')
  const promise =  new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, parseInt(config.saltRounds), function(err, hash) {
        if(!err)
          resolve(hash);
        else
          resolve(plaintext);
    });
  
  });
 
return await promise.then();
  
}

config.checkPassword = async (plaintext,hash)=>{
  const bcrypt = require('bcrypt')
  const promise =  new Promise((resolve, reject) => {
  bcrypt.compare(plaintext, hash, function(err, result) {
      if(!err)
          resolve(result);
        else
          resolve(result);
  });
     
  });
 
return await promise.then();
  
}


config.checkRequest =  (req,res,reqData)=>{
   var status=true,message="";
   var data = req.body;
  
   reqData.map(input=>{
        if(!data[input]){
          status=false;
          message = `${input} required`; 
        }
          
    })
  return res.json(status,message);
}

config.otp = (length = 4 )=>{
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < length; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 


config.token = (store, expiresIn = null)=> {
  const jwt = require('jsonwebtoken');
    // expires after half and hour (1800 seconds = 30 minutes)
    //let token = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '10s' });
    let token = null;
    if(expiresIn != null)
      token = jwt.sign(store, process.env.TOKEN_SECRET,expiresIn);
    else
       token = jwt.sign(store, process.env.TOKEN_SECRET);
      
    return token;
  }

config.checkToken = (req,res,run)=>{
  const jwt = require('jsonwebtoken');
      var token = req.headers['token'] || req.body.token;
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.',err,token });

        run(err,decoded);
      });
    
}

config.tokenauthenticate = (token)=>{
  var error;
  const jwt = require('jsonwebtoken');
      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(err){
          error = false;
        }else{
          error = true;
        }
      });
      return error;
    }

config.upload = async (req,key,dist=null)=>{
  if (!req.files || Object.keys(req.files).length === 0)
      return {status:!1,message:'Select image first'};
      let file = req.files[key];
        
      if(2457600 < file.size)
          return {status:!1,message:'image size less than '+(2457600/2024).toFixed(0)+'Mb'};
        
      

      if((file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') || file.size < 1000)
        return {status:!1,message:'Please enter valid image'};
       
    
    
      let file_name = Date.now()+'.jpg';
      var dir = '';
      if(!dist)
         dir = './uploads/'+file_name;
      else
        dir = './uploads/'+dist+'/'+file_name;


        const promise = new Promise((resolve, reject) => {


      file.mv(dir, function(err) {
        if (err){
          resolve({status:!1,message:'File path Can not found!'});
        }
       
           resolve({status:true,message:'Success',file:file_name})
          
        
      });


  
    });

      return  promise.then()
    
}

config.uploadbase64 = (base64String,dist = null)=>{
  
  const fs = require("fs");

  const d = new Date.now();
  var filePath = d+'.jpg';

  let base64Image = base64String.split(';base64,').pop();
  var res = '';
  
  if(!dist){
    dist = config.uploadDIR;
    res = filePath;
    filePath = `${dist}/${filePath}`;

     fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) { 
              if (err){ throw err; }
            });
   

  }else{
   
     var mkdirr = `${config.uploadDIR}/${dist}`;
       res = `${dist}/${filePath}`;
      filePath = `${mkdirr}/${filePath}`;
    
    if(!fs.existsSync(mkdirr)){
        fs.mkdir(mkdirr , { recursive: true }, (err) => {
          if (err){ throw err; }

           fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) { 
              if (err){ throw err; }
            });
   
        });
    }else{
     
           fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) { 
              if (err){ throw err; }
            });
  }
}
  return res;
}


config.userIdGenerator = ()=>{
  
  const { v4: uuidv4 } = require('uuid');
  // let file_name = Date.now()+'.jpg';
  const uniqueInsuranceId = uuidv4();
  return uniqueInsuranceId;
}


config.date = (date = null)=>{
  if(!date)
    return moment.tz(Date.now(), process.env.TZ).format('YYYY-MM-DD');
  else
    return moment.tz(new Date(date), process.env.TZ).format('YYYY-MM-DD');
}

config.dateTime = (date = null)=>{
  if(!date)
    return moment.tz(Date.now(), process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
  else
    return moment.tz(new Date(date), process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
}

config.timestamp = (date = null)=>{
  if(!date)
  // return   new Date(date).getTime();
     return moment.tz(Date.now(), process.env.TZ).unix();
  else
    return moment.tz(new Date(date), process.env.TZ).unix();
} 
 



config.getPrefix = ()=>{
  return moment.tz(Date.now(), process.env.TZ).format('YYYYMMDD');
}


config.getBookingAmount = async (sitterId)=>{
  const db = require('../models');
  var sitter = await db.Sitter.findOne({userId:sitterId});
  if(!sitter)
    return 0;

  return sitter.charges; 
}


config.dateToHours = async (a,b) =>{
var diff = {};
diff.milliseconds = a > b ? a % b : b % a;
diff.seconds = diff.milliseconds / 1000;
diff.minutes = diff.seconds / 60;
diff.hours = diff.minutes / 60;

if( diff.hours % 1 == 0){
return parseInt(diff.hours);
}else{
return parseInt(diff.hours +1); 
}

}



config.sendSMS = (to,body,callback = function(){})=>{
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
       from: process.env.TWILIO_MOBILE_FROM,
       to,
       body
     })
    .then(callback).catch(callback);
} 

global.app = config;

console.log('tm',app.timestamp('2021-02-05 12:11:00'));

module.exports = config