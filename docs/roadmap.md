# Roadmap de Desenvolvimento

**Projeto:** Pager
**Versão:** 1.0
**Status:** Em andamento

---

# 1. Objetivo

Este documento estabelece a ordem planejada de evolução do Pager.

O roadmap organiza a implementação em blocos incrementais, permitindo que cada etapa agregue novas capacidades ao sistema de forma controlada, preservando a estabilidade da solução e a rastreabilidade das implementações.

Cada bloco representa uma unidade lógica de evolução funcional, composta por funcionalidades relacionadas entre si e executadas de forma incremental.

---

# 2. Estratégia de Desenvolvimento

O desenvolvimento do Pager segue uma abordagem incremental, orientada por blocos de implementação.

Cada bloco representa uma etapa de evolução funcional do sistema e somente poderá ser iniciado quando as dependências previstas estiverem concluídas.

A execução de cada bloco deverá seguir obrigatoriamente o processo definido em **`workflow.md`**, compreendendo:

* seleção do bloco de desenvolvimento;
* análise de impactos arquiteturais;
* criação de ADR, quando aplicável;
* implementação;
* execução de testes;
* atualização da documentação;
* registro da implementação em `diario.md`;
* atualização do status deste roadmap.

---

# 3. Blocos de Desenvolvimento

## Bloco 0 — Fundação

### Objetivo

Preparar toda a base documental e técnica necessária para o desenvolvimento do Pager.

---

### Fase A — Fundação Documental

#### Objetivo

Consolidar toda a documentação estruturante do projeto.

#### Escopo

* convenções de desenvolvimento;
* requisitos do sistema;
* arquitetura da solução;
* workflow de desenvolvimento;
* roadmap do projeto;
* README do repositório;
* diário de desenvolvimento.

#### Status

🟢 Concluída

---

### Fase B — Fundação Técnica

#### Objetivo

Preparar a infraestrutura inicial da aplicação.

#### Escopo

* ✅ Docker Compose;
* ✅ estrutura do Backend (NestJS);
* ✅ estrutura do Frontend (React);
* ✅ PostgreSQL;
* ✅ Prisma ORM;
* ✅ configuração inicial do ambiente;
* ✅ primeira execução integrada da aplicação.

#### Status

🟢 Concluída

---

## Bloco 1 — Autenticação e Autorização

### Objetivo

Implementar autenticação e autorização da aplicação.

### Escopo

* login;
* autenticação JWT;
* autorização RBAC;
* proteção de rotas.

### Dependências

Bloco 0 concluído.

---

### BL-01.1 — Modelagem de identidade e persistência

**Objetivo**

Preparar o modelo persistente necessário para autenticação.

**Entregas**

* definição dos papéis `STAFF`, `MANAGER` e `ADMIN`;
* definição do modelo `User`;
* definição dos campos de autenticação e estado do usuário;
* definição do enum `UserRole`;
* criação da migration inicial;
* integração do modelo com Prisma.

**Status:** 🟢 Concluído

---

### BL-01.2 — Estrutura inicial do AuthModule

**Objetivo**

Criar a estrutura modular necessária para implementar autenticação.

**Entregas**

* criação do `AuthModule`;
* criação do `AuthService`;
* criação do `LoginDto`;
* preparação da estrutura de controllers, DTOs, services e strategies;
* instalação e configuração das dependências de autenticação;
* configuração do Argon2;
* configuração inicial do JWT.

**Status:** 🟢 Concluído

---

### BL-01.3 — Autenticação JWT

**Objetivo**

Implementar e validar o fluxo completo de autenticação por JWT.

**Entregas**

* validação de credenciais;
* hash e verificação de senhas com Argon2;
* configuração centralizada do JWT;
* `JwtStrategy`;
* `JwtAuthGuard`;
* `POST /api/auth/login`;
* bootstrap do primeiro usuário `ADMIN`;
* seed idempotente;
* `GET /api/auth/me`;
* proteção de rota por JWT.

**Status:** 🟢 Concluído

---

### BL-01.4 — Autorização RBAC

**Objetivo**

Implementar autorização baseada nos papéis definidos para o sistema.

**Entregas**

