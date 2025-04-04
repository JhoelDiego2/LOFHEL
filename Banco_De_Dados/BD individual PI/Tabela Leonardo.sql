CREATE DATABASE Lofhel;

USE Lofhel;

CREATE TABLE Cadastro(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nomeEmpresa VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(20) NOT NULL,
  CNPJ CHAR(14) NOT NULL,
  telefone CHAR(11) NOT NULL,
  endereco VARCHAR(30) NOT NULL,
  complemento VARCHAR(30)
);

CREATE TABLE sensor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(45) NOT NULL,
  dtInstalacao DATE NOT NULL,
  temperatura FLOAT,
  umidade FLOAT,
  statusSensor VARCHAR(7) NOT NULL,
  CONSTRAINT chk_status
    CHECK (statusSensor IN ('Ativo', 'Inativo'))
);

CREATE TABLE vinicola( 
  id INT PRIMARY KEY AUTO_INCREMENT, 
  tipoArmazem VARCHAR(60), 
  qtd INT, 
  qtdMax INT, 
  areaVinicula FLOAT
);
