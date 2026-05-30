const http = require('http');

const servidor = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.end(`
        <html>
            <body>
                <h1>Servidor Node.js funcionando!</h1>
                <p>Meu primeiro servidor HTTP.</p>
            </body>
        </html>
    `);
});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});