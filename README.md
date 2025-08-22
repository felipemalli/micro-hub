# Microhub

Projeto demonstrativo de microfrontends, estruturado em múltiplos repositórios independentes, com backend desacoplado e consumo de um NPM Package para o design system.

📖 **Documentação Detalhada:**

- [🏗️ Decisões Arquiteturais](./docs/ARCHITECTURE.md)
- [🔍 Resolução de Problemas](./docs/TROUBLESHOOTING.md)
- [⚙️ Guia Técnico](./docs/TECHNICAL-GUIDE.md)
- [🚀 Deploy](./docs/DEPLOYMENT.md)

📦 **Componentes do Projeto:**

- [Backend (NestJS + PostgreSQL)](./backend/README.md)
- [Microfrontends (Module Federation)](./microfrontends/README.md)
- [Design System (Web Components)](./npm-packages/README.md)

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
