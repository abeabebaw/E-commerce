const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Ecommerce");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

// Ensure upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// File storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images only (jpeg, jpg, png, gif)!');
        }
    }
});

// Serve static files
app.use('/images', express.static(uploadDir));

// Product Schema and Model
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// User Schema and Model
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to verify token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
};

// Upload route
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: 0,
            message: "No file uploaded or invalid file type" 
        });
    }

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Add product route
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }
        
        const newProduct = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await newProduct.save();

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Remove product route
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all products route
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// New collections route
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("New collection fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Popular in women route
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popular = products.slice(0, 4);
        res.send(popular);
    } catch (error) {
        console.error("Error fetching popular women products:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Related products route - NEW ENDPOINT
app.get('/relatedproducts/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        
        // Find the current product
        const currentProduct = await Product.findOne({ id: productId });
        
        if (!currentProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }
        
        // Find related products (same category, excluding the current product)
        const relatedProducts = await Product.find({
            category: currentProduct.category,
            id: { $ne: productId }, // Exclude the current product
            available: true
        }).limit(4); // Limit to 4 related products
        
        res.json({
            success: true,
            relatedProducts
        });
    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ 
                success: false,
                errors: "Existing user found with same email address" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: {}
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' });
        res.json({ success: true, token });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                errors: "User not found" 
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ 
                success: false,
                errors: "Invalid password" 
            });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' });
        res.json({ success: true, token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Get user data endpoint (protected)
app.get('/userdata', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        
        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }
        
        // Increment the item count
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
        
        await Users.findOneAndUpdate(
            { _id: req.user.id }, 
            { cartData: userData.cartData }
        );
        
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Remove from cart endpoint
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        
        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }
        
        // Decrement the item count, but don't go below 0
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            
            // Remove the item if quantity becomes 0
            if (userData.cartData[req.body.itemId] === 0) {
                delete userData.cartData[req.body.itemId];
            }
        }
        
        await Users.findOneAndUpdate(
            { _id: req.user.id }, 
            { cartData: userData.cartData }
        );
        
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get cart data endpoint
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData || {});
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: 0,
            message: err.message
        });
    } else if (err) {
        return res.status(500).json({
            success: 0,
            message: err.message || "Something went wrong"
        });
    }
    next();
});

// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
        console.log(`Visit: http://localhost:${port}`);
    } else {
        console.error("Server failed to start:", error); 
    }
});