# 🚀 Microfrontends com Module Federation

Este projeto demonstra uma arquitetura de microfrontends usando **Webpack Module Federation** com React.

## 📋 Estrutura do Projeto

```
front_micro/
├── shell-app/              # Aplicação container (Host)
├── auth-microfrontend/      # Microfrontend de Autenticação
├── rick-morty-microfrontend/# Microfrontend Rick and Morty
└── README.md
```

## 🏗️ Arquitetura

- **Shell App (Porto 3000)**: Aplicação container que orquestra os microfrontends
- **Auth Microfrontend (Porto 3001)**: Sistema de autenticação com login/registro mock
- **Rick and Morty Microfrontend (Porto 3002)**: Exibição de dados da API pública do Rick and Morty

## 🚀 Como Executar

### 1. Instalar dependências em todos os projetos

```bash
# No shell-app
cd shell-app
npm install

# No auth-microfrontend
cd ../auth-microfrontend
npm install

# No rick-morty-microfrontend
cd ../rick-morty-microfrontend
npm install
```

### 2. Executar os microfrontends

**Opção 1 - Comando único (recomendado):**

```bash
npm start
# ou
npm run dev
```

**Opção 2 - Modo simples com background:**

```bash
npm run start-simple
```

**Opção 3 - Manual (3 terminais separados):**

```bash
# Terminal 1 - Rick and Morty Microfrontend:
cd rick-morty-microfrontend && npm start

# Terminal 2 - Auth Microfrontend:
cd auth-microfrontend && npm start

# Terminal 3 - Shell App:
cd shell-app && npm start
```

**Para parar todos os serviços:**

```bash
npm run stop
```

### 3. Acessar a aplicação

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ✨ Funcionalidades

### 🔐 Microfrontend de Autenticação

- Login e registro de usuários
- Validação de formulários
- Gerenciamento de sessão com localStorage
- Contas de teste disponíveis:
  - `admin@teste.com` / `123456`
  - `user@teste.com` / `123456`

### 👽 Microfrontend Rick and Morty

- Listagem de personagens com paginação
- Busca por personagens
- Exibição de episódios
- Listagem de localizações
- Consumo da API pública: https://rickandmortyapi.com

### 🏠 Shell App

- Navegação entre microfrontends
- Carregamento dinâmico de módulos
- Error boundaries para tratamento de erros
- Loading states
- Design responsivo

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Webpack 5** - Bundler com Module Federation
- **React Router Dom** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **CSS3** - Estilização com design moderno

## 📦 Module Federation

Configuração de exposição de módulos:

- **auth-microfrontend** expõe: `./AuthApp`
- **rick-morty-microfrontend** expõe: `./RickMortyApp`
- **shell-app** consome: ambos os módulos remotos

## 🎨 Design

- Interface moderna com gradientes
- Design responsivo
- Estados de loading e erro
- Animações sutis com CSS
- Tema consistente entre microfrontends

## 🔧 Scripts Disponíveis

**Scripts principais:**

- `npm start` - Inicia todos os microfrontends automaticamente
- `npm run dev` - Alias para desenvolvimento
- `npm run start-simple` - Modo simples com opção de background
- `npm run stop` - Para todos os serviços
- `npm run install-all` - Instala dependências de todos os projetos
- `npm run build-all` - Builda todos para produção
- `npm run clean` - Remove node_modules

**Scripts individuais (em cada pasta):**

- `npm start` - Executa microfrontend individual
- `npm run build` - Cria build de produção

## 🚨 Ordem de Execução Importante

1. **SEMPRE** execute primeiro os microfrontends remotos (portas 3001 e 3002)
2. **DEPOIS** execute o shell app (porta 3000)

Isso garante que os módulos remotos estejam disponíveis quando o container tentar carregá-los.

## 🔍 Troubleshooting

**Erro de carregamento de módulo:**

- Verifique se todos os microfrontends estão rodando
- Confirme as portas corretas (3001 e 3002)
- Limpe o cache do navegador

**CORS Issues:**

- Os headers CORS estão configurados nos webpack configs
- Certifique-se de que não há proxy bloqueando as requisições

---
