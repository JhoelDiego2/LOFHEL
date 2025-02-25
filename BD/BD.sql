-- Tabela Cadastro PI

Create database lofhel;

use lofhel;

create table cadastroEmpresa(
id INT primary key auto_increment,
nome varchar(45) not null,
email varchar(60) not null,
senha varchar(60) not null,
telefone char(11) default '',
celular char(11) not null,
cep char(8) not null,
cnpj char(14) not null,
complemento varchar(12) default ''
);

create table sensor(
idSensor int primary key auto_increment,
nomeSensor varchar(25),
temperaturaCelsius float not null,
umidade float not null,
dtCadastro datetime default current_timestamp,
statusSensor varchar(7) not null, 
constraint chkStatus
check (statusSensor in ( 'Ativo', 'Inativo'))
);

create table vinho(
idVinho int primary key auto_increment,
tipoVinho varchar(60),
fermenVinho varchar (25),
tempMininima char(2) not null,
tempMaxima char(2) not null,
pais varchar(60) default '',
produtor varchar(60)
);

create table vinicola(
idVinicola int primary key auto_increment,
tipoArmazem varchar(60),
estoqueAtual int,
estoqueMaximo int,
areaVinicola int
);