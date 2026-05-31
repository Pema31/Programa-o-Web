const tarefas = require('../models/tarefaModel');

exports.listarTarefas = (req, res) => {
    res.json(tarefas);
};

exports.buscarTarefa = (req, res) => {
    const tarefa = tarefas.find(
        t => t.id === parseInt(req.params.id)
    );

    if (!tarefa) {
        return res.status(404).json({
            erro: "Tarefa não encontrada"
        });
    }

    res.json(tarefa);
};

exports.criarTarefa = (req, res) => {

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
};

exports.atualizarTarefa = (req, res) => {

    const tarefa = tarefas.find(
        t => t.id === parseInt(req.params.id)
    );

    if (!tarefa) {
        return res.status(404).json({
            erro: "Tarefa não encontrada"
        });
    }

    tarefa.titulo = req.body.titulo;

    res.json(tarefa);
};

exports.deletarTarefa = (req, res) => {

    const indice = tarefas.findIndex(
        t => t.id === parseInt(req.params.id)
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: "Tarefa não encontrada"
        });
    }

    tarefas.splice(indice, 1);

    res.json({
        mensagem: "Tarefa removida"
    });
};