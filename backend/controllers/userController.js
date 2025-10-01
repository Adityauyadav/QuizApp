import {z} from "zod";
import User from '../models/user.js';
import bcrypt from "bcrypt";

const saltRounds = 10;


const registerSchema = z.object({
    userName : z.string().min(1, "Name is required"),
    userEmail : z.email("Invalid Email"),
    userPassword : z.string().min(8, "Password must be at least 8 characters")
});


const registerUser = async (req,res) =>{
    const validation = registerSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({error: validation.error.errors});
    };

    const{userName, userEmail, userPassword} = req.body;

    const existingUser = await User.findOne({userEmail});
    if(existingUser){
        return res.status(400).json({message:"email already exists"});
    };

    const hashPassword = await bcrypt.hash(userPassword, saltRounds);
    const user = new User({
        userName, userEmail, userPassword:hashPassword
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });



}


export default registerUser;