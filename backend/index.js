const express = require('express');
const connectToDb = require("./db-config/db")
const nutriguideController = require('./controller/nutriguideController');
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(cors({
  origin:"https://funny-monstera-b4a5b2.netlify.app",
  credentials: true,  // Enable sending cookies over HTTP requests
  methods: ["GET", "POST", "PUT", "DELETE"] // Specify allowed HTTP methods for cross-origin requests
})); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data
app.post('/nutriguide', nutriguideController.handleChat);
app.get("/get-conversations",nutriguideController.getConversations);

connectToDb().then(()=>{
  app.listen(port, () => console.log(`Server listening on port ${port}`));
})