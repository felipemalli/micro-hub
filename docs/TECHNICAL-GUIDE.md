# Guia Técnico

Nessa seção, vou explicar como funciona o projeto.

## Backend

### Cache com Redis

Implementei um sistema de cache bem simples com Redis para a busca de usuário

![Imagem do Redis](images/backend-cache.png)
Exemplo com findById.

Verifica o cache primeiro. Se não está no cache, busca no banco. Se achou, adiciona no cache.

As outras requisições são tratadas de forma parecida. O prazo de cache é de 5 minutos.

### JWT Guard e Strategy

No Nest, os guards são classes que implementam a função `canActivate`. Eles são responsáveis por verificar se o usuário tem permissão para acessar uma rota.

![Imagem do pacote NPM](images/backend-jwt-guard.png)

## Microfrontends

### Tratamento de erros

O Error Boundary foi implementado com o uso do pacote 'react-error-boundary'. A ideia foi criar um componente que seja capaz de ser utilizado em qualquer contexto.

Acredito que o ideal seria ele estar em uma lib própria de utilitários de frontend (NPM Package) para ser reutilizado em outros projetos junto com outros utilitários.
No caso desse projeto, o código do Error Boundary é o mesmo no projeto `auth-microfrontend` e `rick-morty-microfrontend`.

Exemplo de uso básico:

![Imagem do error boundary](images/frontend-error-wrap.png)

É possível customizá-lo completamente. Segue um exemplo de como isso pode ser feito:

![Imagem do error boundary-2](images/frontend-error-wrap-2.png)

O resetKeys é uma propriedade do react-error-boundary que recebe um array de valores que, quando algum deles é alterado, reseta o erro.

A implementação do ErrorBoundary é bem simples e direta, segue o código real algumas explicações:

![Imagem do error fallback](images/frontend-error-boundary.png)

O errorLogger é um objeto que é responsável por capturar os erros e enviar para o console (em desenvolvimento) e, em produção, para algum outro serviço de monitoramento (como Sentry, LogRocket, etc). Não cheguei a implementar essa integração, mas a forma de integrar isso é bem simples:

![Imagem do error Logger](images/frontend-error-logger.png)

O ErrorBoundary também recebe um fallbackComponent por padrão, que é um componente que criei que segue uma estrutura parecida com o do DataErrorFallback da penúltima imagem.

A visualização do ErrorFallback padrão desse projeto é a seguinte:

![Imagem do error ErrorFallback](images/frontend-error-box-close.png)

![Imagem do error ErrorFallback](images/frontend-error-box-open.png)

Os detalhes técnicos aparecem somente para desenvolvedores e mostram o erro e o stack trace para debug.

Mas, apenas envolver o componente principal com ErrorBoundary não é suficiente para capturar erros assíncronos.
Por isso, foi necessário criar um hook para capturar os erros assíncronos. Segue o código com um exemplo de uso:

![Imagem do hook useAsyncError](images/frontend-use-async-error.png)

Como pode ser visto, o react-error-boundary já possui um hook para invocar o ErrorBoundary. Então a implementação é bem simples.

Dessa forma, os erros são lidados de forma consistente em qualquer contexto.

### Histórico de navegação com History Proxy

### Autenticação com JWT

### Interceptação de requisições

### Microfrontend de Autenticação

### Criação do env.d.ts

Criei arquivo env.d.ts em todos os microfrontends para evitar baixar o @types/node apenas para o process.env.
O @types/node é um pacote relativamente pesado que aumentaria o bundle. E também traria tipagens inconsistentes com o que funciona no browser.

![Imagem do env.d.ts](images/frontend-env-d-ts.png)

## NPM Package

Para facilitar a visualização dos componentes, descobri algo chamado [Storybook](https://storybook.js.org/). Mas achei que precisaria de mais tempo para estudar pois nunca utilizei, então resolvi não utilizar e fiz uma documentação mais básica.

### Componentes do Design System

A implementação foi feita seguindo o padrão do Stencil para a criação de Web Components. Tentei fazer o mais simples possível e que fosse funcional. Claro que, em um projeto real, há muito o que melhorar e esses arquivos ficariam bem mais complexos.

A seguir, ilustrando o código do botão (implementação, testes e CSS) para exemplificar a implementação de um componente do Design System:

```bash
core-button/
├── core-button.tsx
├── core-button.css
└── core-button.spec.ts
```

![Imagem do botão core-button](images/npm-package-core-button-tsx.png)

![Imagem do botão core-button](images/npm-package-core-button-css.png)

![Imagem do botão core-button](images/npm-package-core-button-test.png)

### Export com Stencil para React

Utilizei o `@stencil/react-output-target` para transformar os Web Components produzidos pelo Stencil em Componentes React. O motivo está [aqui](./TROUBLESHOOTING.md#21---problema-de-compartilhamento-npm-package--stencil-com-microfrontends).

> O Stencil também possui bibliotecas oficiais para exportar no formato específico de cada framework (Angular, Vue, etc).

Ele armazena os Componentes React em formato TypeScript numa pasta `react/` na raiz do projeto.

Como o Webpack não conseguiu processar diretamente o código TypeScript, decidi compilá-lo para JavaScript e separar os arquivos de tipagem. Assim, os microfrontends importam o Javascript sem precisar de uma configuração no webpack especial (sem precisar transpilar TS de node_modules).

![Imagem do script tsc](images/npm-package-tsc.png)

A vantagem é que os microfrontends importam o Javascript sem precisar de uma configuração no webpack especial (sem precisar transpilar TS de node_modules). Ou seja, simplifica o lado dos microfrontends.

Em resumo:

```bash
microhub-ui/
├── react/
│   ├── components.ts
│   └── index.ts
├── react-dist/
│   ├── components.d.ts
│   ├── components.js
│   ├── index.d.ts
│   └── index.js
├── ...
```

`react/`

- Código fonte dos proxies;
- Gerado automaticamente pelo Stencil;
- Contém import type, JSX, etc.

`react-dist/`

- Código compilado dos proxies;
- Pronto para consumo direto;
- JS + .d.ts separados.

Ou seja, nos microserviços de React funcionará como um React Component <CoreButton />, mas por baixo é um Web Component universal <core-button>, que funcionará em Vue, Angular, etc. É como um Adapter Pattern entre Web Components e React.

![Imagem do uso do core-button](images/npm-package--core-button-usage.png)
Uso dos componentes do NPM Package `microhub-ui`.

### Tipografia

Para utilizar os Web Components, é necessário importar o CSS do Stencil, a segunda linha da imagem abaixo.

![Imagem da importação do microhub-ui](images/frontend-import-lib.png)

Eu não estava satisfeito com precisar definir para qualquer tag HTML a fonte, cor e o tamanho da fonte e ainda me preocupar em padronizar entre todos os microfrontends. Então, resolvi definir no CSS da lib que eu já havia criado.

![Imagem do global.css](images/npm-package-global-css.png)

Importante ressaltar que essas estilizações vindas do NPM Package podem e devem ser sobrescritas de acordo com as situações, elas são apenas um ponto de partida para a padronização do sistema.

Veja um exemplo de uso em que já há estilizações padrão, mas algumas classes foram sobrescritas (como cor e tamanho no parágrafo):

![Imagem do exemplo de uso da tipografia](images/npm-package-example-typography.png)

Em um cenário real, eu provavelmente implementaria uma forma de importar apenas partes específicas da UI do NPM Package, mas para esse projeto foi suficiente.
