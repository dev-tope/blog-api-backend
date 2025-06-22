import { Router } from "express";
import * as commentController from '../controllers/commentController.js';
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin, isPostAuthorOrAdmin } from "../middleware/isPostAuthorOrAdmin.js";

const commentRouter = Router();


commentRouter.delete('/delete', isPostAuthorOrAdmin, commentController.deleteComment)

export { commentRouter }