* `STAFF`;
* `MANAGER`;
* `ADMIN`;
* decorator de roles;
* `RolesGuard`;
* proteção de endpoints por papel;
* diferenciação entre `401 Unauthorized` e `403 Forbidden`.

**Status:** 🟢 Concluído

---

**Validação**

* decorator `@Roles()` implementado;
* `RolesGuard` implementado;
* proteção de endpoint por JWT + role implementada;
* acesso sem JWT validado como `401 Unauthorized`;
* acesso com JWT válido e papel autorizado validado com sucesso;
* diferenciação entre autenticação e autorização validada.

### Status do Bloco

🟢 Concluído

---

## Bloco 2 — Administração

### Objetivo

Implementar os módulos administrativos do sistema.

### Escopo

* usuários;
* áreas.

### Dependências

Bloco 1.

---

### BL-02.1 — Modelagem de Usuários e Áreas

**Objetivo**

Consolidar o modelo persistente necessário para administração de usuários e organização por áreas.

**Entregas**

* modelo `User`;
* papéis `STAFF`, `MANAGER` e `ADMIN`;
* modelo `Area`;
* tipos `SETOR`, `LOCAL` e `EQUIPE`;
* relacionamento N:N entre `User` e `Area`;
* modelo associativo `UserArea`;
* migration inicial;
* validação da estrutura persistente.

**Status:** 🟢 Concluído

---

### BL-02.2 — Bootstrap Administrativo

**Objetivo**

Garantir a existência e a configuração inicial do administrador do sistema.

**Entregas**

* seed idempotente do `ADMIN`;
* criação/reutilização da área `Produção` do tipo `SETOR`;
* associação do `ADMIN` à área `Produção`;
* validação da idempotência do seed;
* validação da associação persistida.

**Status:** 🟢 Concluído

---

### BL-02.3 — Estrutura do UsersModule

**Objetivo**

Criar a estrutura modular responsável pela administração de usuários.

**Entregas**

* `UsersModule`;
* `UsersController`;
* `UsersService`;
* DTOs de usuários;
* integração com `PrismaService`;
* proteção inicial por `ADMIN`.

**Status:** 🟢 Concluído

---

### BL-02.4 — Administração de Usuários

**Objetivo**

Implementar as operações administrativas sobre usuários.

**Entregas**

* cadastro;
* listagem;
* consulta;
* edição;
* alteração de role;
* associação com áreas;
* desativação;
* proteção do último `ADMIN` ativo.

**Status:** 🟢 Concluído

#### BL-02.4.1 — Cadastro de usuário

**Objetivo**

Implementar o cadastro administrativo de usuários.

**Entregas**

* endpoint `POST /api/users`;
* validação dos dados cadastrais;
* validação de email único;
* hash de senha com Argon2;
* associação obrigatória a uma ou mais áreas;
* criação transacional de usuário e associações;
* resposta sem exposição do `passwordHash`;
* proteção por JWT e RBAC.

**Status:** 🟢 Concluído

#### BL-02.4.2 — Listagem e consulta de usuários

**Objetivo**

Implementar a visualização administrativa dos usuários cadastrados.

**Entregas**

* endpoint `GET /api/users`;
* endpoint `GET /api/users/:id`;
* listagem ordenada por nome;
* consulta individual por identificador;
* inclusão das áreas associadas;
* exclusão do `passwordHash` das respostas;
* retorno `404 Not Found` para usuário inexistente;
* proteção por JWT e RBAC.

**Validação**

* listagem de usuários validada com sucesso;
* consulta individual validada com sucesso;
* áreas associadas retornadas corretamente;
* `passwordHash` não exposto;
* usuário inexistente validado como `404 Not Found`;
* acesso sem JWT validado como `401 Unauthorized`.

**Status:** 🟢 Concluído

#### BL-02.4.3 — Edição de usuário

**Objetivo**

Implementar a edição administrativa dos dados permitidos de usuários, incluindo nome, senha, role e associação com áreas.

**Entregas**

