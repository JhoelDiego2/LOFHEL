const Dashboard = require('../models/dashboardModel');

module.exports = {
  async alertasTempoReal(req, res) {
    const { fkArmazem } = req.params;
    try {
      const dados = await Dashboard.alertasTempoReal(fkArmazem);
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar alertas em tempo real' });
    }
  },

  async alertasPersistentes(req, res) {
    const { fkArmazem } = req.params;
    try {
      const dados = await Dashboard.alertasPersistentes(fkArmazem);
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar alertas persistentes' });
    }
  },

  async alertasHoje(req, res) {
    const { fkArmazem } = req.params;
    try {
      const dados = await Dashboard.alertasHoje(fkArmazem);
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar dados de hoje' });
    }
  },

  async alertasSemana(req, res) {
    const { fkArmazem } = req.params;
    try {
      const dados = await Dashboard.alertasSemana(fkArmazem);
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar dados da semana' });
    }
  },

  async registrosPorSensor(req, res) {
    const { idSensor } = req.params;
    try {
      const dados = await Dashboard.registrosPorSensor(idSensor);
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar registros do sensor' });
    }
  }
};