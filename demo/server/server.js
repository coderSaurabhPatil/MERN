const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Item = require("./models/Item");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
    origin: "http://localhost:3000",  // Make sure this matches your frontend URL
    methods: ["GET", "POST", "DELETE"],  // Allow the relevant HTTP methods
}));
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});


app.post("/api/items", async (req, res) => {
    const { name } = req.body;
    const newItem = new Item({ name });
    await newItem.save();
    res.status(201).json(newItem);
});

app.get("/api/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.delete("/api/items/:id", async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).send("Item deleted");
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});