import express from 'express';
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import ProductManager from './managers/productManager.js'
import { __dirname } from './util.js';
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js"
import path from 'node:path'

const productsPath = path.join(__dirname, './files/products.json')
const productManager = new ProductManager(productsPath)

const app = express();
const httpServer = app.listen(8080,() => console.log("Listening on port 8080"));
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter)

socketServer.on('connection', socket =>{
    console.log('new client connected');

    socket.on('addProduct', async (data) =>{
        console.log(data);
        try {
         await productManager.addProduct(data);
         socketServer.emit('showProducts', await productManager.getProducts());
        } catch (error) {
         console.error(error);
        } 
     });
 
     socket.on('removeProduct', async (data) =>{
         try {
             const idRemove = parseInt(data);
             await productManager.deleteProduct(idRemove);
             socketServer.emit('showProducts', await productManager.getProducts());
         } catch (error) {
             console.error(error);
         }
     });

});
