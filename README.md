# 🎬 CineList — Cadastro de Filmes & Séries

Projeto CRUD desenvolvido com **React + JSON Server** para a disciplina de desenvolvimento web.

---

## 📋 O que o projeto faz?

O CineList é uma aplicação web onde você pode:

- ➕ **Cadastrar** filmes e séries
- 📋 **Listar** todos os títulos cadastrados
- ✏️ **Editar** informações de um título
- 🗑️ **Excluir** títulos da lista
- 🔄 **Alternar status** entre "Para assistir", "Assistindo" e "Assistido"
- 🔍 **Buscar** títulos pelo nome

---

## 💻 O que você precisa instalar antes de tudo

### 1. Node.js

O Node.js é o programa que permite rodar JavaScript fora do navegador. Sem ele, nada funciona.

👉 Acesse: **https://nodejs.org**
👉 Clique no botão **LTS** (versão recomendada) e instale normalmente

Após instalar, **reinicie o computador**.

Para confirmar que instalou certo, abra o terminal e digite:
```
node -v
```
Se aparecer um número de versão (ex: `v24.0.0`), está funcionando ✅

---

### 2. VS Code (editor de código)

👉 Acesse: **https://code.visualstudio.com**
👉 Baixe e instale normalmente

> ⚠️ **Atenção:** O Visual Studio 2022 **não serve** para esse projeto. Use o VS Code.

---

### 3. Liberar execução de scripts no Windows

O Windows bloqueia scripts por padrão. Para liberar, abra o terminal do VS Code (`Ctrl + '`) e rode:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Aperte Enter. Se perguntar confirmação, digite **S** e Enter novamente.

> Isso só precisa ser feito uma vez.

---

## 🚀 Como rodar o projeto

### Passo 1 — Abrir o projeto no VS Code

1. Abra o VS Code
2. Clique em **File → Open Folder**
3. Selecione a pasta do projeto (onde está o `package.json`)

---

### Passo 2 — Instalar as dependências

Abra o terminal do VS Code com `Ctrl + '` e rode:

```
npm install
```

Aguarde terminar. Isso cria a pasta `node_modules` com tudo que o projeto precisa.

> ⚠️ Só precisa fazer isso uma vez (ou quando receber o projeto pela primeira vez).

---

### Passo 3 — Rodar a API (JSON Server)

A API simula um banco de dados local. Ela precisa ficar rodando enquanto você usa o projeto.

No terminal, rode:

```
npx json-server --watch db.json --port 3000
```

Se aparecer algo assim, está funcionando ✅

```
JSON Server started on PORT :3000
Watching db.json...
Endpoints:
http://localhost:3000/filmes
```

> ⚠️ **Não feche esse terminal!** Deixe ele aberto enquanto usa o projeto.

---

### Passo 4 — Rodar o React

Abra um **segundo terminal** (clique no **+** no painel de terminais do VS Code) e rode:

```
npm run dev
```

Se aparecer algo assim, está funcionando ✅

```
VITE v8.0.0  ready in 300ms
➜  Local: http://localhost:5173/
```

> ⚠️ **Não feche esse terminal também!** Os dois precisam ficar abertos ao mesmo tempo.

---

### Passo 5 — Acessar no navegador

Abra o navegador e acesse:

👉 **http://localhost:5173**

O projeto vai aparecer com 3 filmes de exemplo já cadastrados.

---

## 🗂️ Estrutura dos arquivos

```
projeto-filmes/
├── src/
│   ├── App.jsx       ← Código principal do React (lógica + interface)
│   └── App.css       ← Estilo visual da aplicação
├── db.json           ← "Banco de dados" dos filmes
├── package.json      ← Configurações e dependências do projeto
└── README.md         ← Este arquivo
```

---

## ⚙️ Como o CRUD funciona

| Operação | Método HTTP | O que faz |
|----------|-------------|-----------|
| **Create** | POST | Cadastra um novo filme/série |
| **Read** | GET | Busca e lista todos os títulos |
| **Update** | PUT | Edita informações ou alterna o status |
| **Delete** | DELETE | Remove um título da lista |

Toda operação é feita via **Fetch API**, que envia requisições HTTP para o JSON Server rodando em `http://localhost:3000/filmes`.

---

## ❌ Erros comuns e como resolver

### "npx não é reconhecido"
> O Node.js não foi instalado corretamente ou o computador não foi reiniciado após a instalação.
> **Solução:** Reinicie o computador e tente novamente.

### "execução de scripts foi desabilitada"
> O Windows bloqueou o script.
> **Solução:** Rode o comando do Passo 3 da seção de instalação acima.

### "Failed to fetch" ou a lista não carrega
> A API não está rodando.
> **Solução:** Abra um terminal e rode `npx json-server --watch db.json --port 3000`

### Página em branco ou erro no navegador
> O React não está rodando.
> **Solução:** Abra um terminal e rode `npm run dev`, depois acesse `http://localhost:5173`

### A porta 3000 já está em uso
> Outro programa está usando a porta.
> **Solução:** Rode a API em outra porta: `npx json-server --watch db.json --port 3001`
> E atualize a linha no `App.jsx`: `const URL = "http://localhost:3001/filmes";`

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Para que serve |
|------------|----------------|
| **React** | Construção da interface do usuário |
| **Vite** | Ferramenta que cria e roda o projeto React |
| **JSON Server** | API simulada que armazena os dados em `db.json` |
| **Fetch API** | Comunicação entre o React e a API via HTTP |
| **Node.js** | Ambiente que permite rodar JavaScript no computador |

---

## 👥 Resumo rápido para rodar (versão curta)

```bash
# 1. Instalar dependências (só na primeira vez)
npm install

# 2. Terminal 1 — Rodar a API
npx json-server --watch db.json --port 3000

# 3. Terminal 2 — Rodar o React
npm run dev

# 4. Abrir no navegador
http://localhost:5173
```
