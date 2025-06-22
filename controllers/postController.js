import * as postService from '../services/postService.js';

export async function createPost(req, res) {
  const { id } = req.user;
  const { title, content } = req.body;
  
  const post = await postService.createPost(id, title, content);
  res.status(201).json({message: 'Post Created', post });
}

export async function publishPost(req, res) {
  const { id } = req.params;

  const post = await postService.publishPost(id);
  res.status(200).json({ message: 'Post published', post });
}

export async function getAllPosts(req, res) {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts)
}

export async function getPostById(req, res) {
  const { id } = req.params;

  const post = await postService.getPostById(id);
  res.status(200).json(post);
}

export async function updateTitle(req, res) {
  const { id } = req.params;
  const { title } = req.body
  await postService.updateTitle(id, title);
  res.status(200).json({ message: 'Title updated', title });
}

export async function updateContent(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  await postService.updateContent(id, content);
  res.status(200).json({ message: 'Content updated', content });
}

export async function deletePostById(req, res) {
  const { id } = req.params;
  await postService.deletePostById(id);
  res.status(200).json({ message: 'Post deleted sucessfully' });
}

export async function getCommentsByPostId(req, res) {
  const postId = parseInt(req.params.id);
  const comments = await postService.getCommentsByPostId(postId);
  res.status(200).json(comments);
}