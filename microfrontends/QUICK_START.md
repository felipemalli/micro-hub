# 🚀 Quick Start - Microfrontends

## ⚡ Execução Rápida

```bash
# 1. Instalar dependências (primeira vez)
npm run install-all

# 2. Iniciar todos os microfrontends
npm start

# 3. Acessar: http://localhost:3000
```

## 🛠️ Comandos Úteis

```bash
npm start              # Inicia sequencialmente (RECOMENDADO)
npm run start-parallel # Inicia em paralelo
npm run stop           # Para todos os serviços
npm run test-setup     # Testa se tudo está configurado
npm run start-simple   # Modo alternativo bash
```

## 🔧 Solução de Problemas

**Se `npm start` não funcionar:**

```bash
npm run start-simple
```

**Se houver erro de porta ocupada:**

```bash
npm run stop
```

**Para verificar status dos serviços:**

```bash
./check-status.sh
```

**Para testar configuração:**

```bash
npm run test-setup
```

**✅ Problemas comuns resolvidos:**

- "Shared module eager consumption" - Padrão bootstrap implementado
- "Cannot find react-router-dom" - Dependências instaladas
- "Loading script failed" - Ordem sequencial garantida

**🎉 NOVO: TypeScript + Tailwind CSS**

- Shell App convertido para TypeScript + Tailwind
- Interface moderna com animações
- Componentes tipados e seguros
- Design system implementado

**📖 Ver mais detalhes:**

- `TROUBLESHOOTING.md` - Solução de problemas
- `TYPESCRIPT_MIGRATION.md` - Guia de migração TypeScript

## 📋 Portas dos Serviços

- 🏠 **Shell App**: http://localhost:3000 (principal)
- 🔐 **Auth**: http://localhost:3001
- 👽 **Rick & Morty**: http://localhost:3002

## 🎯 Contas de Teste

- **Email**: `admin@teste.com` | **Senha**: `123456`
- **Email**: `user@teste.com` | **Senha**: `123456`

## 🚨 Ordem Importante

1. Rick & Morty (3002) - primeiro
2. Auth (3001) - segundo
3. Shell (3000) - último

O script `npm start` já faz isso automaticamente! 🎉
