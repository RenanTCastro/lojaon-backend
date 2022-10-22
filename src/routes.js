const express = require("express")
const routes = express.Router();
const authMiddleware = require("../src/middleware/auth.middleware")

// Controllers
const UserController = require("./controllers/UserController")
const ProductController = require("./controllers/ProductController")

// User routes
routes.post('/register', UserController.register);
routes.get('/login', UserController.login);
routes.put('/editarPerfil/:user_id', UserController.editarPerfil);

// Product routes
routes.post('/addProduct', ProductController.addProduct);
routes.get('/getProduct/:product_id', ProductController.getProduct);
routes.get('/getAllProducts/:user_id', ProductController.getAllProducts);
routes.put('/editProduct/:product_id', ProductController.editProduct);
routes.delete('/deleteProduct/:product_id', ProductController.deleteProduct);

module.exports = routes