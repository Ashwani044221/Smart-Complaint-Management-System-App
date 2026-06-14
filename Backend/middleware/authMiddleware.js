import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const token = req.cookies.jwttoken;
    // console.log(req.cookies);
    // console.log(req.cookies.jwttoken);
    if(!token){
       return res.status(401).json({
           message: "Login first"
      });
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        
        next();
    }catch(err){
        return res.status(401).json({
           message: "Invalid token"
        });
    }
   
}

export default authMiddleware;