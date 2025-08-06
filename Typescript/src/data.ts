let produto:string = 'lapis';
let preco:number = 2.99;
let estaEmEstoque:boolean;

let categorias:string[];

let coordenadas: [number, number];

enum status {
    pendente,
    processando,
    entregue,
    cancelado
};

function precoProduto( produto:string, preco:number ) {
    return console.log(`O produto ${produto} custa ${preco}`);
}

precoProduto(produto, preco);