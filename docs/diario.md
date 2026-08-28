# Diário de Implementação

## 2026-07-23

### Estrutura inicial do projeto

#### Objetivo

Criar a estrutura inicial do repositório.

#### Implementações

- criação da estrutura de diretórios;
- criação dos documentos iniciais;
- inicialização do Git.

#### Resultado

Projeto preparado para receber a documentação e a implementação.

---

## 2026-07-24

### Convenções de Desenvolvimento

#### Objetivo

Definir o padrão oficial de desenvolvimento do projeto.

#### Implementações

- criação do arquivo `docs/conventions.md`;
- definição das convenções de nomenclatura;
- definição das convenções de Git;
- definição das convenções de banco de dados.

#### Resultado

As convenções oficiais do projeto foram estabelecidas.

---

## 2026-07-29

### Especificação Inicial de Requisitos

#### Objetivo

Documentar a primeira versão dos requisitos do Pager.

#### Implementações

- visão geral;
- escopo;
- atores;
- conceitos do domínio;
- requisitos funcionais;
- requisitos não funcionais;
- princípios do produto;
- premissas operacionais.

#### Observação

O documento de requisitos encontra-se em sua versão inicial e será evoluído conforme novos requisitos forem descobertos.

---

## 2026-07-30

### Consolidação da Documentação Estruturante

#### Objetivo

Consolidar a documentação responsável por orientar a arquitetura, o processo de desenvolvimento e o planejamento incremental do projeto.

#### Implementações

* elaboração da primeira versão completa de `docs/arquitetura.md`;
* definição da arquitetura modular da solução;
* formalização da organização física do projeto e dos componentes da aplicação;
* definição da estratégia de comunicação entre Frontend, Backend e Banco de Dados;
* definição da estratégia de autenticação, autorização, persistência e comunicação em tempo real;
* elaboração do arquivo `docs/workflow.md`;
* formalização do processo oficial de desenvolvimento do projeto;
* definição do ciclo incremental de implementação;
* definição dos critérios para atualização da documentação e criação de ADRs;
* revisão e atualização do arquivo `docs/roadmap.md`;
* reorganização do Bloco 0 em Fundação Documental e Fundação Técnica;
* alinhamento do roadmap ao workflow oficial do projeto;
* definição dos critérios de conclusão dos blocos de desenvolvimento.

#### Resultado

A documentação estruturante do Pager foi consolidada.

O projeto passa a possuir uma base documental consistente, composta pelas convenções de desenvolvimento, especificação de requisitos, arquitetura da solução, workflow de engenharia e roadmap de evolução.

Com essa etapa concluída, encerra-se a Fundação Documental do projeto e inicia-se a Fundação Técnica, destinada à preparação da infraestrutura necessária para o desenvolvimento da aplicação.

#### Observações

A partir desta etapa, a evolução do projeto passa a ser orientada pelo roadmap e conduzida conforme o workflow oficial, registrando no diário apenas implementações efetivamente concluídas.

### Fundação Técnica — Infraestrutura Base

#### Objetivo

Preparar a infraestrutura inicial necessária para suportar o desenvolvimento e a execução integrada da aplicação.

#### Implementações

- criação do arquivo `.gitignore`;
- definição do arquivo `.env.example`;
- implementação do `docker-compose.yml`;
- definição da estrutura do diretório `docker/`;
- criação dos Dockerfiles iniciais do Backend e do Frontend;
- definição da estratégia de containerização utilizando Docker Compose;
- definição da infraestrutura de desenvolvimento baseada em PostgreSQL, Backend e Frontend.

#### Resultado

O projeto passa a possuir uma infraestrutura inicial padronizada para desenvolvimento local.

A organização dos containers, variáveis de ambiente, volumes, rede e estrutura de containerização encontra-se preparada para receber a implementação da aplicação.

#### Observações

Os Dockerfiles representam a configuração inicial do ambiente de desenvolvimento e serão evoluídos juntamente com os projetos Backend e Frontend.

---

## 2026-08-18

### Fundação Técnica — Aplicações e Persistência

#### Objetivo

Concluir a Fundação Técnica do Pager, disponibilizando as aplicações Backend e Frontend e preparando a camada de persistência para os próximos blocos de desenvolvimento.

#### Implementações

