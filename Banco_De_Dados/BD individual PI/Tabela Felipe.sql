-- Criação do database lofhel

CREATE DATABASE lofhel;  
USE lofhel;  


-- Criando Tabela Para Cadastro dos integrantes da empresa --

CREATE TABLE cadastroLofhel( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    senha VARCHAR(20) NOT NULL, 
    dtNascimento DATE NOT NULL, 
    complemento VARCHAR(25) DEFAULT '', 
    CEP CHAR(9) NOT NULL 
	);  

 
-- Inserindo dados na tabela cadastroLofhel --

INSERT INTO cadastroLofhel (nome, email, senha, dtNascimento, complemento, CEP) VALUES
('Leonardo Monteiro', 'leonardo.monteiro@sptech.school', 'senha123', '1990-05-15', 'Apto 301', '12345-678'),
('João Vitor Carlos de Almeida Araujo', 'joao.varaujo@sptech.school', 'senha456', '1985-11-20', 'Casa', '23456-789'),
('Lorenzo Meni Rodrigues', 'lorenzo.rodrigues@sptech.school', 'senha789', '2000-02-10', '', '34567-890'),
('Henrique Dourado Domingos', 'henrique.domingos@sptech.school', 'senha321', '1995-08-25', 'Sala 502', '45678-901'),
('Omar Nidal Nabih Dahbur', 'omar.dabuh@sptech.school', 'senha654', '1988-03-30', 'Bloco B, Apto 202', '56789-012'),
('Edson Felix Marques', 'edson.marques@sptech.school', 'senha654', '1988-03-30', 'Bloco B, Apto 202', '56789-012'),
('Felipe Queiroz de Lima', 'felipe.qlima@sptech.school', 'senha654', '1988-03-30', 'Bloco B, Apto 202', '56789-012');

SELECT * FROM cadastroLofhel;

-- Criando Tabela Para Identificação de clientes --

CREATE TABLE clientes( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    nomeEmpresa VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    senha VARCHAR(20) NOT NULL, 
    CEP CHAR(9) NOT NULL,
    complemento VARCHAR(25) DEFAULT '',
    cnpj CHAR(14) NOT NULL, 
    telefone CHAR(11),
    dtCadastro DATETIME
	);

-- Inserindo dados na tabela clientes --
 
INSERT INTO clientes (nome, nomeEmpresa, email, senha, CEP, complemento, cnpj, telefone, dtCadastro) VALUES
('Pedro Almeida', 'Casa Valduga', 'pedro.almeida@email.com', 'senha123', '12345-678', 'Apto 301', '12345678000195', '11987654321', '2025-03-10 08:30:00'),
('Luciana Rocha', 'Miolo Wine Group', 'luciana.rocha@email.com', 'senha456', '23456-789', 'Casa', '98765432000188', '21987654321', '2025-03-09 14:45:00'),
('Fernando Costa', 'Salton', 'fernando.costa@email.com', 'senha789', '34567-890', '', '45678901000172', '31987654321', '2025-03-08 10:15:00'),
('Juliana Pereira', 'Aurora', 'juliana.pereira@email.com', 'senha321', '45678-901', 'Sala 502', '12312313000152', '47987654321', '2025-03-07 18:00:00'),
('Ricardo Lima', 'Guaspari', 'ricardo.lima@email.com', 'senha654', '56789-012', 'Bloco B, Apto 202', '78945612000140', '61987654321', '2025-03-06 12:20:00');

SELECT * FROM clientes;

-- Criando Tabela Para o Sensor --

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nomeSensor VARCHAR(25),
    temperaturaLocal FLOAT NOT NULL,
    umidadeLocal FLOAT NOT NULL,
    statusSensor VARCHAR(7) NOT NULL,
    dtCadastro DATETIME,
    CONSTRAINT chk_temperatura CHECK (temperaturaLocal >= 7 AND temperaturaLocal <= 18),
    CONSTRAINT chk_umidade CHECK (umidadeLocal >= 50 AND umidadeLocal <= 80),
    CONSTRAINT chk_status CHECK (statusSensor IN ('Ativo', 'Inativo'))
);

