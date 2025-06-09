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
    fkArmazem INT NOT NULL,
    statusSensor VARCHAR(30) DEFAULT 'Ativo'
    CONSTRAINT fkArmazemSensor FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem)
    CONSTRAINT ckStatusSensor CHECK (statusSensor in ('Ativo', 'Inativo'))
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

select * from Funcionario;
select * from Cargo;
INSERT INTO Funcionario values
(default, 'Maria', 'maria_teste2@gmail.com', 'Urubu100$', null, '11946787175', 18, 12);
describe Funcionario;

select * from Sensor;

CREATE OR REPLACE VIEW  vw_AlertaEmTempoReal AS
	SELECT 
		a.fkVinicola, 
		r.idRegistro,
		r.dataHora,
		r.temperatura,
		r.umidade,
		a.nomeArmazem,
		gv.classe AS tipoVinho,
		s.fkArmazem,
			CASE 
				WHEN r.temperatura > gv.temperaturaMax  THEN 'Temperatura Acima'
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


CREATE OR REPLACE VIEW vw_AlertasPersistentes AS
SELECT 
    fkVinicola, 
    fkArmazem,
    sensor,
    statusAlerta,
    MIN(dataHora) AS inicioAlerta,
    TIMESTAMPDIFF(MINUTE, MIN(dataHora), NOW()) AS minutosEmAlerta
FROM vw_AlertaEmTempoReal
WHERE statusAlerta <> 'Normal' COLLATE utf8mb4_unicode_ci
GROUP BY fkVinicola, fkArmazem, sensor, statusAlerta;
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
select count(distinct fkArmazem);

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

CREATE OR REPLACE VIEW vw_AlertaEmTempoReal2 AS
SELECT 
    r.idRegistro,
    r.dataHora,
    r.temperatura,
    r.umidade,
    a.nomeArmazem,
    gv.classe AS tipoVinho,
    s.fkArmazem,
    a.fkVinicola,

    CASE 
        WHEN r.temperatura > gv.temperaturaMax THEN 'Temperatura Acima'
        WHEN r.temperatura < gv.temperaturaMin THEN 'Temperatura Abaixo'
        WHEN r.umidade > gv.umidadeMax THEN 'Umidade Acima'
        WHEN r.umidade < gv.umidadeMin THEN 'Umidade Abaixo'
        ELSE 'Normal'
    END AS statusAlerta,

    CASE gv.classe
        WHEN 'Vinho Gelado' THEN
            CASE
                WHEN r.temperatura < 3 OR r.temperatura > 7 THEN 'Crítico'
                WHEN (r.temperatura >= 3 AND r.temperatura < 4) OR (r.temperatura > 6 AND r.temperatura <= 7) THEN 'Alerta'
                WHEN r.temperatura >= 4 AND r.temperatura <= 6 THEN 'Ideal'
                ELSE 'Crítico'
            END
        WHEN 'Vinho Frio' THEN
            CASE
                WHEN r.temperatura < 7 OR r.temperatura > 13 THEN 'Crítico'
                WHEN (r.temperatura >= 7 AND r.temperatura < 8.5) OR (r.temperatura > 11.5 AND r.temperatura <= 13) THEN 'Alerta'
                WHEN r.temperatura >= 8.5 AND r.temperatura <= 11.5 THEN 'Ideal'
                ELSE 'Crítico'
            END
        WHEN 'Adega' THEN
            CASE
                WHEN r.temperatura < 13 OR r.temperatura > 16 THEN 'Crítico'
                WHEN (r.temperatura >= 13 AND r.temperatura < 13.75) OR (r.temperatura > 15.25 AND r.temperatura <= 16) THEN 'Alerta'
                WHEN r.temperatura >= 13.75 AND r.temperatura <= 15.25 THEN 'Ideal'
                ELSE 'Crítico'
            END
        WHEN 'Vinho Fresco' THEN
            CASE
                WHEN r.temperatura < 16 OR r.temperatura > 20 THEN 'Crítico'
                WHEN (r.temperatura >= 16 AND r.temperatura < 17) OR (r.temperatura > 19 AND r.temperatura <= 20) THEN 'Alerta'
                WHEN r.temperatura >= 17 AND r.temperatura <= 19 THEN 'Ideal'
                ELSE 'Crítico'
            END
        ELSE 'Crítico'
    END AS nivelAlertaTemperatura,

    CASE
        WHEN r.umidade < 60 OR r.umidade > 80 THEN 'Crítico'
        WHEN (r.umidade >= 60 AND r.umidade < 65) OR (r.umidade > 75 AND r.umidade <= 80) THEN 'Alerta'
        WHEN r.umidade >= 65 AND r.umidade <= 75 THEN 'Ideal'
        ELSE 'Crítico'
    END AS nivelAlertaUmidade

FROM Registro r
JOIN Sensor s ON r.fkSensor = s.idSensor
JOIN Armazem a ON s.fkArmazem = a.idArmazem
JOIN GrupoVinho gv ON a.fkGrupoVinho = gv.idGrupoVinho;
select * from vw_AlertaEmTempoReal2;



select * from Funcionario;
delete from Vinicola where idVinicola = 12;
update Funcionario set fkVinicola = 18 where idFuncionario >= 1;

SELECT COUNT(*) AS alertas_hoje
FROM vw_AlertasPersistentes
WHERE DATE(inicioAlerta) = CURDATE() and fkVinicola = 18;

SELECT COUNT(*) AS alertas_semana
FROM vw_AlertasPersistentes
WHERE YEARWEEK(inicioAlerta, 1) = YEARWEEK(CURDATE(), 1)
  AND fkVinicola = 18;
  
select count(*) as total_critico from vw_AlertaEmTempoReal2 where (nivelAlertaTemperatura = 'Critico' or nivelAlertaUmidade = 'Critico' ) and fkVinicola = 18;
select count(*) as total_alerta from vw_AlertaEmTempoReal2 where (nivelAlertaTemperatura = 'Alerta' or nivelAlertaUmidade = 'Alerta' ) and fkVinicola = 18;

select * from Armazem;
select * from Registro;
select * from Sensor;
INSERT INTO Registro (temperatura, umidade, dataHora, fkSensor)
VALUES
  (10, 66, '2025-06-09 00:00:01', 1),
  (10, 66, '2025-06-09 00:00:02', 1),
  (10, 66, '2025-06-09 00:00:3', 1);

  INSERT INTO Registro (temperatura, umidade, dataHora, fkSensor)
VALUES
  (5, 60, '2025-06-07 08:00:10', 1),
  (5, 59, '2025-06-07 09:00:10', 1),
  (5, 58, '2025-06-07 10:00:10', 1),
  (5, 63, '2025-06-07 08:30:10', 1),
  (5, 62, '2025-06-07 09:30:10', 1),
  (5, 61, '2025-06-07 10:30:10', 1),
  (5, 65, '2025-06-07 08:15:10', 1),
  (5, 64, '2025-06-07 09:15:10', 1),
  (5, 63, '2025-06-07 10:15:10', 1);