-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo !!
-- comandos para executar no mysql

/*CREATE USER 'apiLofhelWeb'@'localhost' IDENTIFIED BY 'Urubu100$';
GRANT INSERT, UPDATE, SELECT ON lofhel.* TO 'apiLofhelWeb'@'localhost';
FLUSH PRIVILEGES;
*/
drop database if exists Lofhel;
CREATE DATABASE Lofhel;
USE Lofhel;
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
    fkEndereco INT DEFAULT NULL,
    CONSTRAINT fkEnderecoVinicola FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);
-- Tabela de Permissão
CREATE TABLE Permissao (
    idPermissao INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE
);
-- Tabela de Cargo
CREATE TABLE Cargo (
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nomeCargo VARCHAR(50) NOT NULL,           
    fkVinicola INT NOT NULL,              
    CONSTRAINT fkVinicolaCargo FOREIGN KEY (FKVinicola) REFERENCES Vinicola(idVinicola)
);

CREATE TABLE CargoPermissao (
    fkCargo INT,
    fkPermissao INT NOT NULL,
    CONSTRAINT pkComposta PRIMARY KEY (fkCargo, fkPermissao), 
    CONSTRAINT fkCargoPermissao FOREIGN KEY (fkCargo) REFERENCES Cargo(idCargo),
    CONSTRAINT fkPermissaoCargo FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);

-- Tabela de Funcionário
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(100) NOT NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,         
    fkRepresentante INT,               
    telefone VARCHAR(20) NOT NULL,          
    fkCargo INT,
    CONSTRAINT fkRepresentanteFuncionario FOREIGN KEY (fkRepresentante) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkCargoFuncionario FOREIGN KEY (fkCargo) REFERENCES Cargo(idCargo)
);
-- Tabela de Grupo de Vinho (corrigido de sensors)
CREATE TABLE GrupoVinho (
    idGrupoVinho INT PRIMARY KEY AUTO_INCREMENT,
    classe VARCHAR(40) NOT NULL,
    temperaturaMax FLOAT NOT NULL,
    temperaturaMin FLOAT NOT NULL, 
    umidadeMax FLOAT NOT NULL,
    umidadeMin FLOAT NOT NULL
);

-- Tabela de Armazém
CREATE TABLE Armazem (
    idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    nomeArmazem VARCHAR(60) NOT NULL,    
    fkVinicola INT NOT NULL,
    fkGrupoVinho INT NOT NULL,
    CONSTRAINT fkVinicolaArmazem FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola),
    CONSTRAINT fkGrupoVinhoArmazem FOREIGN KEY (fkGrupoVinho) REFERENCES GrupoVinho(idGrupoVinho)
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
    umidade INT NOT NULL,
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
select * from GrupoVinho;
select * from Sensor;
select * from Registro;


INSERT INTO GrupoVinho (classe, temperaturaMin, temperaturaMax, umidadeMin, umidadeMax)
VALUES 
('Vinho Gelado', 4, 6, 65, 75),
('Vinho Frio', 8.5, 11.5, 65, 75),
('Vinho Adega', 13.75, 15.25, 65, 75),
('Vinho Fresco', 17, 19, 65, 75);

-- permissoes padroes do sistema por enquanto são esses
insert into Permissao (codigo) values 
('acessar_dashboard'),
('gerenciar_armazens'), 
('gerenciar_funcionarios'),
('gerar_relatorios');

insert into Vinicola values 
	(1,'Maria Vinicola', 'MariaS.A.', '100200300102456', null); 
    describe Vinicola;

insert into Armazem values
	(1, 'Armazem 1', 'Vinhos delicados', 1,1); /*RETORNAR: TIRAR DESCRIÇÃO*/
    describe Armazem;
    
update funcionario set fkCargo = 1 where idFuncionario = 1;
insert into Cargo values
	(default, 'Representante Legal', 1);
insert into CargoPermissao (fkCargo, fkPermissao) values
	(1,1), 
    (1,2), 
    (1,3), 
    (1,4);
    update Armazem set fkGrupoVinho = 1 Where idArmazem = 1;
