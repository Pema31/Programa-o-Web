const alunos = [
    { nome: "Ana", nota1: 8.5, nota2: 7.0 },
    { nome: "Bruno", nota1: 5.0, nota2: 4.5 },
    { nome: "Carla", nota1: 9.0, nota2: 10.0 },
    { nome: "Diego", nota1: 3.0, nota2: 6.0 },
    { nome: "Elena", nota1: 7.0, nota2: 6.5 }
];

const calcularMedia = (n1, n2) => (n1 + n2) / 2;

const alunosComMedia = alunos.map(aluno => ({
    ...aluno,
    media: calcularMedia(aluno.nota1, aluno.nota2)
}));

const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const somaDasMedias = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0);
const mediaGeral = somaDasMedias / alunosComMedia.length;

const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

console.log(`--- Relatório de Alunos (Ordenado por Média) ---`);
alunosOrdenados.forEach(aluno => {
    console.log(`Aluno: ${aluno.nome.padEnd(10)} | Média: ${aluno.media.toFixed(2)}`);
});

console.log(`\n--- Resumo da Turma ---`);
console.log(`Aprovados: ${aprovados.map(a => a.nome).join(", ")}`);
console.log(`Reprovados: ${reprovados.map(a => a.nome).join(", ")}`);
console.log(`Média Geral: ${mediaGeral.toFixed(2)}`);