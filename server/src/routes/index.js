const express = require("express");


  // import sub-routers
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");

 const router = express.Router();


  router.get('/', (req,res,next)=>{
	  res.json({site:true});
  });
  
 

  router.use('/auth', authRouter);
  
  router.use('/user', userRouter);

  router.use('/admin', adminRouter);

  // Export the router
module.exports = router;