* edição do nome;
* alteração de senha;
* alteração de role;
* atualização das áreas associadas;
* manutenção do email como atributo imutável;
* validação de existência das áreas informadas;
* exigência de pelo menos uma área;
* proteção por JWT e RBAC;
* restrição das operações administrativas ao papel `ADMIN`.

**Validação**

* alteração de nome validada com sucesso;
* alteração de senha validada com sucesso;
* tentativa de alteração de email rejeitada;
* alteração de role validada com sucesso;
* área inexistente rejeitada;
* lista de áreas vazia rejeitada;
* usuário inexistente validado como `404 Not Found`;
* acesso sem autenticação validado como `401 Unauthorized`;
* acesso por `STAFF`/`MANAGER` validado como `403 Forbidden`.

**Observação**

A substituição efetiva da associação por uma área diferente não foi validada neste incremento por ainda existir apenas uma área disponível no ambiente de teste. A regra de associação foi, entretanto, validada por meio dos cenários de área inexistente e lista vazia.

**Status:** 🟢 Concluído

#### BL-02.4.4 — Desativação de usuário

**Objetivo**

Implementar a desativação lógica de usuários, preservando seus registros e impedindo o acesso de usuários inativos, sem permitir a remoção do último `ADMIN` ativo.

**Entregas**

* endpoint de desativação de usuário;
* desativação lógica por meio do campo `active`;
* preservação dos dados e associações do usuário;
* rejeição da desativação de usuário já desativado;
* tratamento de usuário inexistente;
* proteção por JWT e RBAC;
* restrição da operação ao papel `ADMIN`;
* proteção do último `ADMIN` ativo.

**Validação**

* desativação de usuário validada com sucesso;
* persistência de `active = false` confirmada no PostgreSQL;
* tentativa de desativação de usuário já desativado validada como `409 Conflict`;
* usuário inexistente validado como `404 Not Found`;
* acesso sem autenticação validado como `401 Unauthorized`;
* tentativa de desativação do último `ADMIN` ativo validada como `409 Conflict`;
* usuário `ADMIN` permaneceu ativo após a tentativa protegida;
* teste específico de `STAFF`/`MANAGER` não executado por ausência de usuário apropriado no ambiente de teste.

**Observação — comportamento de usuário desativado**

Durante a validação integrada foi identificado que a tentativa de login de um usuário desativado retornava a mesma mensagem utilizada para credenciais inválidas.

O comportamento foi corrigido para diferenciar explicitamente o estado de usuário desativado, retornando `401 Unauthorized` com a mensagem:

`Usuário desativado. Procure o administrador caso tenha dúvidas.`

Dessa forma, o fluxo de autenticação diferencia credenciais inválidas de uma conta existente, porém desativada.

**Status:** 🟢 Concluído

---

### BL-02.5 — Administração de Áreas

**Objetivo**

Implementar o gerenciamento das áreas operacionais.

**Entregas**

* cadastro;
* listagem;
* consulta;
* edição;
* gerenciamento dos tipos de área;
* associação de usuários às áreas.

**Status:** 🟡 Em andamento

#### BL-02.5.1 — Estrutura do AreasModule

**Objetivo**

Criar a estrutura modular responsável pela administração de áreas.

**Entregas**

* `AreasModule`;
* `AreasController`;
* `AreasService`;
* integração com `PrismaModule`;
* registro do módulo no `AppModule`;
* proteção inicial por `JwtAuthGuard` e `RolesGuard`.

**Validação**

* compilação TypeScript validada sem erros;
* ESLint validado sem erros;
* inicialização do `AreasModule` confirmada pelo Backend;
* integração com os demais módulos preservada.

Status: 🟢 Concluído

#### BL-02.5.2 — Cadastro de área

**Objetivo**

Implementar o cadastro administrativo de áreas operacionais.

**Entregas**

* endpoint `POST /api/areas`;
* criação de áreas dos tipos `SETOR`, `LOCAL` e `EQUIPE`;
* validação obrigatória do nome;
* validação do tipo de área;
* validação de unicidade da combinação `name + type`;
* tratamento de conflito com `409 Conflict`;
* proteção por JWT e RBAC.

**Validação**

