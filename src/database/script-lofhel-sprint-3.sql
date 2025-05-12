-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo !!

/*
comandos para executar no mysql
*/


CREATE USER 'apiLofhelWeb'@'localhost' IDENTIFIED BY 'Urubu100$';
GRANT INSERT, UPDATE, SELECT ON lofhel.* TO 'apiLofhelWeb'@'localhost';
FLUSH PRIVILEGES;


CREATE DATABASE Lofhel;
USE Lofhel;
show tables;


CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    logradouro VARCHAR(70) NOT NULL,
    bairro VARCHAR(70) NOT NULL,
    numero INT NOT NULL,
    cep CHAR(9) NOT NULL,
    complemento VARCHAR(80)
);

CREATE TABLE Vinicola (
    idVinicola INT PRIMARY KEY AUTO_INCREMENT,
    nomeFantasia VARCHAR(60) NOT NULL,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj VARCHAR(15) NOT NULL UNIQUE,  
	fkMatriz INT DEFAULT NULL,
    fkEndereco INT DEFAULT NULL,
    CONSTRAINT fkMatrizVinicola FOREIGN KEY (fkMatriz) REFERENCES Vinicola(idVinicola),
    CONSTRAINT fkEnderecoVinicola FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);
-- Tabela de Permissão
CREATE TABLE Permissao (
    idPermissao INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE
);
drop table permissao;
-- Tabela de Cargo
CREATE TABLE Cargo (
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,           
    fkVinicola INT NOT NULL,              
    CONSTRAINT fkVinicolaCargo FOREIGN KEY (FKVinicola) REFERENCES Vinicola(idVinicola)
);

CREATE TABLE CargoPermissao (
    fkCargo INT,
    fkPermissao INT NOT NULL,
    CONSTRAINT pkComposta PRIMARY KEY (fkCargo, fkPermissao), 
    CONSTRAINT fkCargoPermissao FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo),
    CONSTRAINT fkPermissaoCargo FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);

-- Tabela de Funcionário
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(100) NOT NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,         
    fkRepresentante INT,               
    telefone VARCHAR(20) NOT NULL,          
    fkVinicola INT NOT NULL,
    fkCargo INT,
    CONSTRAINT fkRepresentanteFuncionario FOREIGN KEY (fkRepresentante) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkVinicolaFuncionario FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola),
    CONSTRAINT fkCargoFuncionario FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo)
);




-- Tabela de Armazém
CREATE TABLE Armazem (
    idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    nomeArmazem VARCHAR(60) NOT NULL,    
    descricao VARCHAR(100),
    umidadeMax INT NOT NULL,
    umidadeMin INT NOT NULL,
    fkVinicola INT NOT NULL,
    CONSTRAINT fkVinicolaArmazem FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola)
);

-- Tabela de Grupo de Vinho (corrigido de sensors)
CREATE TABLE GrupoVinho (
    idGrupoVinho INT PRIMARY KEY AUTO_INCREMENT,
    classe VARCHAR(40) NOT NULL,
    temperaturaMax FLOAT NOT NULL,
    temperaturaMin FLOAT NOT NULL
);

-- Tabela de Tipo de Vinho
CREATE TABLE TipoVinho (
    idTipoVinho INT AUTO_INCREMENT,
    tipo VARCHAR(40) NOT NULL,
    fkGrupoVinho INT NOT NULL,
    fkArmazem INT NOT NULL,
    CONSTRAINT pkCompostaTipo  PRIMARY KEY (idTipoVinho, fkGrupoVinho, fkArmazem),
	CONSTRAINT fkGrupoTipo FOREIGN KEY (fkGrupoVinho) REFERENCES GrupoVinho(idGrupoVinho),
    CONSTRAINT fkArmazemTipo FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem)
);

-- Tabela de Sensor
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nomeSerial CHAR(12) NOT NULL UNIQUE, 
    fkArmazem INT NOT NULL,
    CONSTRAINT fkArmazemSensor FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem)
);

