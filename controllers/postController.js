import * as postService from '../services/postService.js';

export async function createPost(req, res) {
  const { id } = req.user;
  const { title, content } = req.body;
  
  const post = await postService.createPost(id, title, content);
  res.status(201).json(post);
}

export async function publishPost(req, res) {
  const { id } = req.params;

  const post = await postService.publishPost(id);
  res.status(200).json(post);
}

export async function getAllPosts(req, res) {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts)
}

export async function getPostById(id) {
  const { id } = req.params;

  const post = await postService.getPostById(id);
  res.status(200).json(post);
}

export async function getAllPostsByUserId(id) {
  const { id } = req.user;

  const posts = await postService.getAllPostsByUserId(id);
  res.status(200).json(posts);
}

export async function getDraftsByUserId(id) {
  const { id } = req.user;

  const drafts = await postService.getAllPostsByUserId(id);
  res.status(200).json(drafts);
}

export async function updateTitle(id, title) {
  const { id } = req.params;

  const title = await postService.updateTitle(id, title);
  res.status(200).json(title);
}

export async function updateContent(id, content) {
  const { id } = req.params;

  const content = await postService.updateContent(id, content);
  res.status(200).json(title);
}

export async function deletePostById(req, res) {
  const { id } = req.params;

  const post = await postService.deletePostById(id);
  res.status(200).json(post);
}