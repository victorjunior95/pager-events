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
* validação dos fluxos de erro.

**Status:** 🟡 Em andamento

---

### Status do Bloco

🟡 Em andamento

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

### Status

⚪ Não iniciado

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
