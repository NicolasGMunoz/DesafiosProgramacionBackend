import { Router } from "express";
import ProductManager from '../dao/dbManagers/products.db.managers.js'


const router = Router();
const productManager = new ProductManager();

//Endpoint que muestra todos los productos y puede recibir un query param para mostrar menos productos si el cliente lo desea
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = Number(req.query.limit);

        if (limit) {
            let productsLimit = products.slice(0, limit)
            return res.send(productsLimit)
        } else {
            res.send(products)
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//Endpoint que muestra el producto segun el id
router.get('/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(Number(req.params.pid));
        res.send(product)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

//Endpoint que crea un producto 
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.send({ status: 'Success', payload: product });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//Endpoint que actualiza un producto
router.put('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);
        const product = req.body;
        const tof = await productManager.updateProduct(id, product);
        const productUpdate = await productManager.getProductById(id);
        if (tof) {
            res.send({ status: 'succes', payload: productUpdate });
        } else {
            res.status(404).send({ message: 'Producto no encontrado / El codigo de producto ya existe' })
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    
});


//Endpoint que elimina un producto
router.delete('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);
        await productManager.deleteProduct(id);
    
        res.send({ status: 'Success', payload: `Product N° ${id} deleted` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    
});

export default router;