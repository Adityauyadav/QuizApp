import jwt from "jsonwebtoken";

const protect = async (req,res,next)=>{
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1];
    }
    else{
        return res.send(401).json({message:"Not authorised"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id:decoded.id, role:decoded.role};
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({message:"Not authorized"})
    }

}

export default protect;