- inicialização da aplicação Backend utilizando NestJS;
- adoção da estrutura orientada ao domínio no Backend;
- criação da estrutura inicial de `modules`, `common`, `config` e `shared`;
- criação do módulo inicial `System`;
- implementação do endpoint `GET /api`;
- inicialização da aplicação Frontend utilizando React, Vite e TypeScript;
- definição da estrutura inicial de diretórios do Frontend;
- configuração da comunicação HTTP por meio do Axios;
- configuração do `ConfigModule` no Backend;
- configuração do `ValidationPipe` global;
- configuração do CORS;
- definição do prefixo global `/api`;
- instalação e configuração das dependências `class-validator` e `class-transformer`;
- instalação e configuração do Prisma ORM;
- configuração do PostgreSQL como datasource;
- adoção da configuração moderna do Prisma por meio de `prisma.config.ts`;
- configuração do Prisma Client com geração em `src/generated/prisma`;
- configuração do Prisma Client para CommonJS;
- configuração do `PrismaPg` como adapter PostgreSQL;
- criação do `PrismaModule`;
- criação do `PrismaService`;
- integração do `PrismaModule` ao `AppModule`;
- validação da inicialização integrada de Frontend, Backend, PostgreSQL e Prisma.

#### Resultado

A Fundação Técnica do Pager foi concluída.

O projeto possui uma infraestrutura Docker funcional, aplicações Backend e Frontend executáveis, PostgreSQL configurado e camada de persistência preparada para receber os primeiros modelos do domínio.

A aplicação Backend inicia corretamente e disponibiliza o endpoint inicial `/api`.

A camada Prisma encontra-se integrada ao NestJS e ao PostgreSQL, sem modelos de domínio definidos nesta etapa.

#### Observações

Durante a implementação da camada de persistência foi necessária uma adequação à configuração atual do Prisma, incluindo `prisma.config.ts`, driver adapter PostgreSQL e configuração do Prisma Client para CommonJS.

Nenhuma migration de domínio foi criada nesta etapa, pois os modelos persistentes ainda não foram definidos.

Com a conclusão da Fundação Técnica, o próximo ciclo de desenvolvimento será iniciado pelo Bloco 1 — Autenticação.

### Bloco 1 — Autenticação e Autorização

#### BL-01.1 a BL-01.4 — Conclusão

##### Objetivo

Implementar e validar a primeira vertical de segurança do Pager, abrangendo persistência de usuários, autenticação JWT e autorização baseada em papéis.

##### Implementações

- definição dos papéis `STAFF`, `MANAGER` e `ADMIN`;
- definição e persistência do modelo `User`;
- criação da migration inicial;
- criação da estrutura do `AuthModule`;
- implementação da autenticação por email e senha;
- utilização do Argon2 para hash e verificação de senhas;
- configuração centralizada do JWT;
- implementação da `JwtStrategy`;
- implementação do `JwtAuthGuard`;
- implementação do `Roles` decorator;
- implementação do `RolesGuard`;
- implementação do endpoint `POST /api/auth/login`;
- implementação do endpoint protegido `GET /api/auth/me`;
- implementação do endpoint protegido de validação administrativa;
- implementação do bootstrap do primeiro usuário `ADMIN`;
- implementação de seed idempotente.

##### Validação

Foram validados:

- validação dos dados de login;
- rejeição de credenciais inválidas;
- criação do usuário `ADMIN`;
- comportamento idempotente do seed;
- rejeição de acesso sem JWT;
- emissão de JWT após autenticação válida;
- acesso a rota protegida com JWT válido;
- autorização de acesso conforme o papel `ADMIN`.

##### Resultado

O Bloco 1 — Autenticação e Autorização foi concluído.

O Pager possui agora autenticação baseada em JWT e autorização baseada em RBAC, com separação entre autenticação (`401 Unauthorized`) e autorização (`403 Forbidden`).

A validação específica dos papéis `STAFF` e `MANAGER` será realizada posteriormente, quando o módulo de administração de usuários estiver implementado.

---

## 2026-08-26

### Bloco 2 — Administração

#### BL-02.1 — Modelagem de Usuários e Áreas

##### Objetivo

Consolidar o modelo persistente necessário para administração de usuários e organização por áreas.

##### Implementações

- consolidação do modelo `User`;
- consolidação dos papéis `STAFF`, `MANAGER` e `ADMIN`;
- consolidação do modelo `Area`;
- definição dos tipos `SETOR`, `LOCAL` e `EQUIPE`;
- consolidação da relação N:N entre usuários e áreas;
- utilização do modelo associativo `UserArea`;
- validação da migration inicial;
- validação da sincronização do schema Prisma com PostgreSQL.

##### Resultado

A estrutura persistente necessária para usuários e áreas foi validada.

O PostgreSQL possui as tabelas `users`, `areas` e `user_areas`, e o Prisma confirmou que o banco encontra-se sincronizado com o schema.

---

#### BL-02.2 — Bootstrap Administrativo

