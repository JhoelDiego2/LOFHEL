-- Criando banco de dados da nossa empresa 'Lofhel'
CREATE DATABASE lofhel;
USE lofhel;

-- Tabela destinada aos nossos clientes/empresas
CREATE TABLE cadastroEmpresa(
idEmpresa int primary key auto_increment,
nome varchar(45) NOT NULL,
cnpj char(14) NOT NULL,
email varchar(255) NOT NULL,
endereco varchar(255) NOT NULL,
telefone varchar(20),
dataCadastro datetime default current_timestamp,
statusEmpresa varchar(20)
CONSTRAINT chkStatusEmpresa CHECK(statusEmpresa in('Ativo','Inativo')) -- restrição sobre o status da empresas
);

-- Inserindo os dados da empresa para teste
INSERT INTO cadastroEmpresa (nome, cnpj, email, endereco, telefone, statusEmpresa) VALUES 
('ViniculaSmart', '12345678901234', 'viniculasmart@gmail.com', 'Faria Lima 2009', '11998436784', 'Ativo'),
('ViniculaStorage', '12345678901234', 'viniculaStorage@gmail.com', 'Brigadeiro 2009', '33998436784', 'Ativo'),
('ViniculaSecy', '12345678901234', 'viniculaSecy@gmail.com', 'Trianon Masp 309', '22998436784', 'Ativo');

-- Visualizar funcionamento
SELECT * FROM cadastroEmpresa;

-- Tabela para os registros do sensor
CREATE TABLE registroSensor(
	idSensor int primary key auto_increment,
    nome varchar(45) NOT NULL,
    temperatura float NOT NULL,
    umidade float NOT NULL,
    dataCadastro datetime default current_timestamp,
    statusSensor varchar(10)
    CONSTRAINT chkStatusSensor CHECK(statusSensor in('Ativo', 'Inativo')) -- Restrição sobre o funcionamento do sensor
);

-- Inserindo dados para teste
INSERT INTO registroSensor (nome, temperatura, umidade, statusSensor) VALUES
('DHT11', 19.3, 60.5, 'Ativo'),
('DHT11', 16.3, 65.5, 'Ativo'),
('DHT11', 22.3, 69.5, 'Ativo');

-- Visualizando funcionamento
SELECT * FROM registroSensor;

-- Tabela vinicula destinada as informações da empresa do cliente
CREATE TABLE vinicula(
	idVinicula int primary key auto_increment,
    tipoVinho varchar(45),
    estoqueGarrafas int,
    qtdBarril int,
    areaTotal int
);

-- Inserindo dados para teste
INSERT INTO vinicula (tipoVinho, estoqueGarrafas, qtdBarril, areaTotal) VALUES 
('Armazenagem de Vinho Tinto', 140, 12, 4000),
('Armazenagem de Vinho Seco', 100, 72, 2000),
('Armazenagem de Vinho', 90, 22, 5000);

-- Visualizar funcionamento
SELECT * FROM vinicula;