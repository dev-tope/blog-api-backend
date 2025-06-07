import * as authService from '../services/authService.js';

export async function login(req, res) {
  // console.log(req.body)
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: 'Login Successful',
    ...result,
  })
}