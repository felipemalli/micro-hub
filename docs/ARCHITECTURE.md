# Decisões Arquiteturais

## 1- Microfrontend: Module Federation

A princípio fiquei receoso de escolher Module Federation porque pensando em escala, todos os microfrontends ficariam acoplados ao Webpack. Além disso, [não há — e não parece que haverá — suporte oficial às versões mais recentes do Next.js](https://module-federation.io/practice/frameworks/next/index.html). Isso significa abrir mão de SSR/ISR com o framework mais consolidado do ecossistema React. Embora existam alternativas, elas me pareceram menos confiáveis pensando a longo prazo.

**Longevidade** <br>
Por outro lado, rapidamente percebi que o Module Federation é, de longe, a solução de microfrontends mais utilizada, com muito mais comunidade do que o segundo colocado (Single-SPA). Além disso, o Webpack continua sendo o bundler mais adotado no mercado, direta ou indiretamente (CRA, Next.js, Angular CLI, etc.).

**Benefício técnico chave** <br>
Diferente do Single-SPA, que orquestra microapps inteiros, o Module Federation permite compartilhar módulos individuais em runtime com inclusive reaproveitamento de dependências. Isso reduz duplicação de código, evita múltiplas versões pesadas de dependências.

**Curva de aprendizado** <br>
Também é importante destacar que eu não tinha experiência prévia com microfrontends e teria pouco tempo para estudar. O fato de o Module Federation possuir muito mais conteúdo que qualquer outra tecnologia, exemplos e solução de problemas conhecidos foi essencial para viabilizar a entrega no prazo e definir minha decisão.

## 2- Componentes UI reutilizáveis (Design System)

Inicialmente fiz um modelo básico com 2 microfrontends como pedido, mas, rapidamente percebi que componentes reutilizáveis seriam um problema para padronização.
Meu primeiro pensamento foi fazer outro microfrontend chamado `shared-components` _(e eu fiz, é meu segundo commit)_. Mas a cada componente que eu fosse utilizar, teria que ser com Lazy loading (em runtime). <br><br>Embora estivesse funcionando, não me pareceu certo pois eram componentes muito simples, então fui pesquisar à respeito.
E descobri que de fato não era uma boa prática, que isso poderia causar inconsistências visuais em produção, piorar desempenho e outros bugs.

### 2.1 - NPM Packages vs Monorepo Lib (sem publicar no NPM)

> O uso do Monorepo Lib me direcionaria para uma solução Monorepo no geral, deixando de utilizar Module Federation. Só percebi isso posteriormente. Mesmo que ainda pudesse ser considerado microfrontends dependendo da forma que fosse feito, isso poderia ser considerado um desvio do objetivo do projeto de trabalhar com microfrontends. Mantive essa parte da documentação pois é algo que cogitei no momento e deve ser considerado em um cenário real.

Então após algumas pesquisas me deparei com 2 alternativas que me chamaram mais atenção:

- Monorepo Lib: proporciona reuso de código, mas exige um CI/CD bem estruturado (Nx, Turborepo, Bazel…) para evitar conflitos e builds demorados, visto que ficaria tudo no mesmo repositório. Considerando o tempo limitado do projeto e a complexidade adicional de aprender e configurar alguma dessas ferramentas, poderia comprometer o restante da entrega.
- NPM Packages: o risco principal é o “Dependency Hell”, que pode ser mitigado com testes automatizados e ferramentas como Dependabot ou Renovate. Mas o benefício é que oferece maior autonomia para cada equipe lidar com seu microfrontend, uma vez que são repositórios git completamente separados (em um cenário real).

Embora eu não fosse resolver o problema das dependências nesse projeto com soluções automatizadas, percebi que alcançaria uma configuração mais próxima da ideal dentro do prazo com o NPM Packages.
Em um cenário real, eu estudaria mais a fundo sobre como funcionaria na prática um monorepo lib para ter certeza absoluta dessa decisão e também sobre outras estruturas, antes de dar minha opinião para a equipe.

## 3- Arquiteturas dos Microfrontends

### Arquitetura do NPM Package

### Arquitetura do Microfrontend Principal

### Arquitetura do Microfrontend de autenticação

Como eu havia pouco tempo e esse microfrontend tinha pouco código, decidi manter a arquitetura do auth-microfrontend bem básica. É claro que será necessário refatorar esse microfrontend, pois é possível imaginar ele expandindo para a parte de “Esqueceu a senha”, “Autenticação em 2 fatores”, “Configurar PIN”, “Editar conta”... etc.

### Arquitetura do Microfrontend que consome uma API externa

A arquitetura do microfrontend que consome uma API externa `rick-morty-microfrontend` foi pensada exclusivamente no consumo dessa API.

Então, criei um diretório features que em cada pasta filha incluirá uma seção da API apresentada. No caso dessa entrega, apenas criei a parte de personagens (diretório characters), mas a estrutura foi feita pensando no potencial em que é consumida a API Externa. A API do rick and morty, especificamente, existe uma parte que expõem dados de localização e episódios, por exemplo. Poderiam ser uma outras sessões no frontend. E assim, consequentemente, outro diretório na arquitetura.

### Arquitetura do Backend

Para o backend, optei por utilizar o NestJS, pois é um framework muito utilizado no ambiente profissional. Ele abstrai bastante coisa, mas na parte técnica da documentação explicarei algumas delas como estão funcionando.

Utilizei o TypeORM para o mapeamento de entidades e o Redis para o cache.

A estrutura do backend é dessa forma:

```bash
backend/src/
├── app.module.ts           # Módulo raiz da aplicação
├── main.ts                 # Ponto de entrada da aplicação
├── auth/                   # Módulo de autenticação
├── users/                  # Módulo de gerenciamento de usuários
├── common/                 # Módulo global com utilitários
├── cache/                  # Módulo de cache (Redis)
├── config/                 # Configurações da aplicação
└── entities/               # Modelos de dados (TypeORM)
```

![Imagem da estrutura do backend](images/backend-folder-structure.png)

Ou seja, é separado por módulos. E em cada módulo, é aplicado o padrão Model-Service-Controller.

Cogitei utilizar Clean Architecture, mas o projeto é muito pequeno para isso.

Além disso, outros diretórios utilitários foram adicionados para manter o código limpo, organizado e escalável.

#### Resumo

##### Documentação API

- Swagger Integration;
- Endpoint: /docs;
- Tags: Organização por módulos;
- Auth: Bearer token support;
- Schemas: Auto-geração a partir de DTOs.

##### Containerização

- Docker Support.

##### Design Patterns Implementados

- Dependency Injection: Injeção de dependências nativa do NestJS;
- Repository Pattern: TypeORM repositories;
- Strategy Pattern: Passport strategies (JWT);
- Decorator Pattern: Guards, interceptors, pipes;
- Factory Pattern: Configurações assíncronas;
- Observer Pattern: RxJS para interceptors.

##### Características Principais

- Modularidade: Cada funcionalidade em módulo separado
- Escalabilidade: Estrutura preparada para crescimento
- Testabilidade: Injeção de dependências facilita testes
- Type Safety: TypeScript em toda a aplicação
- Performance: Cache Redis integrado
- Segurança: JWT + Guards + Validation
- Observabilidade: Logging estruturado + Health checks
  Esta estrutura segue as melhores práticas do NestJS e permite fácil manutenção, teste e escalabilidade da aplicação.
