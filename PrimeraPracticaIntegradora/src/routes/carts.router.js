import { Router } from "express"
import Carts from '../dao/dbManagers/carts.db.managers.js'


const router = Router();

const cartManager = new Carts();

//Endpoint que crea un carrito
router.post('/', async (req, res) => {
    const cart = { products: [] };
    const newCart = await cartManager.addCart(cart);
    res.send({ status: 'succes', message: 'Carrito creado', payload: newCart })
});


// Endpoint que muestra un carrito
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(cid);

    if (cart) {
        res.send({ status: 'succes', payload: cart.products })
    } else {
        res.status(404).send({ message: 'carrito no encontrado' })
    }


});



//Endpoint que agrega un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartID = Number(req.params.cid);
        const productID = Number(req.params.pid);

        const productCart = await cartManager.getCartById(cartID);

        if(productCart.products.some(product => product.id === productID)){
            const cantidad = productCart.products.find(product => product.id === productID).quantify;
            const result = await cartManager.updateCart(cartID, { id: productID, quantify: 1});
            res.status(200).send({ status: 'success', payload: result });
        }else { 
            const result = await cartManager.updateCart(idCart, { id: idProduct, quantity: 1 });
            res.status(200).send({ status: 'success', payload: result }); 
        }

    } catch (error) {
        res.status(400).send({ error: error.message });
    }

});


export default router;