* cadastro de área `SETOR` validado com sucesso;
* cadastro de área `LOCAL` validado com sucesso;
* cadastro de área `EQUIPE` validado com sucesso;
* duplicidade de `name + type` rejeitada com `409 Conflict`;
* combinação de mesmo nome com tipo diferente permitida;
* nome ausente ou vazio rejeitado com `400 Bad Request`;
* tipo inválido rejeitado com `400 Bad Request`;
* acesso sem autenticação rejeitado com `401 Unauthorized`.

Status: 🟢 Concluído

#### BL-02.5.3 — Listagem e consulta de áreas

**Objetivo**

Implementar a visualização administrativa das áreas cadastradas.

**Entregas**

* endpoint `GET /api/areas`;
* endpoint `GET /api/areas/:id`;
* listagem ordenada por tipo e nome;
* consulta individual por identificador;
* tratamento de área inexistente com `404 Not Found`;
* proteção por JWT e RBAC.

**Validação**

* listagem das áreas existentes validada com sucesso;
* ordenação por tipo e nome validada;
* consulta individual validada com sucesso;
* área inexistente validada como `404 Not Found`;
* acesso sem autenticação validado como `401 Unauthorized`.

**Observação — correção de autorização**

Durante a validação integrada da administração foi identificado que o endpoint `GET /api/areas` estava protegido por JWT, porém sem restrição explícita de role.

A regra foi corrigida com a aplicação de `@Roles(UserRole.ADMIN)` no `AreasController`, fazendo com que todas as operações administrativas de áreas sejam restritas ao papel `ADMIN`.

A proteção foi validada com um token `STAFF`, que passou a retornar `403 Forbidden`.

Status: 🟢 Concluído

#### BL-02.5.4 — Edição de área

**Objetivo**

Implementar a edição administrativa das áreas, preservando as regras de unicidade e os tipos permitidos.

**Entregas**

* endpoint `PATCH /api/areas/:id`;
* alteração de nome;
* alteração de tipo;
* alteração simultânea de nome e tipo;
* validação de unicidade da combinação `name + type`;
* tratamento de área inexistente;
* rejeição de corpo sem campos alteráveis;
* proteção por JWT e RBAC.

**Validação**

* alteração somente do nome validada com sucesso;
* alteração somente do tipo validada com sucesso;
* alteração de nome e tipo simultaneamente validada com sucesso;
* conflito de `name + type` validado como `409 Conflict`;
* área inexistente validada como `404 Not Found`;
* corpo vazio validado como `400 Bad Request`;
* tipo inválido validado como `400 Bad Request`;
* acesso sem autenticação validado como `401 Unauthorized`.

Status: 🟢 Concluído

#### BL-02.5.5 — Associação de usuários às áreas

**Objetivo**

Implementar a gestão das associações entre usuários e áreas, utilizando a relação N:N definida no modelo de persistência.

**Entregas**

* criação do `UpdateUserAreasDto`;
* implementação do endpoint `PUT /api/users/:id/areas`;
* substituição integral das áreas associadas ao usuário;
* validação de existência do usuário;
* validação de existência das áreas informadas;
* exigência de pelo menos uma área;
* rejeição de áreas duplicadas;
* operação transacional sobre `UserArea`;
* proteção por JWT e RBAC;
* restrição da operação ao papel `ADMIN`;
* retorno do usuário com suas áreas sem exposição do `passwordHash`.

**Validação**

* substituição de uma área por outra validada com sucesso;
* associação simultânea a múltiplas áreas validada com sucesso;
* lista de áreas vazia validada como `400 Bad Request`;
* UUID inválido validado como `400 Bad Request`;
* área inexistente validada como `400 Bad Request`;
* usuário inexistente validado como `404 Not Found`;
* acesso sem autenticação validado como `401 Unauthorized`;
* teste específico de `STAFF`/`MANAGER` não executado por ausência de usuário apropriado no ambiente de teste.

**Observação**

A relação N:N entre usuários e áreas já estava implementada no modelo `UserArea`, não sendo necessária nova migration para este incremento.

**Status:** 🟢 Concluído

### BL-02 — Administração → usuários e áreas

#### BL-02.4 — Usuários