update Armazem set fkGrupoVinho = 2 Where idArmazem = 2;
update Armazem set fkGrupoVinho = 3 Where idArmazem = 3;
update Armazem set fkGrupoVinho = 4 Where idArmazem = 4;
update Armazem set fkGrupoVinho = 2 Where idArmazem = 5;

create view vw_informacoes_login as
        SELECT f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			 c.nomeCargo,
    GROUP_CONCAT(DISTINCT cp.fkPermissao ) AS fkPermissoes
		FROM Vinicola v JOIN Cargo c on v.idVinicola = c.fkVinicola 
            JOIN CargoPermissao cp on cp.fkCargo = c.idCargo 
            JOIN Funcionario f on f.fkCargo = c.idCargo
            group by idFuncionario;
select * from vw_informacoes_login;

INSERT INTO Funcionario values
(1, 'Maria', 'maria@gmail.com', 'Urubu100$', null, '11946787175', 1);
describe Funcionario;

select * from Sensor;

CREATE VIEW vw_AlertaEmTempoReal AS
	SELECT 
		r.idRegistro,
		r.dataHora,
		r.temperatura,
		r.umidade,
		s.nomeSerial AS sensor,
		a.nomeArmazem,
		gv.classe AS tipoVinho,
		s.fkArmazem,
			CASE 
				WHEN r.temperatura > gv.temperaturaMax THEN 'Temperatura Acima'
				WHEN r.temperatura < gv.temperaturaMin THEN 'Temperatura Abaixo'
				WHEN r.umidade > gv.umidadeMax THEN 'Umidade Acima'
				WHEN r.umidade < gv.umidadeMin THEN 'Umidade Abaixo'
				ELSE 'Normal'
			END AS statusAlerta
    
FROM Registro r
JOIN Sensor s ON r.fkSensor = s.idSensor
JOIN Armazem a ON s.fkArmazem = a.idArmazem
JOIN GrupoVinho gv ON a.fkGrupoVinho = gv.idGrupoVinho;

select * from vw_AlertaEmTempoReal;

CREATE VIEW vw_AlertasPersistentes AS
	SELECT 
		fkArmazem,
		sensor,
		statusAlerta,
		MIN(dataHora) AS inicioAlerta,
		TIMESTAMPDIFF(MINUTE, MIN(dataHora), NOW()) AS minutosEmAlerta
	FROM vw_AlertaEmTempoReal
	WHERE statusAlerta <> 'Normal'
	GROUP BY sensor, statusAlerta;
select * from vw_AlertasPersistentes;

  select ((sum(minutosEmAlerta))/60) as min_fora_hoje,
  count(inicioAlerta) as total_alertas_hoje 
  from vw_AlertasPersistentes  
where inicioAlerta < Now()
		AND inicioAlerta>= '2025-05-01 00:00:00'
		AND inicioAlerta <  '2025-05-01 23:59:59'
  and fkArmazem = 4;

-- select para saber os alertas de hoje e tempo 
SELECT 
    SUM(minutosEmAlerta) / 60 AS min_fora_hoje,
    COUNT(inicioAlerta) AS total_alertas_hoje
FROM vw_AlertasPersistentes
WHERE inicioAlerta >= CURDATE()
  AND inicioAlerta < CURDATE() + INTERVAL 1 DAY
  AND fkArmazem = 4;
select * from vw_AlertasPersistentes;

-- op 1
SELECT 
  sensor,
  statusAlerta,
  dataHora,
  fkArmazem
FROM vw_AlertaEmTempoReal
WHERE statusAlerta <> 'Normal'
  AND dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
                   AND NOW()
  AND fkArmazem = 4
ORDER BY dataHora;

-- op 2 
SELECT 
	count(*)
FROM vw_AlertaEmTempoReal
WHERE statusAlerta <> 'Normal'
  AND dataHora >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
  AND dataHora <= NOW()
  AND fkArmazem = 4
ORDER BY dataHora;

