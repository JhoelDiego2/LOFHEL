-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo !!

/*
comandos para executar no mysql
*/

create database lofhel;
use lofhel;


/*CREATE USER 'apiLofhelWeb'@'localhost' IDENTIFIED BY 'Urubu100';
GRANT INSERT, UPDATE, SELECT ON lofhel.* TO 'apiLofhelWeb'@'localhost';
FLUSH PRIVILEGES;*/


create table Endereco (
    idEndereco int primary key,
    sigla char(2),
    cidade varchar(60),
    logradouro varchar(70),
    bairro varchar(70),
    numero int,
    cep char(9),
    complemento varchar(80)
); 



create table Empresa (
    idEmpresa int primary key,
    email varchar(100),
    senha varchar(30),
    nome varchar(50),
    cnpj varchar(15),
    data_cadastro datetime,
    nome_fantasia varchar(60),
    fkMatriz int,
    foreign key (fkMatriz) references tbEmpresa(idEmpresa)
);






create table Contato (
    idContato varchar(16) primary key,
    email varchar(255),
    dtContato date,
    empresa_idEmpresa int,
    foreign key (empresa_idEmpresa) references tbEmpresa(idEmpresa)
);

create table Funcionarios (
    idFuncionarios varchar(15) primary key,
    email varchar(255),
    password varchar(32),
    dtContratacao date,
    cargo varchar(45),
    fkSensor int,
    representante int,
    foreign key (representante) references tbEmpresa(idEmpresa)
);


create table Vinicola (
    idVinicola int primary key,
    nome varchar(40),
    fkEmpresa int,
    fkEndereco int,
    foreign key (fkEmpresa) references tbEmpresa(idEmpresa),
    foreign key (fkEndereco) references tbEndereco(idEndereco)
);


create table Armazem (
    idArmazem int primary key,
    nome varchar(60),
    umi_max int,
    umi_min int,
    fkEmpresa int,
    fkVinicola int,
    foreign key (fkEmpresa) references tbEmpresa(idEmpresa),
    foreign key (fkVinicola) references tbVinicola(idVinicola)
);

create table GrupoVinho (
    idGrupo int primary key,
    classe varchar(40),
    temp_max float,
    temp_min float
);

create table TipoVinho (
    idTipo int primary key,
    tipo varchar(40),
    fkGrupo int,
    fkArmazem int,
    foreign key (fkGrupo) references tbGrupoVinho(idGrupo),
    foreign key (fkArmazem) references tbArmazem(idArmazem)
);

create table Sensor (
    idSensor int primary key,
    nomeSerial char(12),
    nomeLocal varchar(60),
    fkArmazem int,
    foreign key (fkArmazem) references tbArmazem(idArmazem)
);

create table Registro (
    idRegistro int primary key,
    temperatura float,
    umidade float,
    dataTime datetime,
    fkSensor int,
    foreign key (fkSensor) references tbSensor(idSensor)
);

/*
insert into tbEndereco values (1, 'SP', 'São Paulo', 'Rua dos Vinhos', 'Mooca', 123, '03000-000', 'Próximo à praça');
insert into tbEmpresa values (1, 'empresa@loja.com', 'senha123', 'Loja de Vinhos', '12345678000199', now(), 'Vinhos SP', null);
insert into tbContato values ('cont001', 'contato@loja.com', '2025-04-07', 1);
insert into tbVinicola values (1, 'Vinícola Bela Uva', 1, 1);
insert into tbArmazem values (1, 'Armazém Central', 85, 40, 1, 1);
insert into tbGrupoVinho values (1, 'Premium', 28.5, 10.0);
insert into tbTipoVinho values (1, 'Tinto Seco', 1, 1);
insert into tbSensor values (1, 'SN1234567890', 'Parede Leste', 1);
insert into tbRegistro values (1, 25.6, 60.2, now(), 1);
insert into tbFuncionarios values ('func001', 'joao@loja.com', 'senha456', '2023-05-10', 'Técnico', 1, 1);

select e.nome, c.email
from tbEmpresa e
join tbContato c on e.idEmpresa = c.empresa_idEmpresa;
																							
select a.nome as Armazem, s.nomeLocal, d.temperatura, d.umidade, d.dataTime
from tbArmazem a
join tbSensor s on a.idArmazem = s.fkArmazem
join tbRegistro d on s.idSensor = d.fkSensor;

select t.tipo, g.classe
from tbTipoVinho t
join tbGrupoVinho g on t.fkGrupo = g.idGrupo;


alter table tbRegistro modify column idRegistro int auto_increment;*/
