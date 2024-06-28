import express, { urlencoded } from "express";
import { Sequelize, DataTypes } from "sequelize";
import  {counter}  from "./prometheus/Prometheus.js";
import cors from "cors";
import dotenv from "dotenv";
import { Registry } from "prom-client";
import prom from "prom-client"
dotenv.config()


const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});
// Restante do seu código Sequelize e Express

// Definir o modelo Usuario
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

// Sincronizar o modelo com o banco de dados
sequelize.sync();

// Criar a aplicação Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para habilitar CORS
app.use(cors());
// Rota GET para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  counter.inc();
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

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/metrics", async (req, res)=>{
  res.set("Content-Type", prom.register.contentType)
  res.end( await prom.register.metrics());
})