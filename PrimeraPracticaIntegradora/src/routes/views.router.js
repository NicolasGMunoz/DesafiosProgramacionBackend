import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.db.managers.js";


const router = Router()
const productManager = new ProductManager();



router.get("/", async (req, res)=>{
    const productsList = await productManager.getProducts()
    res.render("home", {products: productsList})
})


router.get("/realtimeproducts", async (req, res)=>{
    const productsList = await productManager.getProducts()
    res.render("realtimeproducts", {products: productsList})
})



export default router