const form = document.getElementById("formTarefa");
const input = document.getElementById("inputTarefa");
const lista = document.getElementById("lista");
const buscar = document.getElementById("buscar");

// carregar tarefas salvas
document.addEventListener("DOMContentLoaded", carregarTarefas);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = input.value.trim();

    if (texto === "") return;

    criarTarefa(texto);

    salvarTarefas();

    input.value = "";
});

function criarTarefa(texto, concluida = false) {
    const li = document.createElement("li");
    li.textContent = texto;

    if (concluida) {
        li.style.textDecoration = "line-through";
    }

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";

    li.appendChild(botaoRemover);
    lista.appendChild(li);
}

// delegação de eventos
lista.addEventListener("click", function(event) {
    
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        salvarTarefas();
    } 
    
    else if (event.target.tagName === "LI") {
        const tarefa = event.target;

        if (tarefa.style.textDecoration === "line-through") {
            tarefa.style.textDecoration = "none";
        } else {
            tarefa.style.textDecoration = "line-through";
        }

        salvarTarefas();
    }
});

// busca em tempo real
buscar.addEventListener("input", function() {
    const termo = buscar.value.toLowerCase();

    const tarefas = lista.querySelectorAll("li");

    tarefas.forEach(function(tarefa) {
        const texto = tarefa.firstChild.textContent.toLowerCase();

        if (texto.includes(termo)) {
            tarefa.style.display = "list-item";
        } else {
            tarefa.style.display = "none";
        }
    });
});

// salvar no localStorage
function salvarTarefas() {
    const tarefas = [];

    lista.querySelectorAll("li").forEach(function(li) {
        tarefas.push({
            texto: li.firstChild.textContent,
            concluida: li.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// carregar tarefas
function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefasSalvas.forEach(function(tarefa) {
        criarTarefa(tarefa.texto, tarefa.concluida);
    });
}