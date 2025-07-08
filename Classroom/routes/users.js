const express = require("express");
const router = express.Router()



router.get("/" , (req,res) =>{
    res.send("Hi , I am root!");
});

// Index.users
router.get("/" , (req, res) =>{
    res.send("GET for  users");
});

// show - users

router.get("/:id" , (req, res) =>{
    res.send("GET show users")
});

//Post -users
router.post("/", (req, res) =>{
res.send("POST for show users");
});

// DELETE -users
router.delete("/:id" , (req, res) =>{
    res.send("DELETE for user id");
});

module.exports = router