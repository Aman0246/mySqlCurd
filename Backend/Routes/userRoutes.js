const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRoutes.post("/register", async (req, res) => {
  const { email, name, password,isAdmin } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "All field required" });
  }
  // Check if the email is already registered
  const existingUser = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the new user
    const newUser = await prisma.User.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed" });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      // Find the user by email
      const user = await prisma.User.findUnique({
          where: {
              email: email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid  password" });
        }

            // Password is correct, generate JWT token
            const token = jwt.sign({ userId: user.id}, "JWT_SECRET_KEY", { expiresIn: '1h' });
        
    // Password is correct, user is authenticated
    return res.status(200).json({ message: "Login successful", user: user ,token});
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
});

userRoutes.get('/allusers',async(req,res)=>{
  try {
    const allusers = await prisma.User.findMany();
    res.status(200).json(allusers);
    
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
})

// Update isAdmin field of a user by ID
userRoutes.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { isAdmin } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update isAdmin field only
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isAdmin: isAdmin !== undefined ? isAdmin : user.isAdmin, // Update isAdmin if provided, else keep the existing value
      },
    });

    res.status(200).json({ message: 'isAdmin updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating isAdmin' });
  }
});




module.exports = { userRoutes };
