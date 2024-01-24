import express from "express";
import ProductManager from "./managers/productManager.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, './files/Products.json');

const app = express();

const productManager = new ProductManager(productsPath)

app.get('/products', async (req, res) =>{
    let products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if(limit){
        let productsLimit = products.slice(0, limit);
        return res.send(productsLimit);
    }
       return res.send(products)
    

});

app.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid));
    res.send(product)
});


app.listen(8080,()=>console.log("Listening on 8080"))