* **BL-02.4.1 — Estrutura e cadastro de usuários:** concluído.
* **BL-02.4.2 — Listagem e consulta de usuários:** concluído.
* **BL-02.4.3 — Edição de usuários:** concluído.
* **BL-02.4.4 — Desativação de usuários:** concluído.

Validações realizadas:

* cadastro, consulta, edição e desativação de usuários;
* associação N:N entre usuários e áreas;
* restrição de operações administrativas de usuários a `ADMIN`;
* proteção contra desativação do último `ADMIN` ativo;
* comportamento específico para tentativa de autenticação de usuário desativado.

#### BL-02.5 — Áreas

* **BL-02.5.1 — Estrutura do módulo de áreas:** concluído.
* **BL-02.5.2 — Cadastro de áreas:** concluído.
* **BL-02.5.3 — Listagem e consulta de áreas:** concluído.
* **BL-02.5.4 — Edição de áreas:** concluído.
* **BL-02.5.5 — Proteção e autorização do módulo de áreas:** concluído.

Validações realizadas:

* `ADMIN` consegue listar e consultar áreas;
* requisições sem autenticação são rejeitadas com `401 Unauthorized`;
* usuários `STAFF` são rejeitados com `403 Forbidden` nas operações do módulo;
* criação, consulta e alteração de áreas permanecem restritas a `ADMIN`;
* proteção aplicada em nível de `AreasController`, abrangendo todas as rotas administrativas do módulo.

**Status do Bloco 2:** em andamento, com os incrementos de usuários e áreas implementados e validados até esta etapa.

---

### BL-02.6 — Validação da Administração

**Objetivo**

Validar as funcionalidades administrativas e suas regras de autorização.

**Entregas**

* validação de acesso por `ADMIN`;
* validação de acesso negado a `STAFF`;
* validação de acesso negado a `MANAGER`;
* validação das operações de usuários;
* validação das operações de áreas;
* validação da proteção do último `ADMIN` ativo;
* validação dos fluxos de erro;
* validação técnica do backend após os incrementos administrativos.

**Validação**

* `ADMIN` acessando usuários: `200 OK`;
* `STAFF` acessando usuários: `403 Forbidden`;
* `MANAGER` acessando usuários: `403 Forbidden`;
* `ADMIN` acessando áreas: `200 OK`;
* `STAFF` acessando áreas: `403 Forbidden`;
* `MANAGER` acessando áreas: `403 Forbidden`;
* requisições sem JWT: `401 Unauthorized`;
* criação de usuário temporário: `201 Created`;
* persistência do usuário e associação de área confirmadas;
* duplicidade de email: `409 Conflict`;
* cadastro sem áreas: `400 Bad Request`;
* área inexistente no cadastro: `400 Bad Request`;
* DTO inválido: `400 Bad Request`;
* listagem de usuários: `200 OK`;
* consulta individual: `200 OK`;
* usuário inexistente: `404 Not Found`;
* consulta sem autenticação: `401 Unauthorized`;
* alteração de nome: `200 OK`;
* alteração de senha: `200 OK`;
* tentativa de alteração de email rejeitada pelo DTO: `400 Bad Request`;
* alteração de role: `200 OK`;
* substituição de áreas: `200 OK`;
* associação de múltiplas áreas: `200 OK`;
* lista de áreas vazia: `400 Bad Request`;
* UUID de área inválido: `400 Bad Request`;
* área inexistente com UUID válido: `400 Bad Request`;
* alteração de áreas sem autenticação: `401 Unauthorized`;
* alteração de áreas por `STAFF`: `403 Forbidden`;
* alteração de áreas por `MANAGER`: `403 Forbidden`;
* desativação de usuário: `200 OK`;
* login de usuário desativado: `401 Unauthorized`;
* tentativa de desativação do último `ADMIN` ativo: `409 Conflict`;
* atualização de usuário inexistente: `404 Not Found`;
* desativação de usuário inexistente: `404 Not Found`;
* alteração de áreas de usuário inexistente: `404 Not Found`;
* `npm run build`: concluído com sucesso;
* `npx eslint src`: concluído com código de saída `0`;
* `git diff --check`: concluído sem apontamentos;
* working tree final limpo após o commit técnico.

