import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany()
    if(!users.length){
      throw new Error("No users found")
    }
    return users
  } catch(error) {
    throw new Error("Failed to fetch user: ", error.message)
  }
}

async function getUserById(id) {
  try {
    if(!id || isNaN(parseInt(id))) {
      throw new Error("Invalid user ID")
    }
    
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })
  
    if(!user) { 
      throw new Error("User not found") 
    }

    return user

  } catch(error) {
    throw new Error("Failed to fetch user ", error.message )
  }
}

async function updateUsername(id, username) {
  try {
    
    if(!username || username.length < 3) {
      throw new Error("Invalid username")
    }
  
    const isNameTaken = await prisma.user.findFirst({
      where: {
        username
      }
    })
  
    if(isNameTaken) {
      throw new Error("User already taken")
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
   throw new Error("Error updating username ", error.message)
  }
}

async function updateEmail(id, email) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
      throw new Error("Invalid email format")
    }

    const isEmailTaken = await prisma.user.findFirst({
      where: { email }
    });

    if(isEmailTaken) {
      throw new Error("Email already in use")
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
    throw new Error("Error updating email ", error.message)
  }
}

async function updatePassword(id, password) {
  try {
    if(!password || password.length < 6){
      throw new Error("Password must be more than 6 characters")
    }

    return await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        password
      }
    })
  } catch (error) {
    throw new Error("Error updating password ", error.message)
  }
}

async function updateRole(id, role){
  try {
    if(!['ADMIN', 'AUTHOR'].includes(role)){
      throw new Error("Invalid role")
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
    throw new Error("Error updating role ", error.message)
  }
}

async function deleteUserById(id){
  try {
    if(!id || isNaN(parseInt(id))){
      throw new Error("Invalid user ID")
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
  getAllUsers,
  getUserById,
  updateUsername,
  updateEmail,
  updatePassword,
  updateRole,
  deleteUserById
}