const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

router.put("/updateuser", fetchUser, async(req, res) =>{
    try{
        const {avatarUrl} = req.body;
        if(!avatarUrl){
            return res.status(400).json({error : "Avatar URL is required"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {avatarUrl},
            {new: true}
        );

        res.json(updatedUser);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server error");

    }
});

module.exports = router;