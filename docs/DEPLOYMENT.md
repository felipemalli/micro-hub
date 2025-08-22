# Execução detalhada.

## Microfrontends Estáticos e Backend Docker

Para os microfrontends optei por não utilizar Docker para que eles sejam estáticos para simplificar o deploy e reduzir custos. Assim, pude realizar o deploy deles no S3. Já no backend utilizei Docker para garantir reprodutibilidade do ambiente, isolamento de dependências e facilitar integração com pipelines de CI/CD, uma possível integração futura com API Gateway e orquestradores como Kubernetes.

## Frontend

### Microfrontend de Autenticação

Microfrontend principal:

```
http://localhost:3000/
```

Microfrontend de Autenticação:

```
http://localhost:3001/auth
```

Microfrontend de consumo da API Rick and Morty:

```
http://localhost:3002/rickmorty
```

## Backend

API:

```
http://localhost:4000/api
```

Documentação:

```
http://localhost:4000/docs#/
```

## NPM Package

O NPM Package que foi feito exclusivamente para esse projeto está publicado [aqui](https://www.npmjs.com/package/@felipemalli-libs/microhub-ui`).
