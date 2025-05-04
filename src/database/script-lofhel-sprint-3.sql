-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo !!

/*
comandos para executar no mysql
*/


CREATE DATABASE Lofhel;
USE Lofhel

/*CREATE USER 'apiLofhelWeb'@'localhost' IDENTIFIED BY 'Urubu100';
GRANT INSERT, UPDATE, SELECT ON lofhel.* TO 'apiLofhelWeb'@'localhost';
FLUSH PRIVILEGES;*/ 
--tabela empresa
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeRazaoSocial VARCHAR(50) NOT NULL,
    nomeFantasia VARCHAR(60),
    cnpj CHAR(14) NOT NULL UNIQUE,
    senha VARCHAR (45)NOT NULL,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    fkMatriz INT, 
    CONSTRAINT fkMatrizFiliar FOREIGN KEY (fkMatriz) REFERENCES Empresa(idEmpresa)
) 

-- Tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    logradouro VARCHAR(70) NOT NULL,
    bairro VARCHAR(70),
    numero VARCHAR(10),
    cep VARCHAR(9),
    complemento VARCHAR(80),
) 

-- Tabela Vinicola (Filial)
CREATE TABLE Vinicola (
    idVinicola INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    fkEmpresa INT NOT NULL,
    fkEndereco INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Cargo nao concreticzada
 /*
CREATE TABLE Cargo (
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL UNIQUE,
    descricao VARCHAR(200),
    nivelAcesso ???
);*/


-- Tabela Funcionario
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Vinicola(idVinicola)
);

-- Tabela Armazem a umidade poderia sair é um capmo fixo para todos
CREATE TABLE Armazem (
    idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(200),
    umidadeMax INT NOT NULL,
    umidadeMin INT NOT NULL,
    fkVinicola INT NOT NULL,
    FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola)
);

-- Tabela GrupoVinho
CREATE TABLE GrupoVinho (
    idGrupoVinho INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE,
    temperaturaMax FLOAT NOT NULL,
    temperaturaMin FLOAT NOT NULL,
);

-- Tabela TipoVinho
CREATE TABLE TipoVinho (
    idTipoVinho INT AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    descricao VARCHAR(200),
    fkGrupoVinho INT NOT NULL,
    fkArmazem INT NOT NULL,
    CONSTRAINT pkCompostaVinho PRIMARY KEY (idTipoVinho, fkGrupoVinho, fkArmazem)
    FOREIGN KEY (fkGrupoVinho) REFERENCES GrupoVinho(idGrupoVinho),
    FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem)
);

-- Tabela Sensor
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    codigoSerial CHAR(12) NOT NULL UNIQUE,
    fkArmazem INT NOT NULL,
    FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem)
);

-- Tabela RegistroSensor
CREATE TABLE RegistroSensor (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperatura FLOAT NOT NULL,
    umidade FLOAT NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FKSensor INT NOT NULL,
    FOREIGN KEY (idSensor) REFERENCES Sensor(idSensor)
);

-- Tabela Alerta
CREATE TABLE Alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(30) NOT NULL,
    severidade VARCHAR(10) NOT NULL,
    mensagem VARCHAR(200) NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FKRegistro INT,
    fkSensor INT NOT NULL,
    fkVinicola INT NOT NULL,
    FOREIGN KEY (fkRegistro) REFERENCES RegistroSensor(idRegistro),
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola)
);