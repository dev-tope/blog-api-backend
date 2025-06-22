export async function isPostAuthorOrAdmin(req, res, next) {
  const userId = req.user.id;
  const postId = req.params.id;
  const role = req.user.role;

  const isAuthor = userId === postId.userId
  const isAdmin = role === 'ADMIN'
  
  if(!isAuthor && !isAdmin) {
    console.log("Not admin or not post author")
    return res.status(403).json({ message: 'Forbidden'})
  }

  next()
}


export async function isAdmin(req, res, next) {
  console.log(req.user)
  const role = req.user.role;

  const isAdmin = role === 'ADMIN';

  if(!isAdmin) {
    console.log("Unauthorized: User is not an admin");
    return(res).status(401).json({ message: 'unauthorized' })
  }

  next();
}