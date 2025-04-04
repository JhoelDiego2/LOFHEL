CREATE DATABASE Lofhel;
USE Lofhel;

CREATE TABLE CadastroEmpresa(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nomeEmpresa VARCHAR(45) NOT NULL,
emailCorporativo VARCHAR(45) NOT NULL,
senha VARCHAR(20) NOT NULL,
CNPJ CHAR(14) NOT NULL,
telefone CHAR(11) DEFAULT '',
celular CHAR(11) NOT NULL,
complemento VARCHAR(25) NOT NULL 
);

CREATE TABLE sensor (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo VARCHAR(45) NOT NULL,
dt_instalacao DATE NOT NULL,
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
status_sensor VARCHAR(7) NOT NULL,
CONSTRAINT chk_status
CHECK (status_sensor IN ('Ativo', 'Inativo'))
);

CREATE TABLE vinho(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
ano DATE,
tipo VARCHAR(45),
pais_origem VARCHAR(45),
produtor VARCHAR(45)
);


	
    
