const  { ProductManager } = require('./managers/productManager.js')

const productsManagement = new ProductManager('./files/Products.json');

const pm = async () =>{

    //Devolución de un array vacio
    let products = await productsManagement.getProducts();
    console.log(products);

}

pm()



// //Cargamos un producto para porbar el metodo addProduct y recibimos la devolución del array con un producto agregado
// productsManagement.addProduct("Core i7 8700k", "Microprocesador intel i7 8va Generacion", 2000, "/core-i7-8700k.png", "CPU001", 25);
// console.log(productsManagement.getProducts());
// console.log("-------------------------------------------------------------------------------------------------")
// // Cargamos los demas productos y recibimos la devolución de los errores solicitados (codigo ya existente y valores sin completar) y tambien los demas productos agregados
// productsManagement.addProduct("Core i5 8400", "Microprocesador intel i5 8va Generacion", 2000, "/core-i5-8400.png", "CPU002", 25);
// productsManagement.addProduct("Corsair 16GB", "Memoria Ram Corsair 16GB DDR4", 1000, "/corsair-16GB.png", "Mem001", 10);
// productsManagement.addProduct("Corsair 8GB", "Memoria Ram Corsair 8GB DDR4", 700, "/corsair-8GB.png", "Mem002", 45);
// productsManagement.addProduct("Corsair 4GB", "Memoria Ram Corsair 4GB DDR4", 700, "/corsair-4GB.png", "Mem002", 45);
// productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "/1050TI-4GB.png", "GPU001", 50);
// productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "GPU002", 50);
// console.log("----------------------------------------------------------------------");
// console.log(productsManagement.getProducts());
// console.log("-------------------------------------------------------------------------------------------------");
// //Probamos el funcionamiento del metodo getProductById deberiamos recibir el producto con id 3 y el error ID 10 not found
// console.log(productsManagement.getProductById(3));
// console.log(productsManagement.getProductById(10));


