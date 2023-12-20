const { ProductManager } = require('./managers/productManager.js')

const productsManagement = new ProductManager('./files/Products.json');

const pm = async () => {

    // //Devolución de un array vacio ya que no existe ningun json todavia
    let products = await productsManagement.getProducts();
    console.log(products);
    console.log("----------------------------------------------------------------------");

    //Cargamos un producto para porbar el metodo addProduct y recibimos la devolución del array con un producto agregado
    await productsManagement.addProduct("Core i7 8700k", "Microprocesador intel i7 8va Generacion", 2000, "/core-i7-8700k.png", "CPU001", 25);
    products = await productsManagement.getProducts();
    console.log(products);
    console.log("----------------------------------------------------------------------");

    //Cargamos los demas productos y recibimos la devolución de los errores solicitados(codigo ya existente y valores sin completar) y tambien los demas productos agregados
    await productsManagement.addProduct("Core i5 8400", "Microprocesador intel i5 8va Generacion", 2000, "/core-i5-8400.png", "CPU002", 25);
    await productsManagement.addProduct("Corsair 16GB", "Memoria Ram Corsair 16GB DDR4", 1000, "/corsair-16GB.png", "Mem001", 10);
    await productsManagement.addProduct("Corsair 8GB", "Memoria Ram Corsair 8GB DDR4", 700, "/corsair-8GB.png", "Mem002", 45);
    await productsManagement.addProduct("Corsair 4GB", "Memoria Ram Corsair 4GB DDR4", 700, "/corsair-4GB.png", "Mem002", 45);
    await productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "/1050TI-4GB.png", "GPU001", 50);
    await productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "GPU002", 50);
    console.log("----------------------------------------------------------------------");
    products = await productsManagement.getProducts();
    console.log(products);
    console.log("----------------------------------------------------------------------");

    //Probamos el funcionamiento del metodo getProductById deberiamos recibir el producto con id 3 y el error ID 10 not found
    await productsManagement.getProductById(3);
    console.log("----------------------------------------------------------------------");
    await productsManagement.getProductById(10);
    console.log("----------------------------------------------------------------------");

    
    // Probamos el funcionamiento del metodo updateProduct, deberiamos poder realizar el cambio en el producto 3 anteriormente recibido
    await productsManagement.updateProduct(3, {title: "Corsair 32GB", description: "Memoria Ram Corsair 32GB DDR4", price: 1500, thumbnail: "/corsair-32GB.png",code: "Mem001", stock: 15})
    console.log("----------------------------------------------------------------------");

    // Probamos el funcionamiento del metodo deleteProduct, deberiamos poder eliminar el producto 5 
    await productsManagement.deleteProduct(4);
    console.log("----------------------------------------------------------------------");
    products = await productsManagement.getProducts();
    console.log(products);

}

pm()


// Recomiendo borrar el products.json antes de ejecutar el codigo para poder verificar la funcionalidad de todos los requerimentos!

