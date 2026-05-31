const express = require('express');

const router = express.Router();

const controller = require('../controllers/tarefaController');

const validarTarefa = require('../middlewares/validarTarefa');

router.get('/', controller.listarTarefas);

router.get('/:id', controller.buscarTarefa);

router.post(
    '/',
    validarTarefa,
    controller.criarTarefa
);

router.put(
    '/:id',
    validarTarefa,
    controller.atualizarTarefa
);

router.delete(
    '/:id',
    controller.deletarTarefa
);

module.exports = router;