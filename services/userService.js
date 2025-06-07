import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt"
import AppError from "../utils/error.js";

const prisma = new PrismaClient()

async function createUser(username, email, password) {
  try {
    if(!username){
      throw new AppError("Username cannot be empty", 400)
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!email || !emailRegex.test(email)){
      throw new AppError("Invalid Email", 400)
    }

    if(password.length < 6){
      throw new AppError("Password must be greater than 6 characters", 400)
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ]
      }
    })

    if(existingUser) {
      throw new AppError(
        existingUser.email ? "Email already exist" : "Username already exist",
        400
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    if(error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany()
    if(!users.length){
      throw new AppError("No users found", 404)
    }
    return users
  } catch(error) {
    if(error instanceof AppError) {
      throw error
    }
    throw new Error(error.message)
  }
}

async function getUserById(id) {
  try {
    if(!id || isNaN(parseInt(id))) {
      throw new AppError("Invalid user ID", 400)
    }
    
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })
  
    if(!user) { 
      throw new AppError("User not found", 400) 
    }

    return user

  } catch(error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new Error("Failed to fetch user ", error.message )
  }
}

async function updateUsername(id, username) {
  try {
    
    if(!username || username.length < 3) {
      throw new AppError("Invalid username", 400)
    }
  
    const isNameTaken = await prisma.user.findFirst({
      where: {
        username
      }
    })
  
    if(isNameTaken) {
      throw new AppError("User already taken", 400)
    }
  
    return await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        username
      }
    }) 
  } catch (error) {
    if( error instanceof AppError) {
      throw error
    }
   throw new Error(error.message)
  }
}

async function updateEmail(id, email) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
      throw new AppError("Invalid email format", 400)
    }

    const isEmailTaken = await prisma.user.findFirst({
      where: { email }
    });

    if(isEmailTaken) {
      throw new AppError("Email already in use", 400)
    }

    return await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        email: email
      }
    })
  } catch (error) {
    if(error instanceof AppError) {
      throw error
    }
    throw new Error("Error updating email ", error.message)
  }
}

async function updatePassword(id, oldPassword, newPassword) {
  try {
    if(!oldPassword ||  oldPassword.length < 6){
      throw new AppError("Old Password must be more than 6 characters", 400)
    }

    if(!newPassword ||  newPassword.length < 6){
      throw new AppError("New Password must be more than 6 characters", 400)
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
      }
    })

    if(!user) {
      throw new Error('User not found', 404)
    }

    const saltRounds = 10;

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if(!isOldPasswordValid) {
      throw new AppError("Old password is incorrect", 400)
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    return await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        password: hashedNewPassword,
      }
    })
  } catch (error) {
    if(error instanceof AppError) {
      throw error
    }
    throw new Error("Error updating password ", error.message)
  }
}

async function updateRole(id, role){
  try {
    if(!['ADMIN', 'AUTHOR'].includes(role)){
      throw new AppError("Invalid role", 400)
    }

    return await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        role
      }
    })
  } catch(error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new Error("Error updating role ", error.message)
  }
}

async function deleteUserById(id){
  try {
    if(!id || isNaN(parseInt(id))){
      throw new AppError("Invalid user ID", 400)
    }

    return await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    })
  } catch(error) {
    throw new Error("Failed to delete user: ", error.message)
  }
}

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUsername,
  updateEmail,
  updatePassword,
  updateRole,
  deleteUserById
}