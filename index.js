const express = require('express');
const connectDB =  require('./config/database');
// initalizing the app
const app = express();

// connection to database
connectDB();

// seting up the port
const PORT = process.env.PORT || 3000;

// telling the app to listen to that declared port on the server
app.listen(PORT, () =>console.log(`Server is running on ${PORT}`));