**Ajuste técnico identificado durante a validação**

O lint inicialmente apontou problemas no teste padrão `app.controller.spec.ts` e nos arquivos gerados pelo Prisma. Como os arquivos `src/generated/prisma/**` são artefatos gerados e o teste padrão não fazia parte do escopo desta validação, o ESLint foi ajustado para ignorar esses caminhos.

O ajuste foi versionado no commit:

`24a6708 — chore: ajustar lint do backend`

Após o ajuste, `npx eslint src` foi executado com sucesso (`ESLINT_EXIT_CODE=0`).

**Status:** 🟢 Concluído

---

### Status do Bloco

🟢 Concluído

---

## Bloco 3 — Demandas

### Objetivo

Implementar o núcleo operacional do Pager.

### Escopo

* criação de demandas;
* edição;
* atribuição de responsável;
* prioridade;
* andamento;
* arquivamento.

### Dependências

Bloco 2.

### Demand — Núcleo inicial

* [x] Modelagem da entidade `Demand`
* [x] Níveis de urgência: `NENHUMA`, `BAIXA`, `MÉDIA`, `ALTA` e `CRÍTICA`
* [x] Identificador operacional sequencial no formato `DEM-000001`
* [x] Relação entre demandas e áreas
* [x] Estrutura inicial de histórico da demanda
* [x] CRUD de demandas
* [x] Validação de pelo menos uma área por demanda
* [x] Validação de existência das áreas informadas
* [x] Edição parcial de demanda
* [x] Autenticação obrigatória nos endpoints de demanda
* [x] Autorização por perfil para operações de demanda
* [x] Fechamento de demanda
* [x] Arquivamento de demanda
* [x] Regras de ciclo de vida entre fechamento e arquivamento
* [x] Validação de `STAFF`, `MANAGER` e `ADMIN` no arquivamento
* [x] Validação de build e lint
* [x] Validação funcional dos endpoints implementados

### Regras de ciclo de vida validadas

* [x] demanda aberta pode ser fechada;
* [x] demanda já fechada não pode ser fechada novamente;
* [x] demanda fechada pode ser arquivada;
* [x] demanda já arquivada não pode ser arquivada novamente;
* [x] demanda arquivada não pode ser fechada;
* [x] demanda aberta não pode ser arquivada.

### Estado atual do domínio

O núcleo inicial de Demand encontra-se implementado e validado, incluindo persistência, CRUD, associação com áreas, identificador sequencial, autenticação, autorização, fechamento e arquivamento.

As regras de ciclo de vida entre fechamento e arquivamento foram validadas, incluindo a rejeição do arquivamento de demandas ainda abertas.

A persistência da atribuição de responsável foi consolidada, incluindo a relação entre `Demand` e `User`, o campo `responsibleId`, a chave estrangeira para `users`, a relação nomeada `DemandResponsible` e o índice sobre `responsibleId`.

As operações de gerenciamento do responsável também foram implementadas e validadas, contemplando atribuição, troca e remoção de responsável, com controle de autorização e restrições de ciclo de vida.

### Próximos incrementos

* [x] atribuição de responsável;
* [x] troca de responsável;
* [x] remoção de responsável;
* [x] definição e implementação do andamento/status operacional;
* [ ] consolidação das regras de alteração de urgência/prioridade;
* [ ] integração do histórico com as alterações estruturais;
* [ ] validação consolidada das novas regras do domínio.

### BL-03.3 — Gerenciamento do responsável

#### Objetivo

Implementar a atribuição e o gerenciamento do responsável operacional da demanda.

#### Entregas

* relação entre demanda e usuário responsável;
* atribuição de responsável;
* troca de responsável;
* remoção de responsável;
* validação de existência do responsável;
* validação de usuário ativo;
* autorização por perfil;
* restrições para demandas fechadas e arquivadas;
* retorno do responsável nas consultas;
* persistência das alterações;
* validação funcional das operações.

#### BL-03.3.1 — Relação Demand ↔ User

##### Objetivo

Consolidar a estrutura persistente necessária para representar o usuário responsável por uma demanda.

##### Implementações

