import { PrismaClient } from "../src/generated/prisma/client.js";

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
      throw new AppError('Contet cannot be empty', 400)
    }

    return await prisma.comment.create({
      data: {
        userId,
        postId,
        content,
      }
    })
  } catch (error) {
    throw new Error('Error creating comment', error.message)
  }
}

async function getCommentsByPostId(postId){
  try {
    if(!postId || isNaN(parseInt(postId))){
      throw new AppError('Invalid Post ID', 400)
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    })

    if(!comments){
      throw new AppError('Comments not found', 404)
    }

    return comments
  } catch (error) {
    throw new Error('Error fetching comments', error.message)
  }
}

export {
  createComment,
  getCommentsByPostId,
}