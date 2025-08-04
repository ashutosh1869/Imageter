import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userAuth = (req,res,next)=>{
    const {token}=req.headers;
    if(!token)
            {
                return res.json({success:false,message:"No token provided."})
            }
        try {
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
            if(tokenDecode.id){
                if (!req.body) req.body = {};
                req.body.userId = tokenDecode.id;
                next();
            }else{
                return res.json({success:false,message:"not authorized"})
            }
        } catch (error) {
            console.error("Error in userAuth middleware:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
            
        }
}
export default userAuth;