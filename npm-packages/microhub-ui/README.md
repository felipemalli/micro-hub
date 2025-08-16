# @microhub-ui/components

Uma biblioteca simples e eficiente de componentes UI reutilizáveis para microfrontends, construída com React, TypeScript e Tailwind CSS.

## 🚀 Características

- **TypeScript First**: Totalmente tipado para melhor experiência de desenvolvimento
- **Tailwind CSS**: Estilização utilitária e customizável
- **Testes**: Cobertura com Jest e Testing Library
- **Tree Shaking**: Bundle otimizado para produção
- **Acessibilidade**: Componentes seguem padrões WCAG
- **Microfrontends Ready**: Otimizado para arquiteturas de microfrontends

## 📦 Instalação

```bash
npm install @microhub-ui/components
# ou
yarn add @microhub-ui/components
# ou
pnpm add @microhub-ui/components
```

## 🎯 Uso Básico

```tsx
import { Button } from "@microhub-ui/components";

function App() {
	return (
		<div>
			<Button
				variant="primary"
				size="md"
				onClick={() => console.log("Clicked!")}
			>
				Clique aqui
			</Button>
		</div>
	);
}
```

## 📚 Componentes Disponíveis

### Button

Componente de botão versátil com múltiplas variantes e estados.

```tsx
import { Button } from '@microhub-ui/components';

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Estados
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Com ícones
<Button startIcon={<Icon />} endIcon={<Icon />}>
  With Icons
</Button>

// Largura total
<Button fullWidth>Full Width</Button>
```

#### Props do Button

| Prop        | Tipo                                                                       | Padrão      | Descrição                       |
| ----------- | -------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Variante visual do botão        |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                     | `'md'`      | Tamanho do botão                |
| `loading`   | `boolean`                                                                  | `false`     | Estado de carregamento          |
| `disabled`  | `boolean`                                                                  | `false`     | Estado desabilitado             |
| `fullWidth` | `boolean`                                                                  | `false`     | Ocupa toda a largura disponível |
| `startIcon` | `ReactNode`                                                                | -           | Ícone antes do texto            |
| `endIcon`   | `ReactNode`                                                                | -           | Ícone após o texto              |
| `onClick`   | `(event: MouseEvent) => void`                                              | -           | Função de clique                |
| `type`      | `'button' \| 'submit' \| 'reset'`                                          | `'button'`  | Tipo do botão HTML              |
| `className` | `string`                                                                   | -           | Classes CSS adicionais          |
| `testId`    | `string`                                                                   | -           | ID para testes                  |

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Configuração

```bash
# Clone o repositório
git clone <repository-url>
cd microhub-ui

# Instale as dependências
npm install

# Execute os testes
npm run test

# Faça o build
npm run build
```

### Scripts Disponíveis

- `npm run build` - Constrói o package para produção
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica os tipos TypeScript

### Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/              # Custom hooks
├── types/              # Definições de tipos
├── utils/              # Funções utilitárias
├── styles/             # Estilos globais
└── index.ts           # Ponto de entrada principal
```

## 🎨 Customização

### Tailwind CSS

O package usa Tailwind CSS para estilização. Você pode customizar o tema editando o arquivo `tailwind.config.js`:

```js
module.exports = {
	theme: {
		extend: {
			colors: {
				primary: {
					// Suas cores personalizadas
				},
			},
		},
	},
};
```

### CSS Customizado

Para estilos mais específicos, você pode sobrescrever as classes CSS:

```css
.microhub-component {
	/* Seus estilos customizados */
}
```

## 🧪 Testes

O projeto usa Jest e Testing Library para testes:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test -- --coverage
```

## 📖 Exemplo de Uso

Veja o arquivo `example.js` para exemplos práticos de como usar os componentes.

## 🚀 Build e Publicação

```bash
# Build para produção
npm run build

# Publicar no npm (após build)
npm publish
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
