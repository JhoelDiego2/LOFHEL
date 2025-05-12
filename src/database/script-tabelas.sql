-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);
alter table usuario add column cpf VARCHAR(14);


CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);



insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);
show tables;
select * from empresa;
select * from aquario;
select * from usuario;
select * from medida;

select * from aviso;

INSERT INTO medida (
    dht11_umidade,
    dht11_temperatura,
    luminosidade,
    lm35_temperatura,
    chave,
    momento,
    fk_aquario
) VALUES (
    55.5,      -- umidade
    25.3,      -- temperatura DHT11
    750,       -- luminosidade
    26.1,      -- temperatura LM35
    1,         -- chave
    NOW(),     -- data/hora atual
    1          -- ID do aquário (deve existir)
);
INSERT INTO medida (
    dht11_umidade,
    dht11_temperatura,
    luminosidade,
    lm35_temperatura,
    chave,
    momento,
    fk_aquario
) VALUES (
    55.5,      -- umidade
    30.3,      -- temperatura DHT11
    750,       -- luminosidade
    40.1,      -- temperatura LM35
    1,         -- chave
    NOW(),     -- data/hora atual
    1          -- ID do aquário (deve existir)
);