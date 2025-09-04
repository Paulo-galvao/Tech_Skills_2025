CREATE TABLE clientes(
    id Serial PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(100),
    data_nasc DATE,
    data_cadastro TIMESTAMP DEFAULT now()
);

CREATE TABLE enderecos(
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(150) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(60) NOT NULL,
    complemento VARCHAR(100), 
    referencia VARCHAR(200),
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL
);

CREATE TABLE enderecos_clientes(
    cliente_id INT NOT NULL,
    endereco_id INT NOT NULL,
    tipo VARCHAR(30) NOT NULL CHECK('entrega', 'cobranca'),
    CONSTRAINT pk_enderecos_clientes PRIMARY KEY(cliente_id, endereco_id),
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    CONSTRAINT fk_endereco FOREIGN KEY (endereco_id) REFERENCES endereco(id),
);

CREATE TABLE itens(
    id Serial PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    valor NUMERIC(10,2) NOT NULL,
    tempo_preparo INTERVAL,
    imagem VARCHAR(200)
);

CREATE TABLE pedidos(
    id Serial PRIMARY KEY,
    cliente_id INT NOT NULL,
    descricao VARCHAR(500),
    data_pedido TIMESTAMP NOT NULL,
    data_entrega TIMESTAMP NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY cliente_id REFERENCES cliente(id),
);

CREATE TABLE itens_pedidos(
    itens_id INT NOT NULL,
    pedidos_id INT NOT NULL,
    CONSTRAINT pk_itens_pedidos PRIMARY KEY(itens_id, pedidos_id),
    CONSTRAINT fk_itens FOREIGN KEY (itens_id) REFERENCES itens(id),
    CONSTRAINT fk_pedidos FOREIGN KEY (pedidos_id) REFERENCES pedidos(id),
);
