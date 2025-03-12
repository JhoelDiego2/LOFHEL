-- Banco de Dados Lofhel

-- criando o banco
CREATE DATABASE lofhel;

-- comando para usar o banco
USE lofhel;

-- criando as tabelas de clientes e sensores

CREATE TABLE cadCliente (
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR (25) NOT NULL,
email VARCHAR (30) NOT NULL,
CNPJ CHAR(14) NOT NULL, 
apelido CHAR (8) NOT NULL,
senha VARCHAR (8) NOT NULL
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
tipoSensor VARCHAR (25) NOT NULL,
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
status_sensor VARCHAR(7) NOT NULL,
CONSTRAINT chk_status
CHECK (status_sensor IN ('Ativo', 'Inativo'))
);

-- inserindo dados nas tabelas de clientes e sensores

INSERT INTO cadCliente (nomeEmpresa,email,CNPJ,apelido,senha) VALUES
('Tech Solutions', 'contato@techsol.com', '12345678000190', 'TechSol', 'abc12345'),  
('Mega Comex', 'suporte@megacomex.com', '98765432000156', 'MegaCmx', 'xyz78901'),  
('Alpha Digital', 'vendas@alphadig.com', '56789012000134', 'AlphaDgt', 'qwe45678'),  
('Fast Log', 'info@fastlog.com', '11223344000177', 'FastLog', 'log98765'),  
('Blue Systems', 'adm@bluesyst.com', '33445566000188', 'BlueSys', 'sys32100'); 

INSERT INTO sensor (tipoSensor,temperatura,umidade,status_sensor) VALUES
('DHT11', 26.8, 58.2, 'Ativo');

-- select nas tabelas

SELECT * FROM cadCliente;
SELECT * FROM sensor;

-- atualizando um dado em uma tabela

UPDATE cadCliente SET senha ='54321cba' WHERE idCliente = 1;

-- alterando a coluna de uma tabela

ALTER TABLE cadCliente MODIFY COLUMN apelido CHAR (10);

-- descrevendo as configurações de uma tabela

DESCRIBE cadCliente;

-- trazendo informacoes especificas da tabela e ordenando pelo nome

SELECT idCliente, nomeEmpresa, email FROM cadCliente ORDER BY nomeEmpresa ASC;

-- drop na tabela

DROP DATABASE lofhel;