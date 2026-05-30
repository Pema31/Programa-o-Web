const http = require('http');
const fs = require('fs');

const servidor = http.createServer((req, res) => {

    fs.readFile('dados.json', 'utf8', (erro, dados) => {

        if (erro) {
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                erro: 'Erro ao ler arquivo'
            }));
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(dados);
    });
});

servidor.listen(3000, () => {
    console.log('Servidor JSON rodando na porta 3000');
});