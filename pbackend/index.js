const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/payments', paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//gwvSJTXqxns5QrCM - password 
//mongodb+srv://himayapalliyaguruge:gwvSJTXqxns5QrCM@cluster0.22c91.mongodb.net/
//connection string - mongodb+srv://himayapalliyaguruge:<db_password>@cluster0.22c91.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0