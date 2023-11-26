const express = require("express");
const { PrismaClient } = require("@prisma/client");
const {verifyToken } = require("../middleware/JWTverify");
const prisma = new PrismaClient();
const postRoutes = express.Router();

// Create a new post
postRoutes.post('/posts',verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
      const newPost = await prisma.Post.create({
        data: {
          title,
          content,
          authorId:req.user,
        },
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  });


// Get all posts
postRoutes.get('/posts', async (req, res) => {
    try {
      const allPosts = await prisma.Post.findMany();
      res.status(200).json(allPosts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  });


  // Get a specific post by ID
postRoutes.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const post = await prisma.Post.findUnique({
        where: {
          id: postId,
        },
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
  });

  // Update a post by ID
  postRoutes.put('/:postId', verifyToken, async (req, res) => {
    console.log("hi")
    const postId = req.params.postId;
    const { title, content } = req.body;
  
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const User = await prisma.User.findUnique({
        where: {
          id: req.user,
        },
      });
      if(!User){
        return res.status(404).json({ error: 'Login please' });
      }
      if (req.user === post.authorId || User.isAdmin) {
        const updatedPost = await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            title,
            content,
          },
        });
  
        res.status(200).json(updatedPost);
      } else {
        res.status(403).json({ error: 'Unauthorized: Only the author or admin can update the post' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
  });
  
// Delete a post by ID
postRoutes.delete('/:postId', verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const User = await prisma.User.findUnique({
      where: {
        id: req.user,
      },
    });
    if(!User){
      return res.status(404).json({ error: 'Login please' });
    }
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          authorId: true,
        },
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  console.log(req.user,post.authorId)
      if (req.user === post.authorId || User.isAdmin) {
        await prisma.post.delete({
          where: {
            id: postId,
          },
        });
  
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(403).json({ error: 'Unauthorized: Only the author or admin can delete the post' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  });
  

module.exports={postRoutes}