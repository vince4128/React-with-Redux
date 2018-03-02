'use strict';

const express   = require("express"),
      router    = express.Router()

//root route
router.get("/",function(req,res){
    res.send("accueil");
});

module.exports = router;