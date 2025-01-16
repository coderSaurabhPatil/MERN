const mongoose = require('mongoose');

// MongoDB URI (assuming MongoDB is running on localhost:27017)
const mongoURI = 'mongodb://localhost:27017/testdb';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a simple schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Create a model
const Item = mongoose.model('Item', itemSchema);

// Create a new document
const newItem = new Item({
  name: 'Sample Item',
  price: 100,
});

// Save the document to the database
newItem.save()
  .then(() => {
    console.log('Item saved successfully!');
  })
  .catch((err) => {
    console.error('Error saving item:', err);
  });