##### Objetivo

Garantir a configuração inicial do administrador do sistema.

##### Implementações

- evolução do `seed-admin.ts`;
- criação idempotente da área `Produção` do tipo `SETOR`;
- associação do usuário `ADMIN` à área `Produção`;
- manutenção da idempotência do bootstrap;
- validação da associação no PostgreSQL.

##### Validação

Foram realizadas duas execuções consecutivas do seed sem duplicação de usuário, área ou associação.

A associação final validada foi:

`admin@pager.local → ADMIN → Produção / SETOR`

O Backend permaneceu funcional após a implementação.

##### Resultado

O bootstrap administrativo inicial foi concluído e o usuário `ADMIN` encontra-se associado à área operacional `Produção`.

---

### BL-02.3 — Estrutura do UsersModule

#### Objetivo

Criar a estrutura modular responsável pela administração de usuários.

#### Implementações

- criação do `UsersModule`;
- criação do `UsersController`;
- criação do `UsersService`;
- criação dos DTOs `CreateUserDto` e `UpdateUserDto`;
- integração do `UsersModule` com `PrismaModule`;
- registro do `UsersModule` no `AppModule`;
- configuração inicial de proteção do controller por `JwtAuthGuard` e `RolesGuard`;
- restrição inicial do módulo ao papel `ADMIN`.

#### Validação

- compilação TypeScript validada sem erros;
- ESLint validado sem erros;
- Backend inicializado corretamente após a inclusão do módulo.

#### Resultado

A estrutura inicial do `UsersModule` foi concluída.

O módulo encontra-se preparado para receber as operações administrativas de usuários no `BL-02.4`.

A implementação de CRUD e das regras de negócio permanece deliberadamente fora deste incremento.

---

### BL-02.4.1 — Cadastro de usuário

#### Objetivo

Implementar o primeiro fluxo funcional da administração de usuários.

#### Implementações

- implementação do cadastro administrativo através de `POST /api/users`;
- inclusão de `areaIds` no `CreateUserDto`;
- validação de pelo menos uma área;
- validação de existência das áreas informadas;
- validação de email único;
- geração de hash de senha com Argon2;
- criação transacional de `User` e `UserArea`;
- retorno do usuário sem exposição do `passwordHash`;
- proteção do endpoint por JWT e RBAC, restrita ao papel `ADMIN`.

#### Validação

- cadastro válido realizado com sucesso;
- duplicidade de email rejeitada com `409 Conflict`;
- cadastro sem área rejeitado com `400 Bad Request`;
- área inexistente rejeitada com `400 Bad Request`;
- associação `teste@pager.local → Produção / SETOR` confirmada no PostgreSQL;
- hash Argon2 confirmado no armazenamento;
- `passwordHash` não exposto na resposta da API.

#### Resultado

O primeiro fluxo funcional de administração de usuários foi concluído com sucesso.

O próximo incremento deverá implementar a consulta e listagem de usuários.

---

## BL-02.4.2 — Listagem e consulta de usuários

### Objetivo

Implementar a visualização administrativa dos usuários cadastrados, incluindo suas áreas associadas, sem exposição de informações sensíveis.

### Implementação

Foram implementados:

* `GET /api/users`;
* `GET /api/users/:id`;
* consulta de usuários por meio do `UsersService`;
* retorno das áreas associadas através da relação `UserArea`;
* seleção explícita dos campos públicos do usuário;
* exclusão do `passwordHash` das respostas;
* tratamento de usuário inexistente com `404 Not Found`;
* proteção dos endpoints por `JwtAuthGuard` e `RolesGuard`;
* restrição de acesso ao papel `ADMIN`.

### Validação

A listagem retornou corretamente os usuários existentes e suas respectivas áreas.

A consulta individual retornou corretamente o usuário `teste@pager.local`, associado à área `Produção` (`SETOR`).

A consulta de identificador inexistente retornou:

`404 Not Found`

Usuário não encontrado.

O acesso sem autenticação retornou:

`401 Unauthorized`

Também foi verificado que as respostas não expõem o campo `passwordHash`.

---

### BL-02.4.3 — Edição de usuário

#### Objetivo

Implementar a edição administrativa dos usuários, respeitando as regras de imutabilidade do email, alteração de credenciais, mudança de role e associação obrigatória com áreas.

#### Implementações

- implementação da edição administrativa de usuários;
- alteração do nome;
- alteração da senha com novo hash utilizando Argon2;
- alteração de `role`;
- atualização das associações com áreas;
- manutenção do email como atributo imutável;
- validação da existência das áreas informadas;
- validação de pelo menos uma área associada ao usuário;
- tratamento de usuário inexistente;
- proteção dos endpoints por JWT e RBAC;
- restrição das operações administrativas ao papel `ADMIN`.

