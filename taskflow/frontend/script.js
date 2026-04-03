const API_URL = "http://localhost:8080/tarefas";

const form = document.getElementById("tarefaForm");
const listaTarefas = document.getElementById("listaTarefas");
const atualizarBtn = document.getElementById("atualizarBtn");

function formatarClasse(texto) {
  return texto.toLowerCase();
}

function obterMensagemErro(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === "string") return payload;
  if (payload.message) return payload.message;
  return fallback;
}

async function carregarTarefas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }

    const tarefas = await response.json();
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
      listaTarefas.innerHTML = `<div class="vazio">Nenhuma tarefa cadastrada.</div>`;
      return;
    }

    tarefas.forEach((tarefa) => {
      const card = document.createElement("div");
      card.classList.add("card-tarefa");

      const statusClasse = `status-${formatarClasse(tarefa.status)}`;
      const prioridadeClasse = `prioridade-${formatarClasse(tarefa.prioridade)}`;

      card.innerHTML = `
        <div class="card-topo">
          <div>
            <h3>${tarefa.titulo}</h3>
            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
          </div>
        </div>

        <div class="badges">
          <span class="badge ${statusClasse}">${tarefa.status}</span>
          <span class="badge ${prioridadeClasse}">${tarefa.prioridade}</span>
        </div>

        <div class="acoes">
          <button class="btn-acao btn-concluir" onclick="concluirTarefa(${tarefa.id})">
            Concluir
          </button>
          <button class="btn-acao btn-excluir" onclick="excluirTarefa(${tarefa.id})">
            Excluir
          </button>
        </div>
      `;

      listaTarefas.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    listaTarefas.innerHTML = `<div class="vazio">Erro ao carregar tarefas.</div>`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const novaTarefa = {
    titulo: document.getElementById("titulo").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    status: document.getElementById("status").value,
    prioridade: document.getElementById("prioridade").value
  };

  if (!novaTarefa.titulo || !novaTarefa.descricao || !novaTarefa.status || !novaTarefa.prioridade) {
    alert("Preencha todos os campos da tarefa.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaTarefa)
    });

    if (!response.ok) {
      let payload = null;
      try {
        payload = await response.json();
      } catch (_) {
        payload = null;
      }
      throw new Error(obterMensagemErro(payload, "Erro ao cadastrar tarefa"));
    }

    form.reset();
    carregarTarefas();
  } catch (error) {
    console.error("Erro ao salvar tarefa:", error);
    alert(error.message || "Não foi possível cadastrar a tarefa.");
  }
});

async function excluirTarefa(id) {
  const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      let payload = null;
      try {
        payload = await response.json();
      } catch (_) {
        payload = null;
      }
      throw new Error(obterMensagemErro(payload, "Erro ao excluir tarefa"));
    }

    carregarTarefas();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    alert(error.message || "Não foi possível excluir a tarefa.");
  }
}

async function concluirTarefa(id) {
  try {
    const responseBusca = await fetch(`${API_URL}/${id}`);

    if (!responseBusca.ok) {
      let payload = null;
      try {
        payload = await responseBusca.json();
      } catch (_) {
        payload = null;
      }
      throw new Error(obterMensagemErro(payload, "Erro ao buscar tarefa"));
    }

    const tarefa = await responseBusca.json();

    const tarefaAtualizada = {
      ...tarefa,
      status: "CONCLUIDA"
    };

    const responseAtualiza = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tarefaAtualizada)
    });

    if (!responseAtualiza.ok) {
      let payload = null;
      try {
        payload = await responseAtualiza.json();
      } catch (_) {
        payload = null;
      }
      throw new Error(obterMensagemErro(payload, "Erro ao concluir tarefa"));
    }

    carregarTarefas();
  } catch (error) {
    console.error("Erro ao concluir tarefa:", error);
    alert(error.message || "Não foi possível concluir a tarefa.");
  }
}

atualizarBtn.addEventListener("click", carregarTarefas);

carregarTarefas();
