const express = require("express");
const {AdminController} = require("../controllers");

const router = express.Router();

router.post('/login', AdminController.login);

router.post('/signup', AdminController.signup);
router.post('/update', AdminController.updateProfile);


router.get('/users/sitter', AdminController.sitterList);
router.get('/users/parent', AdminController.parentList);



router.post('/faq', AdminController.addUpdateFaq);
router.put('/faq', AdminController.addUpdateFaq);
router.get('/faq', AdminController.faq);
router.delete('/faq', AdminController.faqDelete);

router.get('/static-data', AdminController.staticData);
router.post('/static-data', AdminController.staticDataAdd);
router.put('/static-data', AdminController.staticDataUpdate);

router.get('/membership', AdminController.getMembership);
router.post('/membership', AdminController.addMembership);
router.put('/membership', AdminController.updateMembership);
router.delete('/membership', AdminController.deleteMembership);



router.get('/booking', AdminController.getBooking);

router.get('/sitter', AdminController.sitterList);
router.get('/parent', AdminController.parent);
router.post('/sitter/info', AdminController.sitterInfo);





router.post('/test', AdminController.test);



















































module.exports = router
