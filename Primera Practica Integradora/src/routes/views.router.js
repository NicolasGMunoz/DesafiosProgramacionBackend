import { Router } from "express";
import ProductManager from '../dao/dbManager/managers/products.managers.js';

const router = Router()
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const productsList = await productManager.getProducts();
        res.render("home", {products: productsList});
    } catch (error) {
        res.render("home", {error: error.message})
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        const productsList = await productManager.getProducts();
        res.render("realtimeproducts", {products: productsList});
    } catch (error) {
        res.render("realtimeproducts", {error: error.message})
    }
})



export default router