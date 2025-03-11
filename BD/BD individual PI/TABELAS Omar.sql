-- Tabelas para sprint 1 PI

-- Tabela 1 (Cadastro)

CREATE DATABASE cadastro;

USE cadastro;

CREATE TABLE empresa (
idCadastro int primary key auto_increment,
EMAIL varchar (25),
TELEFONE varchar(20),
CNPJ char (14),
NOME varchar (100),
ENDERECO varchar (100),
dtCriacao date
);

SELECT * FROM empresa;


-- Tabela 2 (sensor)

CREATE DATABASE sensor;

USE sensor;

CREATE TABLE sensores (
idSensor int primary key auto_increment,
dtCadastro date,
tipo varchar(10) not null,
statusSensor varchar(30),
constraint chkStatus
check (statusSensor IN ('Adequado' , 'Inadequado'))
);

SELECT * FROM sensores;

-- Tabela 3 (registro)

CREATE TABLE registro (
idVinho int primary key auto_increment,
tempAtual CHAR(2) not null,
produtor varchar(60),
pais varchar(60),
tipoVinho varchar(60)
);

SELECT * FROM registro;

-- Tabela 4 (Vinicola)

CREATE TABLE vinicola (
idVinicola int primary key auto_increment,
estoqueAtual int,
estoqueMax int,
tipoArmazem varchar(60)
);

SELECT * FROM vinicola;

