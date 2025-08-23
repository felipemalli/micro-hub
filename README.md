# Microhub

Projeto de microfrontends, estruturado em múltiplos repositórios independentes, com backend desacoplado e consumo de um NPM Package para o design system.

📖 **Documentação Detalhada:**

- [📋 Planejamento da Arquitetura](./docs/ARCHITECTURE_PLANNING.md)
- [🔍 Resolução de Problemas](./docs/TROUBLESHOOTING.md)
- [🏗️ Decisões Arquiteturais](./docs/ARCHITECTURE.md)
- [⚙️ Guia Técnico](./docs/TECHNICAL-GUIDE.md)
- [🎨 Design System](https://www.npmjs.com/package/@felipemalli-libs/microhub-ui)

## Pré-requisitos

- Node.js 18+
- Docker v20.10+ (com Compose v2)
- pnpm 10+

## Inicialização

```bash
git clone git@github.com:felipemalli/micro-hub.git
```

```bash
cd micro-hub
```

**Instalar dependências:**

```bash
pnpm install:all
```

**Executar o projeto:**

```bash
pnpm run start
```

> **Nota:** O comando `pnpm run start` automaticamente para o Docker quando você pressiona Ctrl+C.

## Execução

Microfrontend Principal (`microhub-shell`):

```
http://localhost:3000/
```

### Backend

API:

```
http://localhost:4000/api
```

Documentação:

```
http://localhost:4000/docs#/
```

### Execução isolada dos Microfrontends

Microfrontend de Autenticação (`auth-microfrontend`):

```
http://localhost:3001/auth
```

Microfrontend de consumo da API Rick and Morty (`rick-morty-microfrontend`):

```
http://localhost:3002/rickmorty
```

## Comandos Adicionais

### Gerenciamento de Dependências

Limpar todos os node_modules:

```bash
pnpm run clean:node_modules
```

### Gerenciamento do Backend

Parar apenas o backend (Docker):

```bash
pnpm run stop:backend
```

Resetar banco de dados:

```bash
pnpm run clean:backend:db
```
