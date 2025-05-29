let lista = JSON.parse(localStorage.getItem("listaNomes")) || [];
let acaoADM = "";
let listaTrancada = JSON.parse(localStorage.getItem("listaTrancada")) || false;

const btnAdicionar = document.getElementById("btnAdicionar");
const statusLista = document.getElementById("statusLista");

function atualizarStatus() {
  const statusEl = document.getElementById("statusLista");

  if (listaTrancada) {
    statusEl.innerHTML = 'Status da Lista:&nbsp;<span class="vermelho">FECHADA 🔒</span>';
    btnAdicionar.disabled = true;
    btnAdicionar.style.opacity = 0.5;
  } else {
    statusEl.innerHTML = 'Status da Lista:&nbsp;<span class="verde">ABERTA 🔓</span>';
    btnAdicionar.disabled = false;
    btnAdicionar.style.opacity = 1;
  }
}


function adicionarPessoa() {
  if (listaTrancada) {
    alert("A lista está trancada. Não é possível adicionar novas pessoas.");
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();

  if (nome && sobrenome) {
    const nomeCompleto = nome + " " + sobrenome;
    lista.push(nomeCompleto);
    salvarLista();
    atualizarLista();
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
  } else {
    alert("Por favor, preencha nome e sobrenome corretamente.");
  }
}

function atualizarLista() {
  const ol = document.getElementById("lista");
  ol.innerHTML = "";
  lista.forEach((pessoa) => {
    const li = document.createElement("li");
    li.textContent = pessoa;
    ol.appendChild(li);
  });
}

function salvarLista() {
  localStorage.setItem("listaNomes", JSON.stringify(lista));
}

function limparLista() {
  document.getElementById("confirmacaoLimpeza").style.display = "block";
}

function confirmarLimpezaLista(confirmado) {
  document.getElementById("confirmacaoLimpeza").style.display = "none";
  if (confirmado) {
    lista = [];
    salvarLista();
    atualizarLista();
  }
}

function mostrarPromptADM(acao) {
  acaoADM = acao;
  document.getElementById("promptADM").style.display = "block";
  document.getElementById("senhaADM").focus();
}

function autenticarADM() {
  const senha = document.getElementById("senhaADM").value;
  document.getElementById("promptADM").style.display = "none";
  document.getElementById("senhaADM").value = "";

  if (senha === "123") {
    switch (acaoADM) {
      case "painel":
        document.getElementById("painelADM").style.display = "block";
        break;
      case "limpar":
        limparLista();
        break;
      case "editar":
        mostrarEdicao();
        break;
      case "trancar":
        alternarTrancarLista();
        break;
    }
  } else {
    alert("Senha incorreta. Ação não autorizada.");
  }
}

function mostrarEdicao() {
  document.getElementById("editarInfos").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}

function fecharEdicao() {
  document.getElementById("editarInfos").style.display = "none";
}

function fecharPainelADM() {
  document.getElementById("painelADM").style.display = "none";
}

function alternarTrancarLista() {
  listaTrancada = !listaTrancada;
  localStorage.setItem("listaTrancada", JSON.stringify(listaTrancada));
  atualizarStatus();
}

// Inicialização ao carregar a página
atualizarLista();
atualizarStatus();