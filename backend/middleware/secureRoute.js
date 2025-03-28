import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'

export const secureRoute = async(req,res,next)=>{
try {
    const token=req.cookies.jwt;
    console.log( "token", token)
    if(!token){
        return res.status(401).json({message:"Not authorized"});
    }
    const verified=jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", verified);
    if(!verified){
        return res.status(403).json({message:"Invalid token"});
    }
    const user=await User.findById(verified.id).select("-password -confirmPassword")
    console.log( "user",user)
    console.log( "id",verified.id)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    req.user=user;
    // console.log(req.User)
    next();
} catch (error) {
    console.log(error)
    res.status(501).json({message:"Internal server error"});
}
}