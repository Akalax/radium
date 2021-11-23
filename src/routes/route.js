const express = require('express');
const router = express.Router();



//------------------Login Assignment----------------
const logIn=require("../controller/logInCon");
//const middleware=require("../Middleware/middleWare");

router.post('/getdetail',logIn.getData);
router.post('/user',logIn.userEntry);
router.get("/finduser/:userId",logIn.getuserdetail);
router.put("/changemail/:userId",logIn.changemail);


module.exports = router;