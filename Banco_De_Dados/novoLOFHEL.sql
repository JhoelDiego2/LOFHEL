drop database lofhel;
create database lofhel;
use lofhel;

create table endereco (
    idEndereco int primary key,
    sigla char(2),
    cidade varchar(60),
    logradouro varchar(70),
    bairro varchar(70),
    numero int,
    cep char(9),
    complemento varchar(80)
);

create table empresa (
    idEmpresa int primary key,
    email varchar(100),
    senha varchar(30),
    nome varchar(50),
    cnpj varchar(15),
    data_cadastro datetime,
    nome_fantasia varchar(60),
    fkMatriz int,
    foreign key (fkMatriz) references empresa(idEmpresa)
);

create table contato (
    idContato varchar(16) primary key,
    email varchar(255),
    dtContato date,
    empresa_idEmpresa int,
    foreign key (empresa_idEmpresa) references empresa(idEmpresa)
);

create table funcionarios (
    idFuncionarios varchar(15) primary key,
    email varchar(255),
    password varchar(32),
    dtContratacao date,
    cargo varchar(45),
    fkSensor int,
    representante int,
    foreign key (representante) references empresa(idEmpresa)
);


create table vinicola (
    idVinicola int primary key,
    nome varchar(40),
    fkEmpresa int,
    fkEndereco int,
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkEndereco) references endereco(idEndereco)
);

create table armazem (
    idArmazem int primary key,
    nome varchar(60),
    umi_max int,
    umi_min int,
    fkEmpresa int,
    fkVinicola int,
    foreign key (fkEmpresa) references empresa(idEmpresa),
    foreign key (fkVinicola) references vinicola(idVinicola)
);

create table grupo (
    idGrupo int primary key,
    classe varchar(40),
    temp_max float,
    temp_min float
);

create table tipo (
    idTipo int primary key,
    tipo varchar(40),
    quantidade int,
    fkGrupo int,
    fkArmazem int,
    foreign key (fkGrupo) references grupo(idGrupo),
    foreign key (fkArmazem) references armazem(idArmazem)
);

create table sensor_DHT11 (
    idSensor int primary key,
    nomeSerial char(12),
    nomeLocal varchar(60),
    fkArmazem int,
    foreign key (fkArmazem) references armazem(idArmazem)
);

create table dados_sensor (
    idDados_sensor int primary key,
    temperatura float,
    umidade float,
    dataTime datetime,
    fkSensor int,
    foreign key (fkSensor) references sensor_DHT11(idSensor)
);


insert into endereco values (1, 'SP', 'São Paulo', 'Rua dos Vinhos', 'Mooca', 123, '03000-000', 'Próximo à praça');
insert into empresa values (1, 'empresa@loja.com', 'senha123', 'Loja de Vinhos', '12345678000199', now(), 'Vinhos SP', null);
insert into contato values ('cont001', 'contato@loja.com', '2025-04-07', 1);
insert into vinicola values (1, 'Vinícola Bela Uva', 1, 1);
insert into armazem values (1, 'Armazém Central', 85, 40, 1, 1);
insert into grupo values (1, 'Premium', 28.5, 10.0);
insert into tipo values (1, 'Tinto Seco', 200, 1, 1);
insert into sensor_DHT11 values (1, 'SN1234567890', 'Parede Leste', 1);
insert into dados_sensor values (1, 25.6, 60.2, now(), 1);
insert into funcionarios values ('func001', 'joao@loja.com', 'senha456', '2023-05-10', 'Técnico', 1, 1);

select e.nome, c.email
from empresa e
join contato c on e.idEmpresa = c.empresa_idEmpresa;

select a.nome as Armazem, s.nomeLocal, d.temperatura, d.umidade, d.dataTime
from armazem a
join sensor_DHT11 s on a.idArmazem = s.fkArmazem
join dados_sensor d on s.idSensor = d.fkSensor;

select t.tipo, t.quantidade, g.classe
from tipo t
join grupo g on t.fkGrupo = g.idGrupo;
