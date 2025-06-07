import * as userService from "../services/userService.js"

export async function createUser(req, res, next) {
  try {   
    const { username, email, password } = req.body;
    const user = await userService.createUser(username, email, password);
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export async function getAllUsers(req, res) {
  const users = await userService.getAllUsers();
  res.status(200).json(users)
}

export async function getUserById(req, res) {
  const { id } = req.user || req.params;
  const user = await userService.getUserById(id);
  res.status(200).json(user)
}

export async function updateUsername(req, res) {
  const { id } = req.user;
  const { username } = req.body;

  const update = await userService.updateUsername(id, username);

  res.status(201).json(update)
}

export async function  updateEmail(req, res) {
  const { id } = req.user;
  const { email } = req.body;
  const update = await userService.updateEmail(id, email);

  res.status(200).json(update)
}

export async function updatePassword(req,res) {
  const { id } = req.user;
  const { oldPassword } = req.body;
  const { newPassword } = req.body;
  const update = await userService.updatePassword(id, oldPassword, newPassword);

  res.status(200).json(update)
}

export async function updateRole(req, res) {
  const { id } = req.user || req.params;
  const { role } = req.body;
  const update = await userService.updateRole(id, role);

  res.status(201).json(update)
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  const deleted = await userService.deleteUserById(id);

  res.status(200).json(deleted)
}



