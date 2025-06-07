import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.js";

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET


export async function login(email, password){
  try {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!email || !emailRegex.test(email)){
      throw new Error("Invalid email");
    }
  
    if(password.length < 6){
      throw new Error("Password must be more than 6 characters")
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });
  
    if(!user){
      throw new AppError("User is not registered", 404)
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch){
      throw new AppError("Invalid Credentials", 400)
    }
  
    //issue JWT
  
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  
    const token = jwt.sign(payload, JWT_SECRET, { 
      expiresIn: '30m',
      algorithm: 'HS256',
      audience: 'blog-api-audience',
      issuer: 'blog-api',
    })
  
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      expiresIn: 3600
    };

  } catch (error) {
    if(error instanceof AppError) {
      throw error
    }
    throw new Error("Error during login", 500);
  }
}

