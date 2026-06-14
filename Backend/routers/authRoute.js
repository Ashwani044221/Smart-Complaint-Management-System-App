import express from 'express';
import user from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
    // Registration logic here
    try{
        const {name,email,password} = req.body;
        const existingUser = await user.findOne({email});

        if(existingUser){
          return  res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newData = new user({
            name,
            email,
            password:hashedPassword
        });
        await newData.save();
        res.json({ message: "User registered successfully" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
    
});

// Login
router.post("/login", async (req, res) => {
    // Login logic here
    try{
        const {email,password}= req.body;

        const User = await user.findOne({email});
        if(!User)  return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password,User.password);
        if (!isMatch) return res.status(400).json({ error: "Password not match" });
        
        //jwt
        const payload = {id: User._id , email:User.email ,role: User.role };
        const token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "7d"});
        // download cookie
        res.cookie("jwttoken", token, {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.json({ message: "Login successful",token, user: {
          id: User._id,
          name: User.name,
          email: User.email,
          role:User.role
        }});
    }catch(err){
        res.status(400).json({ error: err.message });
    }
    
}); 

export default router;