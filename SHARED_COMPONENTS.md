# 🧩 **Componentes Compartilhados entre Microfrontends**

## 📋 **Resumo das Suas Perguntas**

### ❓ **1. `index.ts` é necessário?**

**SIM**, é **obrigatório** para Module Federation:

```typescript
// index.ts - NECESSÁRIO para Module Federation
import("./bootstrap").catch((err) =>
	console.error("Failed to load bootstrap:", err)
);
export {};
```

**Por quê?** Implementa o "bootstrap pattern" que evita erros de "eager consumption".

### ❓ **2. `index.css` pode ser modularizado?**

**SIM**, você está certo! Criamos componentes com CSS próprio:

```
shared-components/
├── src/components/Button/
│   ├── Button.tsx
│   ├── Button.css  ← Estilos específicos
│   └── index.ts
└── src/components/Card/
    ├── Card.tsx
    ├── Card.css    ← Estilos específicos
    └── index.ts
```

### ❓ **3. Como compartilhar componentes?**

**SIM**, usando Module Federation! Veja como:

## 🏗️ **Arquitetura de Componentes Compartilhados**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shell App     │    │  Auth Micro     │    │ Rick&Morty Micro│
│   (Port 3000)   │    │  (Port 3001)    │    │   (Port 3002)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Shared Components│
                    │   (Port 3003)   │
                    │                 │
                    │ • Button        │
                    │ • Card          │
                    │ • Input         │
                    │ • LoadingSpinner│
                    └─────────────────┘
```

## 🚀 **Como Usar os Componentes Compartilhados**

### **1. Instalar dependências do shared-components:**

```bash
cd shared-components
npm install
```

### **2. Iniciar o servidor de componentes:**

```bash
cd shared-components
npm run dev  # Roda na porta 3003
```

### **3. Usar nos microfrontends:**

#### **No Shell App:**

```typescript
// shell-app/src/components/HomePage.tsx
import React, { Suspense } from "react";

const Button = React.lazy(() => import("sharedComponents/Button"));
const Card = React.lazy(() => import("sharedComponents/Card"));

const HomePage = () => {
	return (
		<div className="p-8">
			<Suspense fallback={<div>Loading...</div>}>
				<Card variant="elevated" padding="lg">
					<h1>Bem-vindo!</h1>
					<Button
						variant="primary"
						onClick={() => alert("Botão compartilhado!")}
					>
						Clique aqui
					</Button>
				</Card>
			</Suspense>
		</div>
	);
};
```

#### **No Auth Microfrontend:**

```typescript
// auth-microfrontend/src/components/Login.tsx
import React, { Suspense } from "react";

const Button = React.lazy(() => import("sharedComponents/Button"));
const Card = React.lazy(() => import("sharedComponents/Card"));

const Login = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Card variant="default">
				<form>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Senha" />
					<Button type="submit" variant="primary" loading={isLoading}>
						{isLoading ? "Entrando..." : "Entrar"}
					</Button>
				</form>
			</Card>
		</Suspense>
	);
};
```

## 🎨 **Componentes Disponíveis**

### **Button**

```typescript
<Button
	variant="primary | secondary | danger | success"
	size="sm | md | lg"
	loading={boolean}
	disabled={boolean}
	onClick={() => {}}
>
	Texto do botão
</Button>
```

### **Card**

```typescript
<Card
	variant="default | elevated | outlined | glass"
	padding="none | sm | md | lg"
	hover={boolean}
	onClick={() => {}}
>
	Conteúdo do card
</Card>
```

## 📦 **Vantagens desta Abordagem**

### ✅ **CSS Modularizado**

- Cada componente tem seu próprio CSS
- Estilos encapsulados e reutilizáveis
- Sem conflitos entre microfrontends

### ✅ **Componentes Compartilhados**

- Um botão = usado em todos os microfrontends
- Consistência visual automática
- Manutenção centralizada

### ✅ **Type Safety**

- TypeScript em todos os componentes
- Intellisense funcionando
- Erros detectados em tempo de compilação

### ✅ **Performance**

- Lazy loading automático
- Componentes carregados sob demanda
- Bundle otimizado

## 🔧 **Configuração Necessária**

### **1. Atualizar webpack.config.js dos microfrontends:**

```javascript
// Adicionar aos remotes:
remotes: {
  // ... outros remotes
  sharedComponents: 'sharedComponents@http://localhost:3003/remoteEntry.js',
}
```

### **2. Criar tipos TypeScript:**

```typescript
// src/types/shared-components.d.ts
declare module "sharedComponents/Button" {
	// ... tipos do Button
}
```

### **3. Simplificar index.css:**

```css
/* Apenas estilos globais básicos */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos específicos do app */
.app-specific-class {
	/* ... */
}
```

## 🎯 **Resultado Final**

- ✅ **CSS modularizado** por componente
- ✅ **Componentes reutilizáveis** entre microfrontends
- ✅ **Manutenção centralizada** de UI
- ✅ **Type safety** completo
- ✅ **Performance otimizada**

**Agora você pode criar um botão uma vez e usar em todos os microfrontends!** 🚀
