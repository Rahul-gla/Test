const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions');
const contactRoutes = require('./routes/contacts'); // Import the contacts route
const path = require("path");

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI="mongodb+srv://rahulgla2cs23:X62bBix8sVhX951i@cluster0.0w8vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'  // Replace with your frontend URL
}));

app.use(express.json());

// Serve static files from the React app (uncomment only in production)
console.log('MongoDB connected',MONGODB_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true }); // Remove useUnifiedTopology
    console.log('MongoDB connected',MONGODB_URI);
    } catch (err) {
      console.error('MongoDB connection error:', err);
      // console.log('MongoDB connected',process.env.MONGODB_URI);
      process.exit(1);  // Exit process with failure
    }
  };
  connectDB();
  
  // Routes
  app.use('/api/questions', questionRoutes);
  app.use('/api/contacts', contactRoutes); // Use the contacts route
  
  if (true) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // Serve the React app's index.html for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
  }
// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
