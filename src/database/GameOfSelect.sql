CREATE DATABASE IF NOT EXISTS jovensTitas;
USE jovensTitas;

-- Tabelas
CREATE TABLE equipe (
    idEquipe INT PRIMARY KEY AUTO_INCREMENT,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP, 
    nome VARCHAR(45)
);

CREATE TABLE oficio (
    idOficio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE integrante (
    idIntegrante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45), 
    fkEquipe INT, 
    fkOficio INT, 
    CONSTRAINT fkEquipeIntegrante FOREIGN KEY (fkEquipe) REFERENCES equipe(idEquipe),
    CONSTRAINT fkOficioIntegrante FOREIGN KEY (fkOficio) REFERENCES oficio(idOficio)
);

CREATE TABLE missao (
    idMissao INT PRIMARY KEY AUTO_INCREMENT,
    fkEquipe INT,
    fkEquipeInimiga INT,
    fkOficio INT,
    fkIntegrante INT,
    status VARCHAR(45),
    dtInicio DATETIME,
    dtFinalizacao DATETIME,
    CONSTRAINT fkMissaoEquipe FOREIGN KEY (fkEquipe) REFERENCES equipe(idEquipe),
    CONSTRAINT fkMissaoEquipeInimiga FOREIGN KEY (fkEquipeInimiga) REFERENCES equipe(idEquipe),
    CONSTRAINT fkMissaoOficio FOREIGN KEY (fkOficio) REFERENCES oficio(idOficio),
    CONSTRAINT fkMissaoIntegrante FOREIGN KEY (fkIntegrante) REFERENCES integrante(idIntegrante)
);

