const express = require('express');

const app = express();

const logger = require('./middlewares/logger');

const tarefaRoutes = require('./routes/tarefaRoutes');

app.use(express.json());

app.use(logger);

app.use('/tarefas', tarefaRoutes);

// Tratamento global de erros
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        erro: "Erro interno do servidor"
    });
});

app.listen(3000, () => {
    console.log(
        'Servidor rodando em http://localhost:3000'
    );
});