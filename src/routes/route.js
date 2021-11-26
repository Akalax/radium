const express = require('express');
const router = express.Router();



//------------------Login Assignment----------------
const logIn=require("../controller/logInCon");
const middleware=require("../Middleware/middleWare");
///----------Regiteration of user--------------------
router.post('/user',logIn.userEntry);
//------------login-------Token creation-------------
router.post('/getdetail',logIn.getData);
//--------find user Toke----------------------------
router.get("/finduser/:userId",middleware.validation,logIn.getuserdetail);
//---------Change email user----------------------
router.put("/changemail/:userId",middleware.validation,logIn.changemail);

module.exports = router;

const cowinController= require("../controllers/cowinController");
router.get("/getcoin",cowinController.getCoin);