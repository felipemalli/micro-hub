# Microhub

Projeto demonstrativo de microfrontends, estruturado em múltiplos repositórios independentes, com backend desacoplado e consumo de um NPM Package para o design system.

📖 **Documentação Detalhada:**

- [🏗️ Decisões Arquiteturais](./docs/ARCHITECTURE.md)
- [🚀 Planejamento da Arquitetura](./docs/ARCHITECTURE_PLANNING.md)
- [🔍 Resolução de Problemas](./docs/TROUBLESHOOTING.md)
- [⚙️ Guia Técnico](./docs/TECHNICAL-GUIDE.md)

## Inicialização

```bash
git clone https://github.com/microhub-project/microhub.git
cd microhub
```

**Instalar dependências:**

```bash
pnpm install:all
```

**Executar o projeto:**

```bash
pnpm run start
```

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

### Frontend

#### Execução isolada dosMicrofrontends

Microfrontend de Autenticação (`auth-microfrontend`):

```
http://localhost:3001/auth
```

Microfrontend de consumo da API Rick and Morty (`rick-morty-microfrontend`):

```
http://localhost:3002/rickmorty
```
