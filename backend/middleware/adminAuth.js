import jwt from "jsonwebtoken";

const adminCheck = (req,res,next) =>{
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
       token = req.headers.authorization.split(" ")[1];
    }
    else{
        return res.status(401).json({message:"not authorised"});
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded.role;
        if (user !== "admin") {
            return res.status(401).json({ message: "not authorised" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "not authorised" });
    }
};

export default adminCheck;