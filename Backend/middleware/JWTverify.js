const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let verifyToken = async(req,res,next)=>{
    
    const token = req.headers.token
    if (!token ) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    try {
        const decoded = jwt.verify(token, "JWT_SECRET_KEY");
        const userId = decoded.userId;
        // Fetch user details using the userId from the token

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
        req.user = userId;
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
          }

}
module.exports={verifyToken}