let perguntas = [];
let atual = 0;
let pontos = 0;

let tempo = 15;
let intervalo;

const elInicio = document.getElementById('inicio');
const elQuiz = document.getElementById('quiz');
const elResultado = document.getElementById('resultado');

const elProgresso = document.getElementById('progresso');
const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');

const elTimer = document.getElementById('timer');
const barraProgresso =
    document.getElementById('barraProgresso');

const btnIniciar =
    document.getElementById('btnIniciar');

async function buscarPerguntas() {

    const url =
        'https://opentdb.com/api.php?amount=10&type=multiple';

    const res = await fetch(url);
    const data = await res.json();

    perguntas = data.results;

}

function embaralhar(array) {

    return array.sort(
        () => Math.random() - 0.5
    );

}

function getAlternativas(pergunta) {

    const todas = [
        ...pergunta.incorrect_answers,
        pergunta.correct_answer
    ];

    return embaralhar(todas);

}

function atualizarBarra() {

    const porcentagem =
        ((atual + 1) / perguntas.length) * 100;

    barraProgresso.style.width =
        porcentagem + '%';

}

function iniciarTimer() {

    clearInterval(intervalo);

    tempo = 15;

    elTimer.textContent =
        `⏳ ${tempo}s`;

    intervalo = setInterval(() => {

        tempo--;

        elTimer.textContent =
            `⏳ ${tempo}s`;

        if (tempo <= 0) {

            clearInterval(intervalo);

            atual++;

            if (atual < perguntas.length) {
                exibirPergunta();
            } else {
                exibirResultado();
            }

        }

    }, 1000);

}

function exibirPergunta() {

    atualizarBarra();

    iniciarTimer();

    const pergunta =
        perguntas[atual];

    const alternativas =
        getAlternativas(pergunta);

    elProgresso.textContent =
        `${atual + 1}/${perguntas.length}`;

    elPergunta.innerHTML =
        pergunta.question;

    elOpcoes.innerHTML = '';

    alternativas.forEach(alt => {

        const btn =
            document.createElement('button');

        btn.className = 'opcao';

        btn.innerHTML = alt;

        elOpcoes.appendChild(btn);

    });

}

elOpcoes.addEventListener(
    'click',
    (e) => {

        if (
            !e.target.classList.contains(
                'opcao'
            )
        ) return;

        clearInterval(intervalo);

        const resposta =
            e.target.textContent;

        const correta =
            perguntas[atual].correct_answer;

        if (resposta === correta) {

            pontos++;

            e.target.classList.add(
                'correta'
            );

        } else {

            e.target.classList.add(
                'errada'
            );

        }

        setTimeout(() => {

            atual++;

            if (
                atual < perguntas.length
            ) {

                exibirPergunta();

            } else {

                exibirResultado();

            }

        }, 1000);

    }
);

function exibirResultado() {

    elQuiz.hidden = true;

    elResultado.hidden = false;

    const total =
        perguntas.length;

    const pct =
        Math.round(
            (pontos / total) * 100
        );

    let msg =
        'Tente novamente!';

    if (pct >= 80) {
        msg = 'Excelente!';
    } else if (pct >= 60) {
        msg = 'Bom trabalho!';
    }

    const recorde =
        Number(
            localStorage.getItem(
                'recorde'
            )
        ) || 0;

    if (pontos > recorde) {

        localStorage.setItem(
            'recorde',
            pontos
        );

    }

    const recordeAtual =
        localStorage.getItem(
            'recorde'
        );

    elResultado.innerHTML = `
        <h2>${msg}</h2>

        <p>
            ${pontos} de ${total}
            (${pct}%)
        </p>

        <p>
            Recorde: ${recordeAtual}
        </p>

        <button id="btnReiniciar">
            Jogar novamente
        </button>
    `;

    document
        .getElementById(
            'btnReiniciar'
        )
        .addEventListener(
            'click',
            () => location.reload()
        );

}

btnIniciar.addEventListener(
    'click',
    async () => {

        await buscarPerguntas();

        elInicio.hidden = true;

        elQuiz.hidden = false;

        exibirPergunta();

    }
);