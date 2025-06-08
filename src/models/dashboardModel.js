const db = require('./db');

module.exports = {
  async alertasTempoReal(fkArmazem) {
    const [rows] = await db.query(`
      SELECT * FROM vw_AlertaEmTempoReal 
      WHERE fkArmazem = ? 
        AND statusAlerta <> 'Normal'
    `, [fkArmazem]);
    return rows;
  },

  async alertasPersistentes(fkArmazem) {
    const [rows] = await db.query(`
      SELECT * FROM vw_AlertasPersistentes 
      WHERE fkArmazem = ?
    `, [fkArmazem]);
    return rows;
  },

  async alertasHoje(fkArmazem) {
    const [rows] = await db.query(`
      SELECT 
        SUM(minutosEmAlerta)/60 AS min_fora_hoje,
        COUNT(inicioAlerta) AS total_alertas_hoje
      FROM vw_AlertasPersistentes
      WHERE inicioAlerta >= CURDATE()
        AND inicioAlerta < CURDATE() + INTERVAL 1 DAY
        AND fkArmazem = ?
    `, [fkArmazem]);
    return rows[0];
  },

  async alertasSemana(fkArmazem) {
    const [rows] = await db.query(`
      SELECT 
        sensor, statusAlerta, dataHora, fkArmazem
      FROM vw_AlertaEmTempoReal
      WHERE statusAlerta <> 'Normal'
        AND dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND NOW()
        AND fkArmazem = ?
      ORDER BY dataHora
    `, [fkArmazem]);
    return rows;
  },

  async registrosPorSensor(idSensor) {
    const [rows] = await db.query(`
      SELECT * FROM Registro WHERE fkSensor = ?
    `, [idSensor]);
    return rows;
  }
};