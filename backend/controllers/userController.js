
import mongoose from "mongoose";
import User from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// token
const TOKEN_EXPIRES_IN = '24h';
// const JWT_SECRET = '@superman';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

const createToken = (userId) => {
  //if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined on the server');
  return jwt.sign({ id: userId }, 
  JWT_SECRET, { expiresIn: "24h" });
};

// registration
// export async function register(req, res) {
//   try {
//     const name = String(req.body.name || "").trim();
//     const emailRaw = String(req.body.email || "").trim();
//     const email = req.body.email.toLowerCase().trim();    
//     const password = String(req.body.password || "");

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid email'
//       });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: 'Password must be at least 8 characters'
//       });
//     }

//     const exists = await User.findOne({ email }).lean();
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     const newId = new mongoose.Types.ObjectId();
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       _id: newId,
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     const token = createToken(newId.toString());

//     return res.status(201).json({
//       success: true,
//       message: 'Account created successfully',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (err) {
//     console.error('Register error ', err);
//     if (err.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }
//     return res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// }


export async function register(req,res) {
 try{
   const name = String(req.body.name || "").trim();
   const email = String(req.body.email || "").toLowerCase().trim();
   const password = String(req.body.password || "");

   if(!name || !email || !password){
     return res.status(400).json({success:false,message:"All fields required"});
   }

   if(!validator.isEmail(email)){
     return res.status(400).json({success:false,message:"Invalid email"});
   }

   if(password.length < 8){
     return res.status(400).json({success:false,message:"Password must be at least 8 chars"});
   }

   const exists = await User.findOne({email});
   if(exists){
     return res.status(409).json({success:false,message:"User already exists"});
   }

   const hashed = await bcrypt.hash(password,10);

   const user = await User.create({
     name,
     email,
     password: hashed
   });

   const token = createToken(user._id);

   res.status(201).json({
     success:true,
     message:"Account created",
     token,
     user:{
       id:user._id,
       name:user.name,
       email:user.email
     }
   });

 }catch(err){
   console.error("REGISTER ERROR:",err);
   res.status(500).json({success:false,message:"Server Error"});
 }
}

// login
export async function login(req, res) {
  try {
    const emailRaw = String(req.body.email || "").trim();
    const email = req.body.email.toLowerCase().trim();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const user = await User.findOne({ email });
    console.log("EMAIL:", email);
    console.log("USER:", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}
