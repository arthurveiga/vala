let lista = JSON.parse(localStorage.getItem("listaNomes")) || [];
let acaoADM = "";
let listaTrancada = JSON.parse(localStorage.getItem("listaTrancada")) || false;

const btnAdicionar = document.getElementById("btnAdicionar");
const btnTrancar = document.getElementById("btnTrancar");
const statusLista = document.getElementById("statusLista");

function atualizarStatus() {
  if (listaTrancada) {
    statusLista.textContent = "Lista: FECHADA 🔒";
    btnTrancar.textContent = "🔓 Destrancar Lista";
    btnAdicionar.disabled = true;
    btnAdicionar.style.opacity = 0.5;
  } else {
    statusLista.textContent = "Lista: ABERTA 🔓";
    btnTrancar.textContent = "🔒 Trancar Lista";
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
    if (acaoADM === "limpar") limparLista();
    else if (acaoADM === "editar") {
      document.getElementById("editarInfos").style.display = "block";
      window.scrollTo(0, document.body.scrollHeight);
    }
    else if (acaoADM === "trancar") {
      listaTrancada = !listaTrancada;
      localStorage.setItem("listaTrancada", JSON.stringify(listaTrancada));
      atualizarStatus();
    }
  } else {
    alert("Senha incorreta. Ação não autorizada.");
  }
}

function salvarInformacoes() {
  const novoTitulo = document.getElementById("novoTitulo").value;
  const novaInfo1 = document.getElementById("novaInfo1").value;
  const novaInfo2 = document.getElementById("novaInfo2").value;
  const novaInfo3 = document.getElementById("novaInfo3").value;
  const novaInfo4 = document.getElementById("novaInfo4").value;

  if (novoTitulo) document.getElementById("titulo").textContent = novoTitulo;
  if (novaInfo1) document.getElementById("info1").textContent = novaInfo1;
  if (novaInfo2) document.getElementById("info2").textContent = novaInfo2;
  if (novaInfo3) document.getElementById("info3").innerHTML = `<strong>${novaInfo3}</strong>`;
  if (novaInfo4) document.getElementById("info4").textContent = novaInfo4;

  alert("Informações atualizadas com sucesso!");
}

function fecharEdicao() {
  document.getElementById("editarInfos").style.display = "none";
}

// Inicialização ao carregar a página
atualizarLista();
atualizarStatus();