import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function createPost(id, title, content) {
  try {
    if(!id || isNaN(id)) {
      throw new AppError('Incalid User ID', 400)
    }

    if(!title || !content) {
      throw new AppError('Title or Content cannot be empty', 400);
    }
  
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: parseInt(id)
      }
    })

    return post;
  } catch (error) {
    throw new Error("Error creating post: ", error.message)
  }

  return post
}

async function publishPost(id) {
  try {
    if(!id || isNaN(id)) {
      throw new AppError('Invalid Post ID', 400)
    }
  
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id)
      } 
    })
  
    if(!post){
      throw new AppError('Post does not exist', 400)
    }
  
    if(post.isPublished) {
      throw new AppError('Post is already published', 400);
    }
  
    return await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isPublished: true,
      },
    })
  } catch (error) {
    throw new Error("Error publishing post: ", error.message)
  }
}

async function getAllPosts(){
  try {
    const posts = await prisma.post.findMany()

    if(!posts.length) {
      throw new AppError('Posts not found', 404)
    }

    return posts;
  } catch (error) {
    throw new Error("Error fetching posts ", error.message)
  }
}

async function getPostById(id){
  try {
    if(!id || isNaN(parseInt(id))){
      throw new AppError('Invalid user ID', 400)
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    })

    if(!post){
      throw new Error("Post Not Found", 404)
    }

    return post;
  } catch (error) {
    throw new Error("Error fetching post ", error.message)
  }
}

async function getAllPostsByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))) {
      throw new AppError('Invalid user ID', 400)
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(id)
      }
    })

    if(!posts.length){
      throw new AppError('Post Not Found', 404)
    }

    return posts

  } catch (error) {
    throw new Error("Error fetching post by user: ", error.message)
  }
}

async function getPublishedPostByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))){
      throw new AppError('Invalid user ID', 400)
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(id),
        isPublished: true,
      }
    })

    if(!posts.length) {
      throw new AppError('Posts by user not found', 404)
    }

    return posts
  } catch (error) {
    throw new Error("Error getting Posts by user: ", error.message)
  }
}

async function getDraftsByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))){
      throw new AppError('Invalid user ID', 400)
    }

    const drafts = await prisma.post.findMany({
      where: {
        userId: parseInt(id),
        isPublished: false,
      }
    })

    if(!drafts.length) {
      throw new AppError('Drafts by user not found', 404)
    }

    return drafts
  } catch (error) {
    throw new Error("Error getting Drafts by user: ", error.message)
  }
}

async function updateTitle(id, title) {
  try{
    if(!id || isNaN(parseInt(id))){
      throw new AppError('Invalid post ID', 400)
    }
  
    if(!title){
      throw new Error('Title cannot be empty', 400)
    }
  
    return await prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
      }
    })
  } catch (error) {
    throw new Error("Error updating post's title: ", error.message)
  }

}

async function updateContent(id, content) {
  try{
    if(!id || isNaN(parseInt(id))){
      throw new AppError('Invalid user ID', 400)
    }
  
    if(!content){
      throw new AppError('Content cannot be empty', 401)
    }
  
    return await prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        content,
      }
    })
  } catch (error) {
    throw new Error("Error updating post's content: ", error.message)
  }
}

async function deletePostById(id) {
  if(!id || isNaN(parseInt(id))){
    throw new AppError('Invalid user ID', 400)
  }

  return await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
}

export {
  createPost,
  publishPost,
  getAllPosts,
  getPostById,
  getAllPostsByUserId,
  getPublishedPostByUserId,
  getDraftsByUserId,
  updateTitle,
  updateContent,
  deletePostById,
}