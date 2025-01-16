const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/reactcrud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple schema for our items
const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Item = mongoose.model('Item', itemSchema);

// Routes
// Create new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).send(newItem);
});

// Get all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.status(200).send(items);
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(updatedItem);
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  res.status(200).send(deletedItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
