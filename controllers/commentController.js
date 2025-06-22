import * as commentService from '../services/commentService.js';

export async function createComment(req, res) {
  const userId = req.user.id;
  const postId = parseInt(req.params.id);
  const { content } = req.body;

  console.log(userId, postId, content)
  
  const comment = await commentService.createComment(userId, postId, content);
  res.status(200).json({ message: 'Comment Posted', comment });
}



export async function deleteComment(req, res) {
  const id = req.params.id;
  await commentService.deleteComment(id);
  res.status(200).json({ message: 'Comment deleted successfully' })
}