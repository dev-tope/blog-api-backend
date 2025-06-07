import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

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
userRouter.patch('/:id/role', userController.updateRole);
userRouter.delete('/:id', userController.deleteUserById)

export { userRouter }