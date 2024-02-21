import { Router } from 'express';
import ProductManager from '../dao/dbManager/managers/products.managers.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req,res) => {
    try {
        const products = await productManager.getProducts();
        const limit = Number(req.query.limit);
    
        if(limit){
            let productsLimit = products.slice(0, limit);
            return res.status(200).send(productsLimit);
        }else {
            res.status(200).send(products);
        }   
    } catch (error) {
        res.status(404).send({ error: 'product not found' });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const idProduct = Number(req.params.pid);
        const product = await productManager.getProductByiD(idProduct);
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send({error: 'product not found'})
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(200).send({status: 'succes', payload: product});
    } catch (error) {
        res.status(404).send({error: error.message});
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid);
        const productBody = req.body;
    
        const tof = await productManager.updateProduct(productId, productBody);
        const productUpdated = await productManager.getProductByiD(productId);
    
        if (tof) {
            res.status(200).send({satus: 'succes', payload: productUpdated})
        }else {
            res.status(404).send({error: error.message, message: 'Product not found or Product code alredy exist' })
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid);
        await productManager.deleteProduct(productId);

        res.status(200).send({status: 'succes', payload: `Product N° ${productId} deleted`})
    } catch (error) {
        res.status(404).send({error: error.message}); 
    }
})

export default router;