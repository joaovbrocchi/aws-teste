import express, { urlencoded } from "express";
import { Sequelize, DataTypes } from "sequelize";
import  {counter, histogram, summary, gauge}  from "./prometheus/Prometheus.js";
import cors from "cors";
import dotenv from "dotenv";
import prom from "prom-client"

const register = new prom.Registry()
prom.collectDefaultMetrics({register})
dotenv.config()


const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/usuarios', async (req, res) => {
  const responseTime = Math.random();
  counter.inc();
  gauge.set(100 * Math.random())
  histogram.observe(responseTime)
  summary.observe(responseTime)

  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota POST para criar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = await Usuario.create({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/metrics', (req, res) =>{
    res.setHeader('Content-Type',register.contentType)
    register.metrics().then(data => res.status(200).send(data))
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