* utilização do campo `responsibleId` em `Demand`;
* relacionamento entre `Demand` e `User`;
* relacionamento inverso `User.responsibleDemands`;
* definição explícita da relação Prisma como `DemandResponsible`;
* utilização de `ON DELETE SET NULL` na relação com o usuário responsável;
* índice sobre `responsibleId`;
* manutenção das migrations já existentes para a persistência do responsável.

##### Resultado

O BL-03.3.1 foi concluído com sucesso.

A camada de persistência está preparada para representar o responsável atual da demanda.

#### BL-03.3.2 — Gerenciamento do responsável

##### Objetivo

Implementar as operações de atribuição, troca e remoção do responsável da demanda.

##### Implementações

* `PATCH /api/demands/:id/responsible` para atribuição e troca;
* `DELETE /api/demands/:id/responsible` para remoção;
* validação de existência da demanda;
* validação de existência do usuário responsável;
* rejeição de usuário responsável desativado;
* proteção das operações por `JwtAuthGuard` e `RolesGuard`;
* autorização para `ADMIN` e `MANAGER`;
* rejeição de `STAFF` com `403 Forbidden`;
* rejeição de requisições sem autenticação com `401 Unauthorized`;
* bloqueio da alteração de responsável em demandas fechadas;
* bloqueio da alteração de responsável em demandas arquivadas;
* retorno do responsável utilizando somente campos públicos e seguros;
* persistência das alterações no PostgreSQL.

##### BL-03.3.2.1 — Atribuição

**Status:** 🟢 Concluído

Foram validados:

* `ADMIN` atribuindo responsável: `200 OK`;
* `MANAGER` atribuindo responsável: `200 OK`;
* `STAFF` tentando atribuir: `403 Forbidden`;
* requisição sem JWT: `401 Unauthorized`;
* usuário inexistente: `404 Not Found`;
* usuário desativado: `400 Bad Request`;
* demanda fechada: `400 Bad Request`;
* demanda arquivada: `400 Bad Request`;
* persistência do `responsibleId` no PostgreSQL;
* retorno do responsável na resposta;
* ausência de `passwordHash` na resposta.

##### BL-03.3.2.2 — Troca de responsável

**Status:** 🟢 Concluído

A troca utiliza o mesmo endpoint de atribuição:

`PATCH /api/demands/:id/responsible`

Foram validados:

* `MANAGER` substituindo o responsável atual: `200 OK`;
* persistência do novo `responsibleId`;
* consulta posterior retornando o novo responsável;
* confirmação direta da alteração no PostgreSQL;
* segunda troca de responsável validada com sucesso;
* manutenção das restrições de autorização e ciclo de vida.

##### BL-03.3.2.3 — Remoção de responsável

**Status:** 🟢 Concluído

Foi implementado:

`DELETE /api/demands/:id/responsible`

Foram validados:

* `ADMIN` removendo responsável: `200 OK`;
* `MANAGER` removendo responsável: `200 OK`;
* `responsibleId` retornando para `NULL`;
* `responsible` retornando `null`;
* persistência de `NULL` confirmada no PostgreSQL;
* `STAFF` rejeitado com `403 Forbidden`;
* requisição sem autenticação rejeitada com `401 Unauthorized`;
* demanda inexistente rejeitada com `404 Not Found`;
* demanda fechada rejeitada com `400 Bad Request`;
* demanda arquivada rejeitada com `400 Bad Request`.

Durante a validação foi identificado que uma demanda arquivada também possui `closedAt`. A ordem das verificações foi ajustada para que o estado arquivado seja tratado antes do estado fechado, garantindo a mensagem específica:

`Não é possível remover o responsável de uma demanda arquivada.`

##### Validação técnica

Após a implementação e correção das regras:

* `npm run build`: concluído com sucesso;
* `npx eslint src`: concluído com código de saída `0`;
* `git diff --check`: concluído sem apontamentos.

##### Resultado

O BL-03.3 foi concluído com sucesso.

O domínio de Demand possui agora o gerenciamento completo do responsável operacional, incluindo atribuição, troca e remoção, com autorização por perfil, validação do estado do usuário e restrições de ciclo de vida.

