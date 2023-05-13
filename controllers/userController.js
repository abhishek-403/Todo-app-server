const Users = require("../models/Users");
const bcrypt = require('bcrypt')
const { success, error } = require("../utils/responseWrapper");
const Tasks = require("../models/Tasks");

const getMyProfile = async (req, res) => {
    try {
        const curUser = await Users.findById(req._id).populate('tasks');
        if(!curUser){
            return res.send(error(400,"User doesnot exists"))
        }

        return res.send(success(200, { curUser }))

    } catch (e) {
        return res.send(error(500, e.message))

    }
}

const updateProfile = async (req,res)=>{
    try {
        const {name,email,username,password}=req.body
        const curUser = await Users.findById(req._id).select('+password');
        if(name){
            curUser.name= name;
        }
        if(email){
            curUser.email= email;
        }
        if(username){
            curUser.username= username;
        }
        if(password){
            curUser.password= await bcrypt.hash(password,7) ;
        }

        await curUser.save();
        return res.send(success(200,{curUser}))

        
        
    } catch (e) {
        return res.send(error(500, e.message))
        
    }
}


const deletMyProfile = async (req,res)=>{
    try {
        const {password} = req.body;
        if(!password){
            return res.send(error(403,"Password required"))
        }
        
        const curUser = await Users.findById(req._id).select('+password');
        const valid = await bcrypt.compare(password,curUser.password);


        if(!valid){
            return res.send(error(403,"Incorrect password"))

        }

        await Tasks.deleteMany({
            owner:req._id
        })
        await curUser.deleteOne();
        
        return res.send(success(200,"Profile deleted"))

        
    } catch (e) {
        return res.send(error(500,e.message))
        
    }

}


module.exports = {
    getMyProfile,
    deletMyProfile,
    updateProfile
}