-- Tabela de Registro
CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperatura FLOAT NOT NULL,
    umidade FLOAT NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL,
   CONSTRAINT fkSensorRegistro  FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

select * from Endereco;
select * from Vinicola;
select * from Armazem;
select * from Cargo;
select * from Permissao;
select * from CargoPermissao;
select * from Funcionario;
select * from TipoVinho;
select * from GrupoVinho;
select * from Sensor;
select * from Registro;
alter table cargo rename column nome to nomeCargo;


-- permissoes padroes do sistema por enquanto são esses
insert into Permissao (codigo) values 
('acessar_dashboard'),
('gerenciar_armazens'), 
('gerenciar_funcionarios'),
('gerar_relatorios');


-- estes inserts tem q ser feitos na hora do cadastro
update funcionario set fkCargo = 1 where idFuncionario = 1;
insert into cargo values
	(default, 'Representante Legal', 11);
    
insert into cargoPermissao (fkCargo, fkPermissao) values
	(1,1), 
    (1,2), 
    (1,3), 
    (1,4);

-- cadastro de vinicola e devido representate legal
-- inserts e selects para a api no total 4 inserts na hora do cadastro ou seja 4 requisições  seguindo uma ordem para pegar FKs exemplo: var fkVinicola = resultadoVinicola.insertId;
INSERT INTO Vinicola (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}'); -- ja foi
INSERT INTO Cargo (nome, fkVinicola) VALUES ('Representante Legal', '${fkVinicola}');
INSERT INTO CargoPermissao (fkCargo, fkPermissao) VALUES 
	('${fkCargo}', 1),
	('${fkCargo}', 2),
	('${fkCargo}', 3),
	('${fkCargo}', 4);
INSERT INTO Funcionario (nomeFuncionario, email,telefone, senha, fkVinicola, fkCargo) VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${fkVinicola}', '${fkCargo}'); -- completo ainda nao
INSERT INTO Funcionario (nomeFuncionario, email,telefone, senha, fkVinicola) VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${fkVinicola}'); -- ja foi
-- login sera q é melhor fazer um select com join ou fazer varios selects??
-- com este select obtenho o necessario para o redirecionamento e o sessionstorage  e para pegar os armazens e assim pegar dados preciso da fkvinivola e guardarla para fazer outro sele
select f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			c.idCargo, c.nomeCargo,
				cp.fkPermissao
		from vinicola v join funcionario f on v.idVinicola = f.fkVinicola
			join cargo c on c.idCargo = f.fkCargo
				join cargoPermissao cp on cp.fkCargo = c.idCargo
		where email = 'aaaaaaaaa@gmail.com' and senha = 'Urubu100$'; -- nesse caso ele vai devolver varias linhas ai seria fazer um loop para armazenar as permissoes e depois fazer ifs
        --    2°
select f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			c.idCargo, c.nomeCargo
		from vinicola v join funcionario f on v.idVinicola = f.fkVinicola
			join cargo c on c.idCargo = f.fkCargo
		where email = 'aaaaaaaaa@gmail.com' and senha = 'Urubu100$'; -- nesse caso tendo a id cargo vou fazer outro select
select fkPermissao from CargoPermissao where fkCargo = 1;

		-- 3 º usando group_concat mas ela nao passou 
select f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			c.idCargo, c.nomeCargo,
    GROUP_CONCAT(DISTINCT cp.fkPermissao ) AS permissoes
		from vinicola v join funcionario f on v.idVinicola = f.fkVinicola
			join cargo c on c.idCargo = f.fkCargo
				join cargoPermissao cp on cp.fkCargo = c.idCargo
		where email = 'aaaaaaaaa@gmail.com' and senha = 'Urubu100$'; -- aqui tenho tudo o
--  WHERE email = '${email}' AND senha = '${senha}';

-- agora dentro do site 
-- deshbord 
SELECT * FROM armazem  WHERE fkVinicola = 11;

-- 


