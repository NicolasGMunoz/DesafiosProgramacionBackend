import { cartsModel } from '../dbManagers/models/carts.models.js'

export default class Carts {
    constructor(){}

    getCart = async () =>{
        const carts = await cartsModel.find();
        return carts;
    }

    addCart = async (cart) =>{
        const newCart = await cartsModel.create(cart);
        return newCart;
    }

    getCartById = async (id) =>{
        const idCart = await cartsModel.find({_id : id});
        return idCart;
    }

    updateCart = async (id, product) =>{
        const cartUpdated = await cartsModel.updateOne({_id : id}, product);
        return cartUpdated;
    }

    deleteCart = async (id) =>{
        const cartDeleted = await cartsModel.deleteOne({_id : id});
        return cartDeleted
    }
}