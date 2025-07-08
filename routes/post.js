const express = require("express");
const router = express.Router();

//Index - user
router.get("/" ,  (req, res) =>{
    res.send("Get for users");
});

// show -users
router.get("/:id" , (req , res) =>{
    res.send("Get for user id");
});

//post -users
router.post("/:id" , (req, res) =>{
    res.send("Post for users");
});

//Delete -users

router.delete("/:id" , (req, res) =>{
    res.send("DELETE for user id");
});

module.exports = router;