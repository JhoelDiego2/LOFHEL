-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo !!
-- comandos para executar no mysql
CREATE DATABASE Lofhel;
USE Lofhel;
CREATE USER 'apiLofhelWeb'@'localhost' IDENTIFIED BY 'Urubu100$';
GRANT INSERT, UPDATE, SELECT ON lofhel.* TO 'apiLofhelWeb'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Vinicola (
    idVinicola INT PRIMARY KEY AUTO_INCREMENT,
    nomeFantasia VARCHAR(60) NOT NULL,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj VARCHAR(15) NOT NULL UNIQUE
);
CREATE TABLE Permissao (
    idPermissao INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE
);
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
CREATE TABLE GrupoVinho (
    idGrupoVinho INT PRIMARY KEY AUTO_INCREMENT,
    classe VARCHAR(40) NOT NULL,
    temperaturaMax FLOAT NOT NULL,
    temperaturaMin FLOAT NOT NULL, 
    umidadeMax FLOAT NOT NULL,
    umidadeMin FLOAT NOT NULL
);
CREATE TABLE Armazem (
    idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    nomeArmazem VARCHAR(60) NOT NULL,    
    fkVinicola INT NOT NULL,
    fkGrupoVinho INT NOT NULL,
    CONSTRAINT fkVinicolaArmazem FOREIGN KEY (fkVinicola) REFERENCES Vinicola(idVinicola),
    CONSTRAINT fkGrupoVinhoArmazem FOREIGN KEY (fkGrupoVinho) REFERENCES GrupoVinho(idGrupoVinho)
);
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    fkArmazem INT NOT NULL,
    statusSensor VARCHAR(30) DEFAULT 'Ativo',
    CONSTRAINT fkArmazemSensor FOREIGN KEY (fkArmazem) REFERENCES Armazem(idArmazem),
    CONSTRAINT ckStatusSensor CHECK (statusSensor in ('Ativo', 'Inativo'))
);
CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperatura FLOAT NOT NULL,
    umidade INT NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL,
   CONSTRAINT fkSensorRegistro  FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

INSERT INTO GrupoVinho (classe, temperaturaMin, temperaturaMax, umidadeMin, umidadeMax)
VALUES 
('Vinho Gelado', 4, 6, 65, 75),
('Vinho Frio', 8.5, 11.5, 65, 75),
('Vinho Adega', 13.75, 15.25, 65, 75),
('Vinho Fresco', 17, 19, 65, 75);

insert into Permissao (codigo) values 
('acessar_dashboard'),
('gerenciar_armazens'), 
('gerenciar_funcionarios'),
('gerar_relatorios'), 
('acessar_suporte_bob');

create view vw_informacoes_login as
        SELECT f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			 c.nomeCargo,
    GROUP_CONCAT(DISTINCT cp.fkPermissao ) AS fkPermissoes
		FROM Vinicola v JOIN Cargo c on v.idVinicola = c.fkVinicola 
            JOIN CargoPermissao cp on cp.fkCargo = c.idCargo 
            JOIN Funcionario f on f.fkCargo = c.idCargo
            group by idFuncionario;
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