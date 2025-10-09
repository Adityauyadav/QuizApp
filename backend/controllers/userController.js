import {z} from "zod";
import User from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const registerSchema = z.object({
    userName : z.string().min(1, "Name is required"),
    userEmail : z.email("Invalid Email"),
    userPassword : z.string().min(8, "Password must be at least 8 characters")
});


 export const registerUser = async (req,res) =>{
    const validation = registerSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({message: validation.error.issues[0].message});
    }

    const {userName, userEmail, userPassword} = req.body;

    const existingUser = await User.findOne({userEmail});
    if(existingUser){
        return res.status(400).json({message:"email already exists"});
    }
    const hashPassword = await bcrypt.hash(userPassword, saltRounds);
    const user = new User({
        userName, userEmail, userPassword:hashPassword
    });
    const token = jwt.sign(
        {id: user._id, role: 'user'},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE}
        );
    await user.save();
    res.status(201).json({ message: "User registered successfully", token:token });


};
export const loginUser = async (req, res) => {
    try {
        const {userEmail, userPassword} = req.body;

        const emailCheck = await User.findOne({userEmail});
        if (!emailCheck) {
            return res.status(400).json({message: "user not registered, please create an account"});
        }
        const isMatch = await bcrypt.compare(userPassword, emailCheck.userPassword);
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect Password"});
        }

        const token = jwt.sign(
            {id: emailCheck._id, role: emailCheck.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE}
        );
        res.status(200).json({
        message:"Login Successful",
        token : token });
    }catch(err){
    console.error(error);
    res.status(500).json({message:"Internal Sever Error"});};
};



export const getUser = async (req,res) =>{
    try {
        const response = await User.find({}, '-userPassword -__v').lean();
        res.status(200).json({ users: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"})
    }

};