-- Inserindo dados na tabela sensor--

INSERT INTO sensor (nomeSensor, temperaturaLocal, umidadeLocal, statusSensor, dtCadastro) VALUES
('Sensor A', 7.8, 60.5, 'Ativo', '2025-01-10 08:30:00'),
('Sensor B', 17.5, 55.2, 'Ativo', '2025-03-10 09:00:00'),
('Sensor C', 15.7, 70.0, 'Inativo', '2025-02-10 09:30:00'),
('Sensor D', 12.1, 79.9, 'Ativo', '2025-01-17 10:00:00'),
('Sensor E', 9.5, 65.8, 'Inativo', '2025-02-14 10:30:00');

SELECT * FROM sensor;

-- Criando Tabela para o Vinho --

CREATE TABLE vinho( 
    idVinho INT PRIMARY KEY AUTO_INCREMENT, 
    nomeVinho VARCHAR(60), 
    tipoVinho VARCHAR(60),
    fermenVinho VARCHAR(25), 
    pais VARCHAR(60), 
    produtor VARCHAR(60) 
	);  

-- Inserindo dados na tabela vinho --

INSERT INTO vinho (nomeVinho, tipoVinho, fermenVinho, pais, produtor) VALUES
('Cabernet Sauvignon', 'Tinto', 'Fermentação Malolática', 'França', 'Château Margaux'),
('Merlot', 'Tinto', 'Fermentação Alcoólica', 'Estados Unidos', 'Robert Mondavi'),
('Pinot Noir', 'Tinto', 'Fermentação Malolática', 'França', 'Domaine de la Romanée-Conti'),
('Chardonnay', 'Branco', 'Fermentação Alcoólica', 'Chile', 'Concha y Toro'),
('Sauvignon Blanc', 'Branco', 'Fermentação Malolática', 'Nova Zelândia', 'Cloudy Bay');

SELECT * FROM vinho;

-- Criando Tabela Para Vinícola --

CREATE TABLE vinicola( 
    idVinicola INT PRIMARY KEY AUTO_INCREMENT, 
    tipoArmazem VARCHAR(60), 
    estoqueAtual INT, 
    estoqueMaximo INT, 
    areaVinicola INT
);

-- Inserindo dados na tabela vinicola --

INSERT INTO vinicola (tipoArmazem, estoqueAtual, estoqueMaximo, areaVinicola)VALUES
('Armazém de Barris', 150, 500, 1000),
('Armazém de Garrafas', 200, 600, 1200),
('Armazém de Uvas', 300, 700, 1500),
('Armazém Climatizado', 120, 400, 800),
('Armazém Seco', 250, 800, 1100);

SELECT * FROM vinicola;

-- Renomeando as colunas

SELECT nome AS 'Nome dos integrantes da Lofhel', 
email AS 'Email para contato' FROM cadastroLofhel ORDER BY nome;

SELECT nomeEmpresa AS 'Clientes da empresa' FROM clientes ORDER BY nomeEmpresa;

SELECT temperaturaLocal AS 'Controle da temperatura', 
umidadeLocal AS 'Controle da umidade' FROM sensor;

SELECT nomeVinho AS 'Nome do vinho', 
tipoVinho AS 'Tipo do vinho',fermenVinho AS 'Tipo de fermentação',
pais AS 'País de origem', produtor AS 'Produtor do vinho'FROM vinho;

SELECT tipoArmazem AS 'Tipo de armazenamento',
estoqueAtual AS 'Estoque atual',estoqueMaximo AS 'Capacidade máxima',
areaVinicola AS 'Área da vinícola'FROM vinicola;

-- Dropando o database lofhel

DROP DATABASE lofhel;

