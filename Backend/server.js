const express = require('express');


const { userRoutes } = require('./Routes/userRoutes');
const { postRoutes } = require('./Routes/postRoutes');
const cors = require('cors')


const app = express();
app.use(cors())

app.use(express.json());


app.use('/user',userRoutes)
app.use('/post',postRoutes)
// Register endpoint


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 7000${process.env.PORT}`);
});
