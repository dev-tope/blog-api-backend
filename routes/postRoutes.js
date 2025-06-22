import { Router } from "express";
import * as postController from "../controllers/postController.js"
import { createComment } from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isPostAuthorOrAdmin.js";

const postRouter = Router()

// public
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/:id/comment', postController.getCommentsByPostId)

postRouter.post('/create', isAuthenticated, postController.createPost)
postRouter.post('/:id/comment/create', isAuthenticated, createComment)
postRouter.post('/:id/publish', isAuthenticated, postController.publishPost)

postRouter.patch('/:id/updateTitle', isAuthenticated, postController.updateTitle);
postRouter.patch('/:id/updateContent', isAuthenticated, postController.updateContent);


postRouter.delete('/delete', isAdmin, postController.deletePostById)

export { postRouter }



