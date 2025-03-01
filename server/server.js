const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String
});

const User = mongoose.model("User", UserSchema);

// API Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;
        const newUser = new User({ name, email, phone, city });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Route to get all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
