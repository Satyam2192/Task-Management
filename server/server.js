const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config(); 

const PORT = process.env.PORT || 3000; 

mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log("db connected successfully") })
  .catch((err) => {
    console.log("err in connecting to database");
    console.log(err);
    process.exit(1);

  });

// const __dirname = path.resolve();

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Routes import and mount
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