#### Validação

Foram validados:

- alteração de nome realizada com sucesso;
- alteração de senha realizada com sucesso;
- tentativa de alteração de email rejeitada com `400 Bad Request`;
- alteração de `STAFF` para `MANAGER` realizada com sucesso;
- tentativa de associação com área inexistente rejeitada com `400 Bad Request`;
- tentativa de remover todas as áreas rejeitada com `400 Bad Request`;
- usuário inexistente retornando `404 Not Found`;
- acesso sem autenticação retornando `401 Unauthorized`;
- tentativa de edição por `STAFF`/`MANAGER` retornando `403 Forbidden`.

A substituição efetiva das áreas por uma área diferente não foi executada porque o ambiente de teste possuía somente a área `Produção`. A regra de associação obrigatória e a validação de existência das áreas foram validadas.

#### Resultado

O BL-02.4.3 foi concluído com sucesso.

O Pager permite agora a edição administrativa dos dados permitidos de usuários, mantendo o email imutável e exigindo que cada usuário permaneça associado a pelo menos uma área.

A alteração de `role` permanece sob responsabilidade exclusiva do `ADMIN`, conforme as regras de negócio definidas para o Bloco 2.

O próximo incremento será responsável pela desativação de usuários, incluindo a regra de proteção do último `ADMIN` ativo.

---

## 2026-08-27

### BL-02.4.4 — Desativação de usuário

#### Objetivo

Implementar a desativação lógica de usuários, preservando seus registros e associações, impedindo o acesso de usuários inativos e protegendo o último `ADMIN` ativo.

#### Implementações

- implementação do fluxo administrativo de desativação de usuários;
- desativação lógica por meio do campo `active`;
- preservação do registro do usuário após a desativação;
- preservação das associações existentes com áreas;
- tratamento de usuário já desativado;
- tratamento de usuário inexistente;
- proteção do endpoint por JWT e RBAC;
- restrição da operação ao papel `ADMIN`;
- implementação da regra que impede a desativação do último `ADMIN` ativo.

#### Validação

Foi realizada a desativação do usuário `teste@pager.local`, que passou de `active = true` para `active = false`.

A persistência da alteração foi confirmada diretamente no PostgreSQL:

`teste@pager.local → MANAGER → active = false`

A tentativa de desativar novamente o mesmo usuário retornou:

`409 Conflict`

Usuário já desativado.

A tentativa de desativar um usuário inexistente retornou:

`404 Not Found`

Usuário não encontrado.

O acesso ao endpoint sem autenticação retornou:

`401 Unauthorized`

Também foi validada a regra crítica de proteção do último `ADMIN` ativo. A tentativa de desativar o único administrador ativo retornou:

`409 Conflict`

Não é possível desativar o último administrador ativo.

O usuário `admin@pager.local` permaneceu ativo após a tentativa.

O teste específico de um usuário `STAFF`/`MANAGER` tentando executar a operação não foi realizado, pois o ambiente de teste não possuía outro usuário apropriado para esse cenário. A proteção por RBAC já havia sido validada nos incrementos anteriores do `UsersModule`.

#### Resultado

O BL-02.4.4 foi concluído com sucesso.

O Pager possui agora desativação lógica de usuários, preservando seus dados e associações e impedindo o acesso de usuários desativados.

A regra de proteção do último `ADMIN` ativo também foi implementada e validada.

Com a conclusão do BL-02.4.4, todas as operações previstas para a administração de usuários no BL-02.4 foram implementadas.

O próximo incremento deverá tratar a validação consolidada da administração e suas regras de autorização, conforme previsto no BL-02.6.

---

### BL-02.5 — Administração de Áreas

#### BL-02.5.1 — Estrutura do AreasModule

##### Objetivo

Criar a estrutura modular responsável pela administração de áreas.

##### Implementações

* criação do `AreasModule`;
* criação do `AreasController`;
* criação do `AreasService`;
* integração com `PrismaModule`;
* registro do `AreasModule` no `AppModule`;
* proteção inicial do controller por `JwtAuthGuard` e `RolesGuard`.

##### Validação

* compilação TypeScript validada sem erros;
* ESLint validado sem erros;
* inicialização do `AreasModule` confirmada pelos logs do Backend;
* demais módulos permaneceram funcionais.

##### Resultado

A estrutura inicial do `AreasModule` foi concluída e o módulo encontra-se preparado para receber as operações administrativas de áreas.

---

#### BL-02.5.2 — Cadastro de área

