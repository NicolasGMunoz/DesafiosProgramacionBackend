const socket = io()

const container = document.getElementById('viewProducts');
const primerForm = document.getElementById('form1');
const segundoForm = document.getElementById('form2');

socket.on('showProducts', data => {
    data.forEach(prod => {
        container.innerHTML += `
        <ul>
            <li>Title: ${prod.tittle}</li> 
            <li>Description: ${prod.description}</li>
            <li>Price: ${prod.price}</li>
            <li>Stock: ${prod.stock}</li>
            <li>ID: ${prod._id}</li>
        </ul>
        `
    });
})

primerForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const newProduct = JSON.parse(document.getElementById('addproduct').value);
    console.log(newProduct);
    socket.emit('addProduct', newProduct);
    productIdInput.value = '';
});

segundoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('removeproduct').value;
    socket.emit('removeProduct', id);
    productIdInput.value = '';
});