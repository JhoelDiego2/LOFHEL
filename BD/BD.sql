-- Tabela Cadastro PI  

CREATE DATABASE lofhel;  
USE lofhel;  


CREATE TABLE cadastroLofhel( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    senha VARCHAR(20) NOT NULL, 
    dtNascimento DATE NOT NULL, 
    complemento VARCHAR(25) DEFAULT '', 
    CEP CHAR(9) NOT NULL 
);   

CREATE TABLE clientes( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    nomeEmpresa VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    senha VARCHAR(20) NOT NULL, 
    complemento VARCHAR(25) DEFAULT '', 
    CEP CHAR(9) NOT NULL, 
    cnpj CHAR(14) NOT NULL, 
    telefone CHAR(11),
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);  

CREATE TABLE sensor( 
    idSensor INT PRIMARY KEY AUTO_INCREMENT, 
    nomeSensor VARCHAR(25), 
    temperaturaCelsius FLOAT NOT NULL, 
    umidade FLOAT NOT NULL, 
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP, 
    statusSensor VARCHAR(7) NOT NULL,  
    CONSTRAINT chkStatus CHECK (statusSensor IN ('Ativo', 'Inativo')) 
);  

CREATE TABLE vinho( 
    idVinho INT PRIMARY KEY AUTO_INCREMENT, 
    tipoVinho VARCHAR(60), 
    fermenVinho VARCHAR(25), 
    tempMininima CHAR(2) NOT NULL, 
    tempMaxima CHAR(2) NOT NULL, 
    pais VARCHAR(60) DEFAULT '', 
    produtor VARCHAR(60) 
);  

CREATE TABLE vinicola( 
    idVinicola INT PRIMARY KEY AUTO_INCREMENT, 
    tipoArmazem VARCHAR(60), 
    estoqueAtual INT, 
    estoqueMaximo INT, 
    areaVinicola INT
);