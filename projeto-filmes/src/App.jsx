import { useEffect, useState } from "react";
import "./App.css";

// URL da API (JSON Server)
const URL = "http://localhost:3000/filmes";

export default function App() {
  // Estado que armazena a lista de filmes/séries
  const [filmes, setFilmes] = useState([]);

  // Estado do formulário
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    ano: "",
    tipo: "Filme",
    status: "assistir",
  });

  // Estado para controlar edição
  const [editando, setEditando] = useState(null);

  // Estado para busca
  const [busca, setBusca] = useState("");

  // Executa quando a página carrega
  useEffect(() => {
    carregar();
  }, []);

  // Função que busca dados da API
  async function carregar() {
    const res = await fetch(URL);
    const data = await res.json();
    setFilmes(data);
  }

  // Função para cadastrar ou atualizar filme
  async function salvar(e) {
    e.preventDefault();
    if (!form.titulo) return alert("Título obrigatório!");

    if (editando) {
      // UPDATE
      await fetch(`${URL}/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditando(null);
    } else {
      // CREATE
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    limpar();
    carregar();
  }

  // Função para excluir
  async function remover(id) {
    if (!confirm("Tem certeza que deseja remover?")) return;
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    carregar();
  }

  // Função para carregar dados no formulário (editar)
  function editar(filme) {
    setForm({
      titulo: filme.titulo,
      genero: filme.genero,
      ano: filme.ano,
      tipo: filme.tipo,
      status: filme.status,
    });
    setEditando(filme.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Função para alternar status
  async function alternarStatus(filme) {
    const atualizado = {
      ...filme,
      status: filme.status === "assistir" ? "assistido" : "assistir",
    };
    await fetch(`${URL}/${filme.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(atualizado),
    });
    carregar();
  }

  // Limpa formulário
  function limpar() {
    setForm({ titulo: "", genero: "", ano: "", tipo: "Filme", status: "assistir" });
    setEditando(null);
  }

  // Filtra filmes pela busca
  const filmesFiltrados = filmes.filter((f) =>
    f.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="logo-icon">🎬</span>
          <div>
            <h1 className="logo-title">CineList</h1>
            <p className="logo-sub">Sua lista de filmes & séries</p>
          </div>
        </div>
      </header>

      <main className="main">
        {/* FORMULÁRIO */}
        <section className="card form-card">
          <h2 className="section-title">
            {editando ? "✏️ Editando título" : "➕ Novo título"}
          </h2>

          <form onSubmit={salvar} className="form">
            <div className="form-grid">
              <div className="form-group span-2">
                <label>Título *</label>
                <input
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ex: Inception"
                />
              </div>

              <div className="form-group">
                <label>Gênero</label>
                <input
                  value={form.genero}
                  onChange={(e) => setForm({ ...form, genero: e.target.value })}
                  placeholder="Ex: Ficção Científica"
                />
              </div>

              <div className="form-group">
                <label>Ano</label>
                <input
                  type="number"
                  value={form.ano}
                  onChange={(e) => setForm({ ...form, ano: e.target.value })}
                  placeholder="Ex: 2010"
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                >
                  <option>Filme</option>
                  <option>Série</option>
                  <option>Documentário</option>
                  <option>Anime</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="assistir">Para assistir</option>
                  <option value="assistindo">Assistindo</option>
                  <option value="assistido">Assistido</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editando ? "💾 Salvar alterações" : "➕ Cadastrar"}
              </button>
              {editando && (
                <button type="button" className="btn btn-secondary" onClick={limpar}>
                  ✖ Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* BUSCA + LISTA */}
        <section className="card list-card">
          <div className="list-header">
            <h2 className="section-title">📋 Minha Lista ({filmes.length})</h2>
            <input
              className="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Buscar título..."
            />
          </div>

          {filmesFiltrados.length === 0 ? (
            <p className="empty">Nenhum título encontrado. Cadastre um acima!</p>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Gênero</th>
                    <th>Ano</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filmesFiltrados.map((filme) => (
                    <tr key={filme.id}>
                      <td className="td-titulo">{filme.titulo}</td>
                      <td>
                        <span className="badge badge-tipo">{filme.tipo}</span>
                      </td>
                      <td>{filme.genero || "—"}</td>
                      <td>{filme.ano || "—"}</td>
                      <td>
                        <span className={`badge badge-status badge-${filme.status}`}>
                          {filme.status === "assistir"
                            ? "📌 Para assistir"
                            : filme.status === "assistindo"
                            ? "▶️ Assistindo"
                            : "✅ Assistido"}
                        </span>
                      </td>
                      <td className="td-actions">
                        <button
                          className="btn-icon btn-toggle"
                          title="Alternar status"
                          onClick={() => alternarStatus(filme)}
                        >
                          🔄
                        </button>
                        <button
                          className="btn-icon btn-edit"
                          title="Editar"
                          onClick={() => editar(filme)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          title="Excluir"
                          onClick={() => remover(filme.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
