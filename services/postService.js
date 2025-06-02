import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPost(id, title, content) {
  try {
    if(!id || isNaN(id)) {
      throw new Error("Invalid user ID")
    }

    if(!title || !content) {
      throw new Error("Title and content are required");
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
      throw new Error("Invalid user ID")
    }
  
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id)
      } 
    })
  
    if(!post){
      throw new Error("Post not found")
    }
  
    if(post.isPublished) {
      throw new Error("Post is already published");
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
      throw new Error("Posts not found")
    }

    return posts;
  } catch (error) {
    throw new Error("Error fetching posts ", error.message)
  }
}

async function getPostById(id){
  try {
    if(!id || isNaN(parseInt(id))){
      throw new Error("Invalid user ID")
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    })

    if(!post){
      throw new Error("Not Found")
    }

    return post;
  } catch (error) {
    throw new Error("Error fetching post ", error.message)
  }
}

async function getAllPostsByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))) {
      throw new Error("Invalid user ID")
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(id)
      }
    })

    if(!posts.length){
      throw new Error("Post Not Found")
    }

    return posts

  } catch (error) {
    throw new Error("Error fetching post by user: ", error.message)
  }
}

async function getPublishedPostByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))){
      throw new Error("Invalid user ID")
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(id),
        isPublished: true,
      }
    })

    if(!posts.length) {
      throw new Error("Posts by user not found")
    }

    return posts
  } catch (error) {
    throw new Error("Error getting Posts by user: ", error.message)
  }
}

async function getDraftsByUserId(id) {
  try {
    if(!id || isNaN(parseInt(id))){
      throw new Error("Invalid user ID")
    }

    const drafts = await prisma.post.findMany({
      where: {
        userId: parseInt(id),
        isPublished: false,
      }
    })

    if(!drafts.length) {
      throw new Error("Drafts by user not found")
    }

    return drafts
  } catch (error) {
    throw new Error("Error getting Drafts by user: ", error.message)
  }
}

async function updateTitle(id, title) {
  try{
    if(!id || isNaN(parseInt(id))){
      throw new Error("Invalid user ID")
    }
  
    if(!title){
      throw new Error("Title cannot be empty")
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
      throw new Error("Invalid user ID")
    }
  
    if(!content){
      throw new Error("Content cannot be empty")
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
    throw new Error("Invalid user ID")
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