##### Objetivo

Implementar o cadastro administrativo de áreas operacionais.

##### Implementações

* criação do `CreateAreaDto`;
* implementação do endpoint `POST /api/areas`;
* validação do nome da área;
* validação do tipo por meio do enum `AreaType`;
* suporte aos tipos `SETOR`, `LOCAL` e `EQUIPE`;
* validação da combinação única `name + type`;
* tratamento de duplicidade com `409 Conflict`;
* proteção por JWT e RBAC.

##### Validação

Foram cadastradas com sucesso áreas dos três tipos:

* `Operação` — `SETOR`;
* `Evento` — `LOCAL`;
* `Equipe Técnica` — `EQUIPE`.

Também foram validados:

* conflito de área com a mesma combinação `name + type`;
* rejeição de tipo inválido;
* rejeição de nome ausente ou vazio;
* rejeição de requisição sem autenticação.

##### Resultado

O cadastro administrativo de áreas foi concluído e validado com sucesso.

---

#### BL-02.5.3 — Listagem e consulta de áreas

##### Objetivo

Implementar a visualização administrativa das áreas cadastradas.

##### Implementações

* implementação do endpoint `GET /api/areas`;
* implementação do endpoint `GET /api/areas/:id`;
* ordenação da listagem por tipo e nome;
* tratamento de área inexistente com `404 Not Found`;
* proteção dos endpoints por JWT e RBAC.

##### Validação

A listagem retornou corretamente as áreas cadastradas, respeitando a ordenação definida.

A consulta individual retornou corretamente a área `Operação`.

A consulta de identificador inexistente retornou `404 Not Found`.

O acesso sem autenticação retornou `401 Unauthorized`.

##### Resultado

A listagem e a consulta individual de áreas foram concluídas e validadas com sucesso.

---

#### BL-02.5.4 — Edição de área

##### Objetivo

Implementar a edição administrativa das áreas, preservando a unicidade da combinação `name + type` e os tipos permitidos.

##### Implementações

* criação do `UpdateAreaDto`;
* implementação do endpoint `PATCH /api/areas/:id`;
* alteração de nome;
* alteração de tipo;
* alteração simultânea de nome e tipo;
* validação de conflito na combinação `name + type`;
* tratamento de área inexistente;
* rejeição de requisição sem campos alteráveis;
* proteção por JWT e RBAC.

##### Validação

Foram validados com sucesso:

* alteração somente do nome;
* alteração somente do tipo;
* alteração simultânea de nome e tipo;
* rejeição de combinação `name + type` já existente com `409 Conflict`;
* área inexistente com `404 Not Found`;
* corpo vazio com `400 Bad Request`;
* tipo inválido com `400 Bad Request`;
* acesso sem autenticação com `401 Unauthorized`.

##### Resultado

O BL-02.5.4 foi concluído com sucesso.

O módulo de áreas possui agora cadastro, listagem, consulta e edição funcionais, mantendo as regras de validação e autorização estabelecidas.

A associação entre usuários e áreas permanece como próximo incremento funcional do `BL-02.5`.

#### BL-02.5.5 — Associação de usuários às áreas

##### Objetivo

Implementar a gestão das associações entre usuários e áreas, utilizando a relação N:N definida no modelo de persistência.

##### Implementações

* criação do `UpdateUserAreasDto`;
* implementação do endpoint `PUT /api/users/:id/areas`;
* substituição integral das associações existentes;
* validação de existência do usuário;
* validação de existência das áreas;
* exigência de pelo menos uma área;
* rejeição de associações duplicadas;
* utilização de transação para atualização das associações;
* proteção por JWT e RBAC;
* restrição da operação ao papel `ADMIN`;
* retorno do usuário com suas áreas sem exposição do `passwordHash`.

##### Validação

Foram validados com sucesso:

* substituição da área associada ao usuário;
* associação simultânea a duas áreas;
* rejeição de lista vazia de áreas com `400 Bad Request`;
* rejeição de identificadores inválidos com `400 Bad Request`;
* rejeição de áreas inexistentes com `400 Bad Request`;
* usuário inexistente com `404 Not Found`;
* acesso sem autenticação com `401 Unauthorized`.

O teste específico de acesso por `STAFF`/`MANAGER` não foi executado por ausência de outro usuário ativo apropriado no ambiente de teste.

##### Resultado

O BL-02.5.5 foi concluído com sucesso.

A associação de usuários às áreas está funcional, utilizando a relação N:N persistida em `UserArea`, permitindo que um usuário pertença simultaneamente a múltiplas áreas e mantendo a exigência de pelo menos uma associação.
