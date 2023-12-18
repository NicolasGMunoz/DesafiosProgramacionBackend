//I create ProductManager class and necessary methods
class ProductManager {


    constructor() {
        this.products = [];
    }

    //method of return products array
    getProducts = () => {
        return this.products;
    }


    //method of return products array by id 
    getProductById = (idProduct) => {
        const indexProduct = this.products.findIndex(product => product.id === idProduct);
        if (indexProduct === -1) {
            return `ID ${idProduct} NOT FOUND `;

        } else {
            return this.products[indexProduct];
        }
    }

    //method of add product to array
    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error to add product, incomplete value");
            return;
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //existing code condition
        const indexCode = this.products.some(product => product.code === code)
        if (indexCode) {
            console.log(`The product code ${product.code} alredy exists`);
        } else {
            //id generator
            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }
            this.products.push(product);
        }
    }

}
const productsManagement = new ProductManager();

//Devolución de un array vacio
console.log(productsManagement.getProducts());

//Cargamos un producto para porbar el metodo addProduct y recibimos la devolución del array con un producto agregado
productsManagement.addProduct("Core i7 8700k", "Microprocesador intel i7 8va Generacion", 2000, "/core-i7-8700k.png", "CPU001", 25);
console.log(productsManagement.getProducts());
console.log("-------------------------------------------------------------------------------------------------")
// Cargamos los demas productos y recibimos la devolución de los errores solicitados (codigo ya existente y valores sin completar) y tambien los demas productos agregados
productsManagement.addProduct("Core i5 8400", "Microprocesador intel i5 8va Generacion", 2000, "/core-i5-8400.png", "CPU002", 25);
productsManagement.addProduct("Corsair 16GB", "Memoria Ram Corsair 16GB DDR4", 1000, "/corsair-16GB.png", "Mem001", 10);
productsManagement.addProduct("Corsair 8GB", "Memoria Ram Corsair 8GB DDR4", 700, "/corsair-8GB.png", "Mem002", 45);
productsManagement.addProduct("Corsair 4GB", "Memoria Ram Corsair 4GB DDR4", 700, "/corsair-4GB.png", "Mem002", 45);
productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "/1050TI-4GB.png", "GPU001", 50);
productsManagement.addProduct("1050TI 4GB", "Placa de video Asus 1050TI 4GB", 2500, "GPU002", 50);
console.log("----------------------------------------------------------------------");
console.log(productsManagement.getProducts());
console.log("-------------------------------------------------------------------------------------------------");
//Probamos el funcionamiento del metodo getProductById deberiamos recibir el producto con id 3 y el error ID 10 not found
console.log(productsManagement.getProductById(3));
console.log(productsManagement.getProductById(10));





// updateProduct = async (idProduct, product) => {
//     try {
//         const products = await this.getProducts();
//         const indexProduct = products.findIndex(p => p.id === idProduct);

//         if (indexProduct != -1) {
//             if (products.some(p => p.code === product.code)) {
//                 console.log(`El codigo de prodcuto "${product.code}" ya se encuentra registrado`)
//             }
//             else {
//                 Object.assign(products[indexProduct], { title: product.title })
//                 Object.assign(products[indexProduct], { description: product.description })
//                 Object.assign(products[indexProduct], { code: product.code })
//                 Object.assign(products[indexProduct], { price: product.price })
//                 Object.assign(products[indexProduct], { status: product.status })
//                 Object.assign(products[indexProduct], { category: product.category })
//                 Object.assign(products[indexProduct], { thumbnail: product.thumbnail })
//                 await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
//                 return true;
//             }
//         } else {
//             return false;
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }