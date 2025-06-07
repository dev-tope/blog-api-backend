import * as commentService from '../services/commentService.js';

export async function createComment(req, res) {
  const userId = req.user.id;
  const postId = req.params.id;
  const { content} = req.body;

  const comment = await commentService.createComment(userId, postId, content);
  res.status(200).json(comment);
}

export async function getCommentsByPostId(req, res) {
  const postId = req.params.id;

  const comments = await commentService.getCommentsByPostId(postId);
  res.status(200).json(comments);
}