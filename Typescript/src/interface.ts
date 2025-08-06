import console = require("node:console")

interface User {
    id:number,
    name:string,
    email:string,
    isActive:boolean,
}

interface Product {
    id:number,
    name:string,
    price:number,
    inStock:boolean,
    categories:string[],
}

type UserRole = {
    type: 'admin' | 'user',
}

interface AdminUser extends User {
    role:UserRole
}


let usuario:User = {
    id: 1,
    name: 'jose',
    email: 'jose@jose.com',
    isActive: true,
}
    
let produto:Product = {
    id: 1,
    name: 'lapis',
    price: 2.99,
    inStock: true,
    categories: ['a', 'b'],
}

let admUser:AdminUser = {
    id: 2,
    name: 'joao',
    email: "joao@joao.com",
    isActive: true,
    role: {type: 'admin'}
}

function showUser(user:AdminUser):string {    
    return `Usuário: \nnome: ${user.name} \nemail: ${user.email} \nativo: ${user.isActive} \nrole: ${user.role.type}`;
}

function showProduct(product:Product):string {
    return `Produto: \nnome: ${product.name} \npreço: ${product.price} \nesta em estoque? ${product.inStock} \ncategorias: ${product.categories.map(c => c)}`;
}

function show(user:AdminUser):object {
    return user;
}

console.log(showUser(admUser));
console.log('');
console.log(showProduct(produto));
console.log('');
console.log(show(admUser));
