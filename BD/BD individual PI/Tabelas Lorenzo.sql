-- Criação do database lofhel

CREATE DATABASE lofhel;  
USE lofhel;  

-- Criando Tabela Para Cadastro dos integrantes da empresa --

CREATE TABLE cadastroIntegrantesLofhel( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    senha VARCHAR(20) NOT NULL, 
    dtNascimento DATE NOT NULL, 
    complemento VARCHAR(25) DEFAULT '', 
    CEP CHAR(9) NOT NULL 
);  
 
-- Inserindo dados na tabela cadastroLofhel --

INSERT INTO cadastroIntegrantesLofhel (nome, email, senha, dtNascimento, complemento, CEP) VALUES
('João Silva', 'joao.silva@email.com', 'senha123', '1990-05-15', 'Apto 301', '12345-678'),
('Maria Oliveira', 'maria.oliveira@email.com', 'senha456', '1985-11-20', 'Casa', '23456-789'),
('Carlos Souza', 'carlos.souza@email.com', 'senha789', '2000-02-10', '', '34567-890'),
('Ana Costa', 'ana.costa@email.com', 'senha321', '1995-08-25', 'Sala 502', '45678-901'),
('Lucas Pereira', 'lucas.pereira@email.com', 'senha654', '1988-03-30', 'Bloco B, Apto 202', '56789-012');

SELECT * FROM cadastroIntegrantesLofhel;

DROP TABLE cadastroIntegrantesLofhel;

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
('Pedro Almeida', 'InovaTech', 'pedro.almeida@email.com', 'senha123', '12345-678', 'Apto 301', '12345678000195', '11987654321', '2025-03-10 08:30:00'),
('Luciana Rocha', 'Consultoria Rocha', 'luciana.rocha@email.com', 'senha456', '23456-789', 'Casa', '98765432000188', '21987654321', '2025-03-09 14:45:00'),
('Fernando Costa', 'Construtora Costa', 'fernando.costa@email.com', 'senha789', '34567-890', '', '45678901000172', '31987654321', '2025-03-08 10:15:00'),
('Juliana Pereira', 'Pereira & Filhos', 'juliana.pereira@email.com', 'senha321', '45678-901', 'Sala 502', '12312313000152', '47987654321', '2025-03-07 18:00:00'),
('Ricardo Lima', 'Lima Serviços', 'ricardo.lima@email.com', 'senha654', '56789-012', 'Bloco B, Apto 202', '78945612000140', '61987654321', '2025-03-06 12:20:00');

SELECT * FROM clientes;

DROP TABLE clientes;

-- Criando Tabela Para o Sensor --

CREATE TABLE sensor( 
    idSensor INT PRIMARY KEY AUTO_INCREMENT, 
    nomeSensor VARCHAR(25), 
    temperaturaCelsius FLOAT NOT NULL, 
    umidade FLOAT NOT NULL, 
    statusSensor VARCHAR(7) NOT NULL,  
    CONSTRAINT chkStatus CHECK (statusSensor IN ('Ativo', 'Inativo')) ,
	dtCadastro DATETIME 

);  

-- Inserindo dados na tabela sensor--

INSERT INTO sensor (nomeSensor, temperaturaCelsius, umidade, statusSensor, dtCadastro) VALUES
('Sensor A', 25.3, 60.5, 'Ativo', '2025-03-10 08:30:00'),
('Sensor B', 28.1, 55.2, 'Ativo', '2025-03-10 09:00:00'),
('Sensor C', 22.7, 70.0, 'Inativo', '2025-03-10 09:30:00'),
('Sensor D', 19.5, 80.3, 'Ativo', '2025-03-10 10:00:00'),
('Sensor E', 26.4, 65.8, 'Inativo', '2025-03-10 10:30:00');

SELECT * FROM sensor;

DROP TABLE sensor;

-- Criando Tabela para o Vinho --

CREATE TABLE vinho( 
    idVinho INT PRIMARY KEY AUTO_INCREMENT, 
    tipoVinho VARCHAR(60), 
    fermenVinho VARCHAR(25), 
    pais VARCHAR(60), 
    produtor VARCHAR(60) 
);  

-- Inserindo dados na tabela vinho --

INSERT INTO vinho (tipoVinho, fermenVinho, pais, produtor) VALUES
('Cabernet Sauvignon', 'Fermentação Malolática', 'França', 'Château Margaux'),
('Merlot', 'Fermentação Alcoólica', 'Estados Unidos', 'Robert Mondavi'),
('Pinot Noir', 'Fermentação Malolática', 'França', 'Domaine de la Romanée-Conti'),
('Chardonnay', 'Fermentação Alcoólica', 'Chile', 'Concha y Toro'),
('Sauvignon Blanc', 'Fermentação Malolática', 'Nova Zelândia', 'Cloudy Bay');

SELECT * FROM vinho;

DROP TABLE vinho;
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

DROP TABLE vinicola;

-- Dropando o database lofhel

DROP DATABASE lofhel;

