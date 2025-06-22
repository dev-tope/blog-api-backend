import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isPostAuthorOrAdmin.js';

const userRouter = Router();

//public
userRouter.post('/register', userController.createUser);

//protectted
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

//update 
userRouter.patch('/:id/updateUsername', isAuthenticated, userController.updateUsername);
userRouter.patch('/:id/updateEmail', isAuthenticated, userController.updateEmail);
userRouter.patch('/:id/updatePassword', isAuthenticated, userController.updatePassword);

//admin
userRouter.patch('/:id/role', isAuthenticated, isAdmin, userController.updateRole);
userRouter.delete('/:id', isAuthenticated, isAdmin, userController.deleteUserById);

//posts
userRouter.get('/:id/posts', userController.getAllPostsByUserId);
userRouter.get('/:id/published', userController.getPublishedPostsByUserId);
userRouter.get('/:id/drafts', userController.getDraftsByUserId);

export { userRouter }