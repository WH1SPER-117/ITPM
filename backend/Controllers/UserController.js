const user = require("../Model/UserModel");

//data display
const getAllUsers = async (req,res,next) =>{

    let users;
    //Get all users
    try{
        users = await user.find();
    }catch(err){
        console.log(err);
    }

    //not found 
    if(!users){
        return res.status(404).json({message:"User not found"});
    }

    //Display all users
    return res.status(200).json({users});
};

//data insertion
const addUsers = async (req,res,next)=> {

    const {name,email,contactNo,address,username,password} = req.body;

    let users;

    try{
        users = new user({name,email,contactNo,address,username,password});
        await users.save();
    }catch (err) {
        console.log(err);
    }

    //if data is not inserting to the database
    if(!users){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({users});
};



exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;