**Próximo incremento:** BL-03.4 — Status/Andamento operacional.

### Status

🟢 Concluído

### BL-03.4 — Status/Andamento operacional

**Objetivo:** implementar o fluxo operacional da demanda por meio de status explícitos, com transições controladas e regras de autorização compatíveis com os papéis existentes.

**Implementação:**

* criação do enum persistente `DemandStatus`;
* inclusão do campo `status` em `Demand`, com `NOVA` como estado inicial;
* criação do DTO `UpdateDemandStatusDto`, com validação por enum;
* criação do endpoint `PATCH /api/demands/:id/status`;
* definição do fluxo operacional:
  * `NOVA → TRIAGEM`;
  * `TRIAGEM → RESPONSAVEL_ATRIBUIDO`;
  * `RESPONSAVEL_ATRIBUIDO → EM_ANDAMENTO`;
  * `EM_ANDAMENTO → CONCLUSAO_SINALIZADA`;
  * `CONCLUSAO_SINALIZADA → ARQUIVADA`;
* rejeição de transições fora da sequência definida;
* exigência de responsável para avançar para `RESPONSAVEL_ATRIBUIDO`;
* restrição das etapas de triagem/atribuição e arquivamento aos papéis `MANAGER` e `ADMIN`;
* restrição do andamento e da sinalização de conclusão ao responsável atual;
* tratamento de `ARQUIVADA` como estado terminal;
* ao arquivar via fluxo de status, sincronização de `archived = true` e definição de `closedAt` quando necessário.

**Validação:**

* build e lint do backend aprovados;
* criação de demanda iniciando em `NOVA`;
* fluxo completo `NOVA → TRIAGEM → RESPONSAVEL_ATRIBUIDO → EM_ANDAMENTO → CONCLUSAO_SINALIZADA → ARQUIVADA` validado;
* tentativa de avançar para `RESPONSAVEL_ATRIBUIDO` sem responsável rejeitada;
* tentativa de alteração do andamento por usuário que não é o responsável rejeitada;
* tentativa de alterar demanda arquivada rejeitada;
* transições inválidas intermediárias e retrocessos rejeitados;
* persistência dos estados validada diretamente no PostgreSQL.

**Observação de compatibilidade:**

Os endpoints legados de `/close` e `/archive` permanecem preservados neste incremento. Eles ainda operam sobre `closedAt` e `archived` sem convergência automática completa com `status`. A consolidação dessas regras fica para um incremento complementar, evitando alteração ampla do comportamento já validado.

**Status:** 🟢 Concluído

### Status do Bloco

🟡 Em andamento

---

## Bloco 4 — Comunicação

### Objetivo

Implementar os mecanismos de comunicação operacional.

### Escopo

* comentários;
* histórico;
* notificações;
* comunicação em tempo real via WebSocket.

### Dependências

Bloco 3.

### Status

⚪ Não iniciado

---

## Bloco 5 — Operação

### Objetivo

Implementar os recursos de acompanhamento operacional.

### Escopo

* dashboard;
* indicadores;
* filtros;
* consultas.

### Dependências

Bloco 4.

### Status

⚪ Não iniciado

---

## Bloco 6 — Qualidade

### Objetivo

Preparar a primeira versão estável do sistema.

### Escopo

* testes;
* refatorações;
* otimizações;
* revisão da documentação.

### Dependências

Bloco 5.

### Status

⚪ Não iniciado

---

# 4. Critérios de Conclusão

Um bloco será considerado concluído quando:

* todas as funcionalidades previstas em seu escopo estiverem implementadas;
* os testes correspondentes forem executados com sucesso;
* a documentação afetada estiver atualizada;
* eventuais ADRs necessários tiverem sido registrados;
* o `diario.md` registrar a conclusão da implementação;
* o status deste roadmap refletir a conclusão do bloco.

---

# 5. Evoluções Futuras

As funcionalidades abaixo representam possibilidades de evolução do Pager para versões posteriores e não fazem parte do escopo atual do roadmap.

* integração com Google Drive;
* aplicativo móvel;
* relatórios avançados;
* integrações externas;
* recursos baseados em Inteligência Artificial.
