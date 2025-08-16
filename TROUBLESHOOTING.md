# 🔧 Troubleshooting - Microfrontends

## ❌ Problema: "Shared module is not available for eager consumption"

### 🔍 **Sintomas:**

```
Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react
```

### 🎯 **Causa:**

O React estava sendo carregado de forma "eager" (ansiosa) antes do sistema de compartilhamento do Module Federation estar pronto.

### ✅ **Solução Implementada:**

#### 1. **Padrão Bootstrap**

Criamos arquivos `bootstrap.js` em cada microfrontend:

```javascript
// src/index.js
import("./bootstrap");

// src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

#### 2. **Configuração Eager: false**

Atualizamos os webpack configs:

```javascript
shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.2.0',
    eager: false  // ✅ IMPORTANTE
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.2.0',
    eager: false  // ✅ IMPORTANTE
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: '^6.8.0',
    eager: false  // ✅ IMPORTANTE
  },
}
```

### 🎉 **Resultado:**

- ✅ Todos os microfrontends carregam corretamente
- ✅ Compartilhamento de dependências funciona
- ✅ Sem erros de "eager consumption"

---

## ❌ Problema: "Cannot find module 'react-router-dom'"

### 🔍 **Sintomas:**

```
ERROR: Cannot find module 'react-router-dom'
Module not found: Error: Can't resolve 'react-router-dom'
```

### 🎯 **Causa:**

Dependência `react-router-dom` não estava instalada nos microfrontends.

### ✅ **Solução:**

1. Adicionada ao `package.json` de cada microfrontend
2. Executado `npm install`
3. Configurada como dependência compartilhada no webpack

---

## ❌ Problema: "Loading script failed (remoteEntry.js)"

### 🔍 **Sintomas:**

```
ERROR: Loading script failed.
(error: http://localhost:3001/remoteEntry.js)
```

### 🎯 **Causa:**

Microfrontends remotos não estavam rodando quando o shell tentou carregá-los.

### ✅ **Solução:**

1. Script sequencial que inicia na ordem correta
2. Verificação de disponibilidade antes de prosseguir
3. Aguarda cada serviço ficar pronto

---

## 🚀 **Scripts de Diagnóstico**

### Verificar Status:

```bash
./check-status.sh
```

### Testar Configuração:

```bash
npm run test-setup
```

### Parar Tudo:

```bash
npm run stop
```

### Iniciar Sequencialmente:

```bash
npm start
```

---

## 📋 **Checklist de Problemas Comuns**

- [ ] Todos os microfrontends estão rodando?
- [ ] As portas 3000, 3001, 3002 estão livres?
- [ ] `react-router-dom` está instalado?
- [ ] Configuração `eager: false` está definida?
- [ ] Arquivos `bootstrap.js` existem?
- [ ] `remoteEntry.js` está acessível?

---

## 🔗 **URLs de Teste**

- **Shell**: http://localhost:3000
- **Auth**: http://localhost:3001
- **Rick & Morty**: http://localhost:3002
- **Auth Remote**: http://localhost:3001/remoteEntry.js
- **Rick & Morty Remote**: http://localhost:3002/remoteEntry.js