CREATE TABLE tipoHabilidade (
    idTipoHabilidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE habilidade (
    idHabilidade INT,
    fkIntegrante INT,
    fkOficio INT,
    fkEquipe INT,
    fkTipoHabilidade INT, 
    nivel INT,
    CONSTRAINT fkHabilidaeTipo FOREIGN KEY (fkTipoHabilidade) REFERENCES tipoHabilidade(idTipoHabilidade), 
    CONSTRAINT pkcomposta PRIMARY KEY (idHabilidade, fkIntegrante , fkOficio, fkEquipe, fkTipoHabilidade),
    CONSTRAINT fkHabilidadeIntegrante FOREIGN KEY (fkIntegrante) REFERENCES integrante (idIntegrante),
    CONSTRAINT fkHabilidadeOficio FOREIGN KEY (fkOficio) REFERENCES oficio (idOficio),
    CONSTRAINT fkHabilidadeEquipe FOREIGN KEY (fkEquipe) REFERENCES equipe (idEquipe)
);

-- Dados
-- Ofícios
INSERT INTO oficio (nome) VALUES ('Herói'), ('Vilão');

-- Equipes
INSERT INTO equipe (dataCriacao, nome) VALUES 
('2010-05-10 08:30:00', 'Jovens Titãs'),
('2011-06-15 14:45:00', 'Irmandade do Mal'),
('2012-07-20 09:15:00', 'H.I.V.E.'),
('2013-08-25 16:00:00', 'Patrulha do Destino'),
('2014-09-30 11:20:00', 'Titãs do Leste'),
('2015-10-05 19:55:00', 'Exterminador e Aliados'),
('2016-11-10 07:10:00', 'Irmãos Hexagonais'),
('2017-12-15 22:40:00', 'Liga das Sombras'),
('2018-01-20 13:05:00', 'Trigon e seus Seguidores'),
('2019-02-25 10:50:00', 'Tropa das Terras Sombras'),
('2020-01-01 12:00:00', 'Mini Titãs');

-- Integrantes
INSERT INTO integrante (nome, fkEquipe, fkOficio) VALUES 
('Robin', 1, 1), ('Estelar', 1, 1), ('Ravena', 1, 1), ('Cyborg', 1, 1), ('Mutano', 1, 1),
('Cérebro', 2, 2), ('Monsieur Mallah', 2, 2), ('General Immortus', 2, 2), ('Madame Rouge', 2, 2),
('Gizmo', 3, 2), ('Jinx', 3, 2), ('Mammoth', 3, 2),
('Chefe Niles Caulder', 4, 1), ('Homem-Robô', 4, 1), ('Mulher-Elástica', 4, 1), ('Negative Man', 4, 1),
('Más', 5, 1), ('Menos', 5, 1), ('Speedy', 5, 1), ('Aqualad', 5, 1), ('Bumblebee', 5, 1),
('Exterminador', 6, 2), ('Terra', 6, 2),
('Bill', 7, 2), ('Bob', 7, 2), ('Baxter', 7, 2),
('Doutor Luz', 8, 2), ('Johnny Rancid', 8, 2), ('Fang', 8, 2),
('Trigon', 9, 2), ('Filhos de Trigon', 9, 2),
('Demônio Sombrio 1', 10, 2), ('Demônio Sombrio 2', 10, 2),
('Mini Titã A', 11, 1), ('Mini Titã B', 11, 1);

-- Tipos de Habilidade
INSERT INTO tipoHabilidade (nome) VALUES 
('Poder Físico'), ('Poder Mental'), ('Tecnologia'), ('Magia'), ('Energia'),
('Metamorfose'), ('Telepatia'), ('Manipulação Elemental'), ('Super Velocidade'), ('Super Força'),
('Voo');

-- Habilidades
INSERT INTO habilidade (fkTipoHabilidade, idHabilidade, fkIntegrante, fkOficio, fkEquipe, nivel) VALUES 
(1, 3, 1, 1, 1, 9),
(2, 1, 1, 1, 1, 8),
(3, 5, 2, 1, 1, 9),
(4, 10, 2, 1, 1, 7), 
(5, 11, 2, 1, 1, 10),
(6, 4, 3, 1, 1, 10), 
(7, 2, 3, 1, 1, 9), 
(8, 11, 3, 1, 1, 8),
(9, 3, 4, 1, 1, 9), 
(10, 10, 4, 1, 1, 8),
(11, 6, 5, 1, 1, 9),
(1, 3, 10, 2, 3, 8), 
(2, 4, 11, 2, 3, 7), 
(3 ,10, 12, 2, 3, 9),
(4, 9, 18, 1, 5, 8), 
(5, 9, 19, 1, 5, 8),
(6, 1, 22, 2, 6, 10), 
(7, 3, 22, 2, 6, 9);

-- Missões
INSERT INTO missao (fkEquipe, fkEquipeInimiga, fkOficio, fkIntegrante, status, dtInicio, dtFinalizacao) VALUES 
(1, 2, 1, 1, 'Concluída com sucesso', '2023-01-10', '2023-01-15'),
(1, 3, 1, 2, 'Em andamento', '2025-05-10', NULL),
(1, 6, 1, 3, 'Fracassada', '2024-08-05', '2024-08-06'),
(1, 2, 1, 1, 'Concluída com sucesso', '2024-01-01', '2024-01-31'),
(1, 3, 1, 1, 'Concluída com sucesso', '2024-02-01', '2024-02-01'),
(2, 1, 2, 6, 'Concluída com sucesso', '2023-02-01', '2023-02-10'),
(2, 4, 2, 7, 'Em andamento', '2025-04-15', NULL),
(2, 5, 2, 8, 'Fracassada', '2024-03-20', '2024-03-21'),
(3, 1, 2, 10, 'Em andamento', '2025-06-01', NULL),
(3, 5, 2, 11, 'Concluída com sucesso', '2023-11-10', '2023-11-12'),
(4, 2, 1, 14, 'Fracassada', '2022-05-01', '2022-05-03'),
(4, 6, 1, 16, 'Em andamento', '2025-06-01', NULL),
(5, 3, 1, 18, 'Concluída com sucesso', '2024-02-14', '2024-02-16'),
(5, 9, 1, 20, 'Em andamento', '2025-05-30', NULL),
(5, 3, 1, 17, 'Concluída com sucesso', '2025-06-10', '2025-06-15'),
(6, 1, 2, 22, 'Concluída com sucesso', '2023-07-20', '2023-07-25'),
(6, 4, 2, 23, 'Em andamento', '2025-06-01', NULL),
(7, 5, 2, 24, 'Fracassada', '2023-03-05', '2023-03-07'),
(7, 1, 2, 25, 'Em andamento', '2025-05-31', NULL),
(8, 1, 2, 27, 'Em andamento', '2025-06-02', NULL),
(8, 4, 2, 28, 'Concluída com sucesso', '2022-08-10', '2022-08-12'),
(9, 1, 2, 30, 'Fracassada', '2023-10-01', '2023-10-05'),
(9, 5, 2, 31, 'Em andamento', '2025-06-01', NULL),
(10, 1, 2, 32, 'Concluída com sucesso', '2023-06-01', '2023-06-03'),
(10, 4, 2, 33, 'Em andamento', '2025-06-01', NULL);

-- Fáceis (15)

-- Selecione todos os integrantes da equipe com o id = 1
SELECT * FROM integrante WHERE fkEquipe = 1;

-- Liste todas as missões concluídas com sucesso.
SELECT * FROM missao WHERE status = 'Concluída com sucesso';

-- Mostre os integrantes que são vilões
SELECT 
    *
FROM
    integrante
WHERE
    fkOficio = 2;

-- Selecione as missões fracassadas que ocorreram em 2024.
SELECT 
    *
FROM
    missao
WHERE
    status = 'Fracassada'
        AND YEAR(dtInicio) = 2024;

-- Liste as equipes criadas após 2015.
SELECT 
    *
FROM
    equipe
WHERE
    YEAR(datacriacao) > 2015;

-- Encontre integrantes cujos nomes começam com "m".
SELECT 
    *
FROM
    integrante
WHERE
    nome LIKE 'm%';

-- Liste equipes cujos nomes contêm "Titã".
SELECT * FROM equipe WHERE nome LIKE '%Titã%';

-- Selecione habilidades com nível entre 8 e 10.
SELECT 
    *
FROM
    habilidade
WHERE
    nivel BETWEEN 8 AND 10;

-- Exiba todos os integrantes em ordem alfabética.
SELECT * FROM integrante ORDER BY nome ASC;

-- Liste as missões por data de forma decrescente (mais recente primeiro).
SELECT * FROM missao ORDER BY dtInicio DESC;

-- Mostre as equipes em ordem de criação (mais antigas primeiro).
SELECT * FROM equipe ORDER BY dataCriacao ASC;

-- Exiba as habilidades por nível (do maior para o menor).
SELECT * FROM habilidade ORDER BY nivel DESC;

-- Selecione os integrantes da equipe cujo id = 2 e ordene por nome em ordem alfabética.
SELECT * FROM integrante WHERE fkequipe = 2 ORDER BY nome DESC;

-- Liste as missões em andamento ordenadas pela data de início (mais recente primeiro).
SELECT * FROM missao WHERE status = 'Em andamento' ORDER BY dtInicio DESC;

-- Mostre as habilidades cujo id do tipo de habilidade seja igual 4, ordenadas por nível de forma crescente.
SELECT * FROM habilidade WHERE fkTipoHabilidade = 4 ORDER BY nivel ASC;

-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Médios (10)
-- 1- Exibir os nomes dos integrantes junto com o nome da equipe a que pertencem.

select i.nome as Integrante, 
e.nome as Equipe
from integrante as i
join equipe as e
 on i.fkEquipe = e.idEquipe;


-- 2- Exibir os nomes dos integrantes junto com o nome do ofício (Herói ou Vilão).
select i.nome as Integrante, 
o.nome as Oficio
from integrante as i
join oficio as o
on i.fkOficio = o.idOficio;

-- 3- Exibir os nomes dos integrantes, o nome do tipo de habilidade que possuem e o nível.

select i.nome as Integrante,
t.nome as TipoHabilidade,
h.nivel as Nivel
from habilidade as h
join integrante as i
on h.fkIntegrante = i.idIntegrante
join tipoHabilidade as t
on h.fkTipoHabilidade = t.idTipoHabilidade;

-- 4- Exibir os integrantes e o nome das equipes em que participaram de missões com status "Concluída com sucesso".
select i.nome as Integrante, 
e.nome as Equipe, 
m.status as Status
from missao as m
join integrante as i
on m.fkIntegrante = i.idIntegrante
join equipe as e
on m.fkEquipe = e.idEquipe
where m.status = "Concluida com sucesso";

-- 5- Exibir os nomes das equipes que enfrentaram os "Jovens Titãs" em missões.

select distinct(e.nome) as EquipeAdversaria
from missao m
join equipe e
 on m.fkEquipeInimiga = e.idEquipe
where m.fkEquipe = 1;

-- 6- Exibir os nomes dos integrantes e os tipos de habilidade cujo nível seja maior que 9.

select i.nome as Integrante,
t.nome as TipoHabilidade,
h.nivel as Nivel
from habilidade as h
join integrante as i
on h.fkIntegrante = i.idIntegrante
join tipoHabilidade as t
on h.fkTipoHabilidade = t.idTipoHabilidade
where h.nivel >9;

-- 7- Exibir o nome de cada integrante e quantas habilidades ele possui.
select i.nome as Integrante,
count(h.idHabilidade) as Quantidade_habilidades
from integrante as i
left join habilidade as h 
on i.idintegrante = h.fkIntegrante
group by i.idIntegrante, i.nome;


-- 8- Exibir os nomes das equipes e a quantidade total de integrantes que cada uma possui.

select e.nome as Equipe,
count(i.idIntegrante) as Integrante
from integrante as i
join equipe as e
on i.fkEquipe = e.idEquipe
group by e.idequipe, e.nome;


-- 9- Exibir os nomes dos integrantes que participaram de missões, com a data de início e finalização dessas missões.
select i.nome as Integrante,
m.dtInicio as Inicio,
m.dtFinalizacao as Finalizacao
from missao as m
join integrante as i 
on m.fkIntegrante = i.idIntegrante;

-- 10- Exibir os nomes dos integrantes e suas habilidades ordenadas do maior para o menor nível.

select i.nome as Integrante,
t.nome as TipoHabilidade,
h.nivel as Nivel
from habilidade as h
join integrante as i
on h.fkIntegrante = i.idIntegrante
join tipoHabilidade as t
on h.fkTipoHabilidade = t.idTipoHabilidade
order by h.nivel desc;
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Dificeis (5)

-- Liste o nome das equipes, a quantidade de integrantes e a média dos níveis de habilidades dos integrantes. A ordenação deve ser da maior para a menor média de habilidades.

select e.nome as Equipe, 
	count(distinct i.idIntegrante) as total_integrantes,
	ifnull(avg(h.nivel), 0) as media_nivel
from equipe e 
left join integrante i on e.idEquipe = i.fkEquipe
left join habilidade h on i.idIntegrante = h.fkIntegrante
group by e.nome
order by media_nivel desc;

-- Liste as equipes e o tempo médio (em dias) que cada uma levou para concluir missões com sucesso. As equipes devem ser ordenadas da mais rápida para a mais lenta.

select 
    e.nome as equipe,
    round(avg(datediff(m.dtFinalizacao, m.dtInicio)), 2) as media_dias_conclusao
from equipe e
join missao m on e.idEquipe = m.fkEquipe
where m.status = 'Concluída com sucesso'
group by e.idEquipe
order by media_dias_conclusao asc;

-- Liste as equipes que nunca registraram missões fracassadas, mesmo que tenham missões concluídas ou em andamento.

select e.nome
from equipe e
left join missao m on e.idEquipe = m.fkEquipe and m.status = 'Fracassada'
group by e.idEquipe
having count(m.idMissao) = 0;

-- Quais integrantes da equipe 'Jovens Titãs' participaram de missões contra a equipe inimiga mais enfrentada, e quantas missões foram realizadas contra essa equipe inimiga ao todo?

select 
    i.nome as integrantes,
    ei.nome as equipe_inimiga,
    (
        select count(*) 
        from missao m2
        join equipe e2 on m2.fkEquipe = e2.idEquipe
        where e2.nome = 'jovens titãs' 
          and m2.fkEquipeInimiga = m.fkEquipeInimiga
    ) as total_missoes
from missao m
join integrante i on m.fkIntegrante = i.idIntegrante
join equipe eq on m.fkEquipe = eq.idEquipe
join equipe ei on m.fkEquipeInimiga = ei.idEquipe
where eq.nome = 'jovens titãs'
  and m.fkEquipeInimiga = (
      select m2.fkEquipeInimiga
      from missao m2
      join equipe e2 on m2.fkEquipe = e2.idEquipe
      where e2.nome = 'jovens titãs'
      group by m2.fkEquipeInimiga
      order by count(*) desc
      limit 1
  );

-- Liste as equipes com a maior média de nível de habilidades, considerando apenas habilidades cujo tipo contenha a palavra "Energia". A ordenação deve ser da maior para a menor média.

select 
	e.nome as Equipe,
    th.nome as Tipo_Habilidade,
    round(avg(h.nivel), 2) as Media_Nivel
from equipe e
join integrante i on i.fkEquipe = e.idEquipe
join habilidade h on h.fkIntegrante = i.idIntegrante
join tipoHabilidade th on th.idTipoHabilidade = h.fkTipoHabilidade
where th.nome LIKE '%energia%'
group by e.nome, th.nome
order by media_nivel desc;

-- -- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Desafio (2)

-- Para cada equipe, exiba:
-- - Total de integrantes;
-- - Média dos níveis das habilidades dos integrantes;
-- - Quantidade total de missões;
-- - Total de missões concluídas com sucesso;
-- - Total de missões fracassadas;
-- - Total de missões em andamento.
-- A ordenação deve ser por total de missões (decrescente) e, em caso de empate, pela média das habilidades (crescente).

select 
    e.nome as equipe,
    COUNT(distinct i.idIntegrante) as total_integrantes,
    ifnull(round(avg(h.nivel), 2), 0) as media_nivel_habilidades,
    COUNT(distinct m.idMissao) as total_missoes,
    SUM(case when m.status = 'Concluída com sucesso' then 1 else 0 end) as missao_concluidas,
    SUM(case when m.status = 'Fracassada' then 1 else 0 end) as missao_fracassadas,
    SUM(case when m.status = 'Em andamento' then 1 else 0 end) as missao_em_andamento
from equipe e
left join integrante i on i.fkEquipe = e.idEquipe
left join habilidade h on h.fkIntegrante = i.idIntegrante
left join tipoHabilidade tH on tH.idTipoHabilidade = h.fkTipoHabilidade
left join missao m on m.fkEquipe = e.idEquipe
group by e.idEquipe
order by total_missoes desc, media_nivel_habilidades asc;

-- Exiba confrontos únicos entre equipes de heróis e vilões, contendo:
-- - Nome das equipes (herói e vilão);
-- - Total de confrontos entre elas;
-- - Total de vitórias dos heróis e dos vilões;
-- - Porcentagem de vitórias dos heróis;
-- - Indicação de quem venceu mais confrontos ou se houve empate.
-- A ordenação deve ser pelo total de confrontos em ordem decrescente.

SELECT 
    e_heroi.nome AS equipe_heroi,
    e_vilao.nome AS equipe_vilao,
    COUNT(m.idMissao) AS total_confrontos,
    SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Herói' THEN 1 ELSE 0 END) AS vitorias_heroi,
    SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Vilão' THEN 1 ELSE 0 END) AS vitorias_vilao,
    ROUND(
        100.0 * SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Herói' THEN 1 ELSE 0 END) / COUNT(m.idMissao),
        2
    ) AS porcentagem_vitorias_heroi,
    CASE 
        WHEN SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Herói' THEN 1 ELSE 0 END) >
             SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Vilão' THEN 1 ELSE 0 END)
            THEN 'Heróis venceram mais'
        WHEN SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Herói' THEN 1 ELSE 0 END) <
             SUM(CASE WHEN m.status = 'Concluída com sucesso' AND o_heroi.nome = 'Vilão' THEN 1 ELSE 0 END)
            THEN 'Vilões venceram mais'
        ELSE 'Empate'
    END AS resultado_geral
FROM missao m
JOIN integrante i_heroi ON m.fkIntegrante = i_heroi.idIntegrante
JOIN oficio o_heroi ON i_heroi.fkOficio = o_heroi.idOficio
JOIN equipe e_heroi ON m.fkEquipe = e_heroi.idEquipe
JOIN equipe e_vilao ON m.fkEquipeInimiga = e_vilao.idEquipe
WHERE o_heroi.nome IN ('Herói', 'Vilão')
AND e_heroi.idEquipe < e_vilao.idEquipe
GROUP BY e_heroi.nome, e_vilao.nome
ORDER BY total_confrontos DESC;
