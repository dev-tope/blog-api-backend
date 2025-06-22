import { PrismaClient } from "../src/generated/prisma/client.js";
import AppError from "../utils/error.js";

const prisma = new PrismaClient()

async function createComment(userId, postId, content) {
  try {
    if(!userId || isNaN(parseInt(userId))){
      throw new AppError('Invalid user ID', 400)
    }

    if(!postId || isNaN(parseInt(postId))){
      throw new AppError('Invalid post ID', 400)
    }

    if(!content.length){
      throw new AppError('Content cannot be empty', 400)
    }

    return await prisma.comment.create({
      data: {
        userId,
        postId,
        content,
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

async function deleteComment(id) {
  try {
    if(!id || isNaN(parseInt(id))) {
      throw new AppError('Comment ID is invalid')
    }

    const deleteComment = await prisma.user.delete({
      where: {
        id,
      }
    }) 

    return deleteComment;
  } catch (error) {
    throw new Error('Error deleting comment', error.message)
  }
}

export {
  createComment,
  deleteComment,
}