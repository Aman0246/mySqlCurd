const express = require('express');


const { userRoutes } = require('./Routes/userRoutes');
const { postRoutes } = require('./Routes/postRoutes');


const app = express();

app.use(express.json());


app.use('/user',userRoutes)
app.use('/post',postRoutes)
// Register endpoint


app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
