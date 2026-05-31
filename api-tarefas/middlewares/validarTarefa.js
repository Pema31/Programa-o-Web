module.exports = (req, res, next) => {

    if (!req.body.titulo) {
        return res.status(400).json({
            erro: "O título é obrigatório"
        });
    }

    next();
};