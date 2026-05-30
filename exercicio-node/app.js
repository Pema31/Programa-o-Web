const { soma, multiplicar } = require('./utils');
const fs = require('fs');

const resultadoSoma = soma(10, 5);
const resultadoMultiplicacao = multiplicar(10, 5);

console.log('Soma:', resultadoSoma);
console.log('Multiplicação:', resultadoMultiplicacao);

// Salvar resultado em arquivo TXT
const conteudo = `
Soma: ${resultadoSoma}
Multiplicação: ${resultadoMultiplicacao}
`;

fs.writeFileSync('resultado.txt', conteudo);

console.log('Arquivo resultado.txt criado com sucesso!');