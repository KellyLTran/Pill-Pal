import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {

  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user) return res.status(404).json({message:'User not found.'});

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) return res.status(401).json({message: 'Invalid credentials'});

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  res.status(200).json({token, user});

}

export const signup = async (req, res) => {
  const {email, name, password} = req.body;

  if (!email || !name || !password) return res.status(400).json({message:"Invalid signup parameters."});
  

  if (password.length < 7) return res.status(401).json({message:"Password is too short."});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email, 
    password: hashedPassword,
    name
  })

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(201).json({token, user:newUser})

}

export const logout = (req, res) => {

}

export const check = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(400).json({message: "No token provided!"})
}