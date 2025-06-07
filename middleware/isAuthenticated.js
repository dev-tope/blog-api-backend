import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export function isAuthenticated(req, res, next) {
  const headerAuth = req.headers['authorization'];

  // console.log('Authorization header: ', headerAuth);

  const token = headerAuth && headerAuth.split(' ')[1];
 

  console.log('Extracted token: ', token);

  if(!token) {
    console.log('No token found');
    return res.status(403).json({ message: 'Invalid Token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) {
      console.log('JWT verification error: ', err.message);
      return res.status(403).json({ message: 'Invalid or expired token'})
    }

    req.user = decoded;
    next()
  })
}