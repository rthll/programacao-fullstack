# FBI Most Wanted - Projeto Full Stack

## Contexto acadêmico

Este repositório reúne um projeto desenvolvido na disciplina de **Programação Full Stack da UTFPR**. A proposta da aplicação é demonstrar a construção de uma solução web full stack com integração entre **frontend**, **backend** e **banco de dados**, usando como tema um sistema de consulta e cadastro de pessoas procuradas inspirado no universo **FBI Most Wanted**.

## Visão geral do projeto

A aplicação permite:

- autenticação básica de usuário;
- listagem de pessoas procuradas em formato de cards;
- visualização de detalhes completos de cada registro;
- cadastro de novos procurados;
- consumo de uma API própria em ambiente local;
- persistência dos dados em MongoDB.

Na implementação atual, o frontend consulta **o backend local do próprio projeto**. Pela análise do código, **não há integração direta com a API oficial do FBI**; os dados são servidos pela API desenvolvida no repositório e podem ser apoiados por registros locais, inclusive o arquivo JSON disponível em `Banco/`.

## Objetivos pedagógicos

Este projeto evidencia conceitos importantes da disciplina, como:

- separação entre camadas de apresentação, regras de negócio e persistência;
- criação de rotas e consumo de API REST;
- uso de React para construção da interface;
- uso de Node.js com Express no backend;
- persistência de dados com MongoDB e Mongoose;
- aplicação de medidas básicas de segurança e organização de código.

## Funcionalidades identificadas

### Implementadas

- tela de login com validação contra um usuário mock local;
- rotas protegidas no frontend;
- listagem de registros armazenados no backend;
- exibição de detalhes em modal e em página dedicada;
- formulário para inserção de novas pessoas procuradas;
- armazenamento dos registros em MongoDB;
- cache em memória para otimizar consultas no backend;
- logs de aplicação e de erros com Winston;
- proteção básica com `helmet`, `express-rate-limit`, `express-session` e sanitização de entradas.

### Estruturas já iniciadas no código

- persistência local de favoritos via `localStorage`;
- hooks e estados auxiliares para filtros e busca mais avançada;
- arquivos de apoio e estruturas que indicam evolução contínua do projeto.

## Stack utilizada

### Frontend

- React 19
- Vite
- React Router DOM
- Material UI
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express 5
- Mongoose
- Express Session
- Helmet
- CORS
- Compression
- Express Mongo Sanitize
- Express Rate Limit
- Node Cache
- Winston

### Banco de dados

- MongoDB local
- Arquivo de apoio/exportação em `Banco/fbi-wanted.wantedpeople.json`

## Arquitetura do repositório

```text
programacao-fullstack/
|-- backend/
|   `-- src/
|       |-- config/
|       |-- crt/
|       |-- logs/
|       |-- models/
|       `-- routes/
|-- frontend/
|   |-- public/
|   `-- src/
|       |-- components/
|       |-- contexts/
|       |-- hooks/
|       |-- pages/
|       |-- services/
|       `-- theme/
|-- Banco/
|   `-- fbi-wanted.wantedpeople.json
|-- package.json
`-- README.md
```

## Fluxo geral da aplicação

1. O usuário acessa a interface React e realiza login.
2. O frontend envia a requisição para `https://localhost:3001/api/auth/login`.
3. Após autenticação, o usuário pode acessar as rotas protegidas da aplicação.
4. Os dados de procurados são carregados do backend em `https://localhost:3001/api/data/search`.
5. Novos registros podem ser inseridos por formulário e persistidos no MongoDB.

## Requisitos para execução

Antes de rodar o projeto localmente, é recomendável ter instalado:

- Node.js
- npm
- MongoDB em execução local

O backend está configurado para conectar em:

```text
mongodb://localhost:27017/fbi-wanted
```

## Como executar o projeto

### 1. Instalar as dependências da raiz

Na raiz do repositório:

```bash
npm install
```

### 2. Instalar as dependências do frontend

```bash
cd frontend
npm install
```

### 3. Iniciar o backend

Em um terminal na raiz do projeto:

```bash
node backend/src/index.js
```

O backend sobe em:

```text
https://localhost:3001
```

Como o servidor usa certificado autoassinado para HTTPS local, pode ser necessario aceitar o certificado no navegador ou no ambiente de desenvolvimento durante os testes.

### 4. Iniciar o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

O frontend normalmente ficará disponível em:

```text
http://localhost:5173
```

### Observação para Windows PowerShell

Se o PowerShell bloquear o comando `npm` por política de execução, utilize:

```bash
npm.cmd install
npm.cmd run dev
```

## Credenciais de teste

O código atual possui um usuário mock configurado em memória:

- usuário: `admin`
- senha: `123`

## Principais endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Realiza login com usuário mock |
| `POST` | `/api/auth/register` | Registra novo usuário em memória |
| `GET` | `/api/data/search` | Lista os registros de procurados |
| `GET` | `/api/data/search/:id` | Busca um registro por ID |
| `POST` | `/api/data/wanted` | Cadastra uma nova pessoa procurada |

## Características técnicas relevantes

- backend servido via **HTTPS local** com certificado autoassinado;
- uso de **pool de conexões** no Mongoose;
- **cache em memória** para reduzir consultas repetidas;
- **rate limit** na rota de login;
- **logs de erro e operação** em arquivos e console;
- **sanitização de entradas** para reduzir risco de injeção;
- interface construída com combinação de **Material UI** e **Tailwind CSS**.

## Limitações e oportunidades de evolução

Pela estrutura atual do código, alguns pontos podem ser evoluídos em versões futuras:

- fortalecer a autenticação no backend com sessão realmente validada nas rotas protegidas;
- substituir o usuário mock por persistência real de usuários;
- unificar scripts de inicialização para frontend e backend;
- adicionar testes automatizados;
- amadurecer a busca, filtros e favoritos já esboçados no projeto;
- mover segredos e configurações para variáveis de ambiente.

## Autoria

Projeto acadêmico desenvolvido no contexto da disciplina de **Programação Full Stack da UTFPR**.

Autores identificados no código:

- Rythielly Bezerra
- Jhonathan Giacomazzi
