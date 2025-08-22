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

## 3 - Backend For Frontend (BFF)

Eu cheguei a pesquisar e estudar sobre o BFF pois não conhecia e fiquei extremamente interessado em aplicá-lo. Mas não tive tempo de implementá-lo.

Pelo o que entendi, deveria existir um backend core, que iria prover para esses backends menores. Esses, por sua vez, deveriam ser implementados pensando em prover os dados sob medida para para cada microfrontend. Então, cada microfrontend teria seu próprio BFF.

Eu inicialmente cheguei a cogitar fazer um backend só, mas arquiteturado de forma a simular o BFF. Então seria algo como: os controllers funcionariam como os BFF's e os services + restante como o core. Mas, percebi que isso acabaria prejudicando ambos, fazendo com que eu não simulasse em nada um ambiente real. Eu não teria BFF's de fato como devem ser feitos, e também não teria um backend core como deve ser feito.

Então, desisti dessa ideia e comecei a pensar na possibilidade de ter no mesmo repositório um backend principal e vários BFFS menores.

Mas, percebi que isso ainda assim seria extremamente trabalhoso. E quando eu comecei a pensar no backend, ainda faltava muita coisa a ser feita nos Microfrontends e no Design System.

Além disso, havia diversos problemas não resolvidos (ou resolvidos parcialmente / de forma não ideal). E não somente os que estão no [README de Resolução de PRoblemas](./TROUBLESHOOTING.md), mas pequenos probleminhas de configuração que as vezes levavam muitas horas para eu conseguir uma solução e que fosse decente.

Então fiquei receoso com o tempo disponível. Achei que seria muito mais prudente e seguro finalizar bem o que já estava em desenvolvimento antes de tentar implementar o BFF. E, se desse tempo, o backend que eu tinha eu poderia renomear de backend para backend-core e criar os BFFs consumindo ele.

Infelizmente não tive tempo. Essa 1 semana basicamente vivi esse projeto. Estudei exaustivamente sobre microfrontends, todas as melhores práticas possíveis sobre tudo, arquiteturas, etc. Foi um baita aprendizado em relação à todas as áreas. Utilizei até o último minuto para melhorar ao máximo o código que eu já havia feito. Acredito que se eu tivesse mais uns 2 dias, eu conseguiria implementar os BFFs simplificados.
