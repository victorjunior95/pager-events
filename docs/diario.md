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

## 2026-08-28

### Ajustes de validação integrada — Bloco 2

Durante a validação integrada das funcionalidades administrativas foram identificados dois comportamentos que exigiram correção.

#### Proteção administrativa das áreas

Foi identificado que o endpoint `GET /api/areas` possuía proteção por JWT e `RolesGuard`, porém não possuía uma role explicitamente definida.

A regra foi corrigida com a aplicação de `@Roles(UserRole.ADMIN)` no `AreasController`, fazendo com que todas as rotas administrativas de áreas sejam acessíveis somente por usuários com papel `ADMIN`.

A correção foi validada com um token `STAFF`, cujo acesso passou a retornar `403 Forbidden`.

#### Diferenciação de usuário desativado

Foi identificado que um usuário desativado, ao tentar realizar login com suas credenciais, recebia a mesma resposta utilizada para credenciais inválidas:

`Credenciais inválidas.`

O comportamento foi corrigido para identificar explicitamente a existência de uma conta desativada.

A tentativa de login de usuário desativado passou a retornar `401 Unauthorized` com a mensagem:

`Usuário desativado. Procure o administrador caso tenha dúvidas.`

Essa alteração preserva o status HTTP de não autorizado, mas fornece ao cliente uma indicação precisa de que o bloqueio decorre da desativação da conta.

#### Resultado

As duas inconsistências identificadas durante a validação integrada foram corrigidas e validadas com sucesso.

O Bloco 2 permanece em andamento, com o `BL-02.6 — Validação da Administração` ainda pendente de conclusão integral dos cenários previstos.

### Validação de autorização e autenticação do Bloco 2

#### Incremento validado

Concluída a validação das regras de autenticação e autorização relacionadas ao módulo de áreas e às operações administrativas de usuários.

#### Áreas

Foi validada a proteção do `AreasController` com `JwtAuthGuard` e `RolesGuard`, aplicando `@Roles(UserRole.ADMIN)` em nível de classe.

A validação confirmou que:

* `ADMIN` consegue listar e consultar áreas;
* requisições sem JWT retornam `401 Unauthorized`;
* `STAFF` recebe `403 Forbidden` ao:

  * listar áreas;
  * consultar área;
  * criar área;
  * alterar área.

A aplicação da regra em nível de classe foi mantida, pois todas as operações atualmente expostas pelo `AreasController` são administrativas e devem permanecer restritas a `ADMIN`.

#### Usuário desativado

Foi validada a tentativa de autenticação de usuário previamente desativado.

O backend passou a retornar:

`Usuário desativado. Procure o administrador caso tenha dúvidas.`

com `401 Unauthorized`, diferenciando esse cenário de uma falha genérica de credenciais.

#### Proteção do último ADMIN

Foi novamente validada a regra de negócio que impede a desativação do último administrador ativo.

Resultado:

`Não é possível desativar o último administrador ativo.`

com `409 Conflict`.

#### Resultado

Todos os testes previstos para esta etapa apresentaram o comportamento esperado.

A implementação encontra-se funcional e validada, permanecendo o Bloco 2 em andamento para os próximos incrementos.

## 2026-08-31

### BL-02.6 — Validação da Administração

##### Objetivo

Validar de forma integrada as funcionalidades administrativas implementadas nos módulos de usuários e áreas, incluindo autenticação, autorização por perfil, regras de negócio, relacionamentos N:N, desativação e tratamento dos principais fluxos de erro.

##### Preparação do ambiente

Foi preparado um ambiente de validação contendo:

* usuário `ADMIN` ativo;
* usuário `STAFF` ativo;
* usuário `MANAGER` ativo;
* usuário temporário `validacao@pager.local`;
* usuário desativado para validação do bloqueio de login;
* áreas `Produção`, `Evento`, `Equipe Técnica` e `Operação Externa`.

O usuário temporário foi criado especificamente para os testes funcionais e posteriormente reutilizado nas validações de consulta, edição, associação de áreas e desativação.

##### Validação de autorização

Foram validados com sucesso:

* `ADMIN` acessando usuários com `200 OK`;
* `STAFF` tentando acessar usuários com `403 Forbidden`;
* `MANAGER` tentando acessar usuários com `403 Forbidden`;
* `ADMIN` acessando áreas com `200 OK`;
* `STAFF` tentando acessar áreas com `403 Forbidden`;
* `MANAGER` tentando acessar áreas com `403 Forbidden`;
* requisições sem JWT retornando `401 Unauthorized`.

A matriz de autorização prevista para as operações administrativas foi, portanto, confirmada no ambiente integrado.

##### Validação das operações de usuários

Foram validados com sucesso:

* criação de usuário temporário com `201 Created`;
* persistência do usuário e de sua associação com área;
* armazenamento da senha como `passwordHash`;
* rejeição de email duplicado com `409 Conflict`;
* rejeição de cadastro sem áreas com `400 Bad Request`;
* rejeição de área inexistente no cadastro com `400 Bad Request`;
* validação completa do DTO com `400 Bad Request`;
* listagem de usuários com `200 OK`;
* consulta individual com `200 OK`;
* usuário inexistente com `404 Not Found`;
* consulta sem autenticação com `401 Unauthorized`;
* alteração somente do nome com `200 OK`;
* alteração somente da senha com `200 OK`;
* rejeição da tentativa de alteração de email pelo DTO;
* alteração de role com `200 OK`.

As respostas administrativas também confirmaram que `passwordHash` não é exposto pela API.

##### Validação da associação N:N entre usuários e áreas

Foi validado o endpoint `PUT /api/users/:id/areas`.

Foram confirmados com sucesso:

* substituição de uma área por outra;
* associação simultânea de duas áreas;
* rejeição de lista vazia com `400 Bad Request`;
* rejeição de UUID estruturalmente inválido com `400 Bad Request`;
* rejeição de área inexistente utilizando UUID válido com `400 Bad Request`;
* usuário inexistente com `404 Not Found`;
* ausência de autenticação com `401 Unauthorized`;
* tentativa de alteração por `STAFF` com `403 Forbidden`;
* tentativa de alteração por `MANAGER` com `403 Forbidden`.

O primeiro teste de área inexistente utilizou um UUID estruturalmente inválido e, por isso, foi corretamente interceptado pela validação do DTO. O teste foi repetido utilizando um UUID válido, mas inexistente no banco, confirmando então a regra de negócio esperada:

`"Uma ou mais áreas informadas não existem."`

A implementação utiliza a relação N:N `UserArea`, sem necessidade de nova migration.

##### Validação de desativação

Foi validada a desativação do usuário temporário com `200 OK`, mantendo suas associações de áreas.

Em seguida, o login do usuário desativado foi tentado e retornou `401 Unauthorized` com a mensagem correspondente à situação de usuário desativado.

Também foi validada a tentativa de desativar o único `ADMIN` ativo, que retornou `409 Conflict` com a proteção:

`"Não é possível desativar o último administrador ativo."`

##### Validação de fluxos de erro

Foram validados adicionalmente:

* atualização de usuário inexistente com `404 Not Found`;
* desativação de usuário inexistente com `404 Not Found`;
* alteração de áreas de usuário inexistente com `404 Not Found`.

##### Fechamento técnico

Após a conclusão dos testes funcionais:

* `npm run build` foi executado com sucesso;
* a execução inicial do ESLint identificou problemas no teste padrão `app.controller.spec.ts` e nos arquivos gerados pelo Prisma;
* foi ajustado o `eslint.config.mjs` para ignorar `src/generated/prisma/**` e `**/*.spec.ts` no contexto da validação;
* `npx eslint src` foi executado novamente e terminou com código de saída `0`;
* `git diff --check` não apresentou problemas;
* as alterações do ESLint foram versionadas no commit `24a6708` (`chore: ajustar lint do backend`);
* o `git status` final confirmou working tree limpa.

##### Resultado

O `BL-02.6 — Validação da Administração` foi concluído com sucesso.

As funcionalidades administrativas de usuários e áreas foram validadas em ambiente integrado, incluindo autorização por perfil, autenticação, regras de negócio, associação N:N, desativação, proteção do último `ADMIN` e principais fluxos de erro.

Com o fechamento deste incremento, o `BL-02 — Administração` possui usuários e áreas implementados e validados, encerrando a etapa administrativa prevista no roadmap.

O próximo ciclo deve avançar para o próximo bloco funcional do projeto, respeitando as dependências estabelecidas no roadmap.

## 2026-09-03

### Validação de autenticação e autorização do domínio de Demand

Foi concluída a primeira etapa funcional do domínio de Demand, incluindo CRUD, fechamento e arquivamento.

A demanda passou a exigir autenticação via JWT nos endpoints protegidos. A autorização foi integrada ao mecanismo de RBAC existente, utilizando os perfis `STAFF`, `MANAGER` e `ADMIN`.

A matriz validada para o domínio ficou definida da seguinte forma:

| Operação  | ADMIN | MANAGER | STAFF |
| --------- | :---: | :-----: | :---: |
| Listar    |   ✓   |    ✓    |   ✓   |
| Consultar |   ✓   |    ✓    |   ✓   |
| Criar     |   ✓   |    ✓    |   ✓   |
| Atualizar |   ✓   |    ✓    |   ✓   |
| Fechar    |   ✓   |    ✓    |   ✓   |
| Arquivar  |   ✓   |    ✓    |   —   |

Foram realizados testes com JWT válido e sem autenticação. Também foi validado especificamente o endpoint de arquivamento com os três perfis: `ADMIN` e `MANAGER` receberam `200 OK`, enquanto `STAFF` recebeu `403 Forbidden`.

A implementação também mantém o identificador operacional sequencial das demandas (`DEM-000001`, `DEM-000002`), sem consumo da sequência nas operações de fechamento ou arquivamento.

Com isso, fica encerrado o incremento de autenticação e autorização do domínio de Demand.

**Próximo incremento:** definir e implementar as regras de ciclo de vida da demanda, especialmente as interações entre fechamento e arquivamento.

### BL-03.1 — Núcleo inicial de Demand

#### Objetivo

Implementar o núcleo persistente e operacional inicial do domínio de Demand, preparando a entidade para criação, consulta, edição, associação com áreas e evolução posterior do ciclo de vida.

#### Implementações

* criação do modelo `Demand`;
* definição dos níveis de urgência `NENHUMA`, `BAIXA`, `MÉDIA`, `ALTA` e `CRÍTICA`;
* criação do identificador operacional sequencial no formato `DEM-000001`;
* criação da sequência PostgreSQL `demand_code_seq`;
* criação do modelo associativo `DemandArea`;
* estabelecimento da relação N:N entre demandas e áreas;
* criação da estrutura inicial `DemandHistory`;
* criação do `DemandsModule`;
* criação do `DemandsController`;
* criação do `DemandsService`;
* criação dos DTOs de criação e atualização;
* implementação de `POST /api/demands`;
* implementação de `GET /api/demands`;
* implementação de `GET /api/demands/:id`;
* implementação de `PATCH /api/demands/:id`;
* validação das áreas associadas à demanda;
* exigência de pelo menos uma área;
* validação de existência das áreas informadas;
* suporte à atualização parcial dos dados da demanda.

#### Persistência

Foram criadas as migrations:

* `20260902172708_add_demands`;
* `20260902181846_add_demand_code_sequence`.

A sequência operacional foi implementada diretamente no PostgreSQL e utilizada para gerar códigos no padrão:

`DEM-000001`

`DEM-000002`

#### Validação

Foram validados:

* criação de demandas com sucesso;
* incremento sequencial dos códigos;
* listagem das demandas;
* consulta individual;
* consulta de demanda inexistente com `404 Not Found`;
* atualização parcial;
* alteração de urgência;
* alteração de descrição;
* alteração de prazo;
* alteração das áreas associadas;
* rejeição de `areaIds` vazio com `400 Bad Request`;
* rejeição de área inexistente com `400 Bad Request`;
* preservação dos campos não enviados em atualização parcial;
* persistência das alterações diretamente no PostgreSQL;
* ausência de consumo da sequência nas operações de atualização.

Também foi confirmado que a sequence permanece com o valor esperado após operações que não representam criação de demanda.

#### Resultado

O núcleo inicial de Demand foi implementado e validado.

A entidade possui persistência própria, associação com áreas, identificador operacional sequencial, níveis de urgência, prazo, arquivamento, fechamento e estrutura inicial para histórico.

O próximo incremento deverá consolidar as regras de ciclo de vida da demanda e sua autorização por perfil.

### BL-03.2 — Regras de ciclo de vida da demanda

#### Objetivo

Consolidar as regras de negócio relacionadas ao fechamento e arquivamento de demandas, evitando transições inválidas no ciclo de vida operacional.

#### Implementações

Foram ajustados os métodos `close()` e `archive()` do `DemandsService` para validar o estado atual da demanda antes de executar a alteração.

O fechamento passou a respeitar as seguintes regras:

* demanda inexistente retorna `404 Not Found`;
* demanda já fechada não pode ser fechada novamente;
* demanda arquivada não pode ser fechada;
* uma demanda aberta pode ser fechada;
* o fechamento registra `closedAt` e atualiza `updatedAt`.

O arquivamento passou a respeitar as seguintes regras:

* demanda inexistente retorna `404 Not Found`;
* demanda já arquivada não pode ser arquivada novamente;
* demanda fechada pode ser arquivada;
* o arquivamento altera `archived` para `true` e atualiza `updatedAt`.

#### Validação

Foi validado o fechamento de uma demanda aberta com `200 OK`.

A mesma demanda foi submetida novamente ao fechamento e retornou:

`400 Bad Request`

`A demanda já está fechada.`

Em seguida, a demanda fechada foi arquivada com sucesso, retornando `200 OK`.

Uma segunda tentativa de arquivamento retornou:

`400 Bad Request`

`A demanda já está arquivada.`

Também foi realizada tentativa de fechamento de uma demanda já arquivada, que retornou:

`400 Bad Request`

`Não é possível fechar uma demanda arquivada.`

A persistência das alterações foi confirmada diretamente no PostgreSQL, incluindo:

* `closedAt`;
* `archived`;
* `updatedAt`.

A sequence `demand_code_seq` permaneceu inalterada após fechamento e arquivamento, confirmando que essas operações não consomem identificadores operacionais.

#### Cenário pendente

O cenário de arquivamento de uma demanda ainda aberta não foi executado porque o ambiente de teste não possuía uma demanda aberta disponível para esse cenário.

Portanto, esse comportamento permanece deliberadamente pendente de definição/validação e não é considerado concluído neste incremento.

#### Resultado

As principais transições de fechamento e arquivamento foram implementadas e validadas.

O domínio impede agora o fechamento repetido, o arquivamento repetido e o fechamento de demandas já arquivadas, mantendo a consistência dos campos `closedAt` e `archived`.

A definição final do comportamento de arquivamento de demandas ainda abertas deverá ser tratada antes do encerramento completo do ciclo de vida de Demand.

## 2026-09-10

### BL-03.2 — Validação complementar do ciclo de vida de Demand

#### Objetivo

Concluir a validação das regras de ciclo de vida relacionadas ao arquivamento de demandas ainda abertas.

#### Validação

Foi criada e utilizada uma demanda aberta especificamente para validar o comportamento do arquivamento antes do fechamento.

A tentativa de arquivar a demanda aberta foi rejeitada com:

`400 Bad Request`

`Não é possível arquivar uma demanda que não está fechada.`

Com isso, foram validados todos os cenários definidos para o ciclo de vida entre fechamento e arquivamento:

* demanda aberta pode ser fechada;
* demanda já fechada não pode ser fechada novamente;
* demanda fechada pode ser arquivada;
* demanda já arquivada não pode ser arquivada novamente;
* demanda arquivada não pode ser fechada;
* demanda aberta não pode ser arquivada.

#### Resultado

A validação complementar foi concluída com sucesso.

O comportamento de arquivamento de demandas abertas encontra-se definido e validado, encerrando a pendência existente no BL-03.2.

---

### BL-03.3.1 — Relação Demand ↔ User

#### Objetivo

Consolidar a estrutura persistente necessária para representar o usuário responsável por uma demanda antes da implementação das operações de negócio de atribuição.

#### Implementações

A estrutura do domínio foi alinhada para representar explicitamente a relação entre `Demand` e `User`.

Foram consolidados:

* `Demand.responsibleId`;
* relação `Demand.responsible`;
* relação inversa `User.responsibleDemands`;
* nome explícito da relação Prisma como `DemandResponsible`;
* índice sobre `responsibleId`;
* chave estrangeira de `demands.responsibleId` para `users.id`;
* comportamento `ON DELETE SET NULL`.

A persistência já havia sido introduzida pelas migrations:

* `20260904193759_add_demand_responsible`;
* `20260904232126_align_demand_responsible_relation`.

A segunda migration corrigiu a primeira implementação, removendo a coluna indevida `userId` e mantendo `responsibleId` como única referência ao usuário responsável.

Nenhuma nova migration foi criada neste incremento, pois a estrutura necessária já existia no banco.

#### Validação

Foram executados com sucesso:

* `docker compose exec backend npx prisma validate`;
* `docker compose exec backend npx prisma generate`;
* `docker compose exec backend npm run build`;
* `docker compose exec backend npx eslint src`;
* `git diff --check`.

O status das migrations também foi validado no container e retornou:

`Database schema is up to date!`

A estrutura existente foi conferida diretamente no PostgreSQL, confirmando o campo `responsibleId` e sua ausência de valores atribuídos nas demandas existentes.

As cinco demandas existentes permaneceram preservadas.

#### Resultado

O BL-03.3.1 foi concluído com sucesso.

A persistência da relação entre demanda e responsável está preparada para suportar as próximas regras de negócio.

O próximo incremento será o BL-03.3.2 — atribuição, alteração e remoção do responsável.

#### Validação complementar

Posteriormente, foi disponibilizada uma demanda aberta para completar o cenário que permanecia pendente.

Foi realizada tentativa de arquivamento da demanda ainda aberta, que retornou:

`400 Bad Request`

`Não é possível arquivar uma demanda que não está fechada.`

Dessa forma, o ciclo de vida entre fechamento e arquivamento foi considerado completamente validado.

#### Resultado

As regras de ciclo de vida de Demand foram implementadas e validadas.

O domínio impede:

* fechamento repetido;
* fechamento de demanda arquivada;
* arquivamento repetido;
* arquivamento de demanda ainda aberta.

As alterações de estado foram confirmadas no PostgreSQL.

### BL-03.3 — Gerenciamento do responsável da demanda

#### Objetivo

Implementar o gerenciamento completo do responsável operacional de uma demanda, contemplando atribuição, troca e remoção, respeitando as regras de autorização e o ciclo de vida da demanda.

#### BL-03.3.1 — Relação Demand ↔ User

A estrutura persistente do responsável foi consolidada anteriormente por meio do campo `responsibleId` em `Demand` e da relação nomeada `DemandResponsible`.

A relação inversa `User.responsibleDemands` também foi definida.

Não foi necessária nova migration neste incremento, pois a estrutura persistente já havia sido criada pelas migrations existentes:

* `20260904193759_add_demand_responsible`;
* `20260904232126_align_demand_responsible_relation`.

#### BL-03.3.2 — Atribuição e troca

Foi implementado o endpoint:

`PATCH /api/demands/:id/responsible`

O endpoint permite que `ADMIN` e `MANAGER` atribuam ou substituam o responsável de uma demanda.

Foram implementadas as seguintes validações:

* demanda inexistente;
* demanda fechada;
* demanda arquivada;
* usuário responsável inexistente;
* usuário responsável desativado;
* autorização por perfil.

Durante a validação foi identificado que a rota possuía `@Roles(UserRole.ADMIN, UserRole.MANAGER)`, porém não aplicava `RolesGuard` diretamente.

A proteção foi corrigida para utilizar:

`@UseGuards(JwtAuthGuard, RolesGuard)`

Após a correção, uma tentativa de atribuição realizada por `STAFF` passou a retornar corretamente:

`403 Forbidden`

Também foram validadas:

* atribuição por `ADMIN`: `200 OK`;
* atribuição por `MANAGER`: `200 OK`;
* troca do responsável atual por outro usuário ativo: `200 OK`;
* persistência do novo responsável;
* confirmação da alteração diretamente no PostgreSQL;
* retorno do responsável na consulta da demanda;
* ausência de `passwordHash` nas respostas.

#### BL-03.3.3 — Remoção do responsável

Foi implementado o endpoint:

`DELETE /api/demands/:id/responsible`

A operação utiliza `disconnect` na relação Prisma, preservando o usuário e removendo somente a associação com a demanda.

Foram validados:

* remoção por `ADMIN`: `200 OK`;
* remoção por `MANAGER`: `200 OK`;
* `responsibleId` persistido como `NULL`;
* `responsible` retornado como `null`;
* rejeição de `STAFF`: `403 Forbidden`;
* rejeição sem autenticação: `401 Unauthorized`;
* demanda inexistente: `404 Not Found`;
* demanda fechada: `400 Bad Request`;
* demanda arquivada: `400 Bad Request`.

Durante o teste de demanda arquivada foi identificado um detalhe de precedência nas validações: como toda demanda arquivada possui `closedAt`, a verificação de fechamento ocorria antes da verificação de arquivamento.

A ordem foi corrigida para verificar `archived` antes de `closedAt`, permitindo retornar a mensagem específica:

`Não é possível remover o responsável de uma demanda arquivada.`

#### Validação técnica

Após as implementações e correções foram executados:

* `docker compose exec backend npm run build`;
* `docker compose exec backend npx eslint src`;
* `git diff --check`.

Todos foram concluídos com sucesso.

#### Resultado

O gerenciamento do responsável da demanda foi concluído.

O Pager possui agora:

* atribuição de responsável;
* troca de responsável;
* remoção de responsável;
* autorização específica para `ADMIN` e `MANAGER`;
* bloqueio para `STAFF`;
* validação de usuário ativo;
* bloqueio para demandas fechadas;
* bloqueio para demandas arquivadas;
* persistência e consulta do responsável.

O próximo incremento do Bloco 3 será:

**BL-03.4 — Status/Andamento operacional.**

## 2026-09-16

### BL-03.4 — Status/Andamento operacional

**Objetivo**

Implementar o andamento operacional da demanda por meio de uma máquina de estados explícita, mantendo as regras de autorização alinhadas aos papéis existentes e preservando, neste momento, os endpoints legados do ciclo de vida.

**Implementação realizada**

Foi incorporado o status persistente `DemandStatus` ao modelo `Demand`, com os seguintes estados:

- `NOVA`
- `TRIAGEM`
- `RESPONSAVEL_ATRIBUIDO`
- `EM_ANDAMENTO`
- `CONCLUSAO_SINALIZADA`
- `ARQUIVADA`

O estado inicial das novas demandas permanece `NOVA`.

Foi criada a migration:

`20260911142600_add_demand_status`

Também foi criado o DTO `UpdateDemandStatusDto`, utilizando validação por enum, e disponibilizado o endpoint:

`PATCH /api/demands/:id/status`

O fluxo permitido ficou definido como:

`NOVA → TRIAGEM → RESPONSAVEL_ATRIBUIDO → EM_ANDAMENTO → CONCLUSAO_SINALIZADA → ARQUIVADA`

A implementação rejeita transições fora da sequência e trata `ARQUIVADA` como estado terminal.

**Regras de autorização**

- `ADMIN` e `MANAGER` podem avançar a demanda até `TRIAGEM` e `RESPONSAVEL_ATRIBUIDO`;
- `RESPONSAVEL_ATRIBUIDO` exige que exista responsável definido;
- somente o responsável atual pode avançar a demanda para `EM_ANDAMENTO`;
- somente o responsável atual pode sinalizar `CONCLUSAO_SINALIZADA`;
- somente `ADMIN` e `MANAGER` podem realizar o arquivamento;
- demandas arquivadas não podem sofrer novas alterações de status.

Ao realizar o arquivamento pelo endpoint de status, `archived` é definido como `true` e `closedAt` é preenchido quando ainda não estiver definido.

**Validação funcional**

Foi utilizado o fluxo da demanda `DEM-000010` para validar o ciclo completo:

1. criação da demanda em `NOVA`;
2. avanço para `TRIAGEM`;
3. tentativa de avanço para `RESPONSAVEL_ATRIBUIDO` sem responsável, rejeitada;
4. atribuição do responsável;
5. avanço para `EM_ANDAMENTO` pelo responsável;
6. tentativa de avanço por outro usuário, rejeitada;
7. avanço para `CONCLUSAO_SINALIZADA` pelo responsável;
8. arquivamento por `MANAGER`;
9. tentativa de alteração após arquivamento, rejeitada.

O fluxo completo foi persistido corretamente no PostgreSQL.

**Validação de transições inválidas**

Também foram validadas as seguintes tentativas:

- `NOVA → EM_ANDAMENTO`;
- `NOVA → CONCLUSAO_SINALIZADA`;
- `NOVA → ARQUIVADA`;
- `TRIAGEM → EM_ANDAMENTO`;
- `EM_ANDAMENTO → NOVA`;
- `CONCLUSAO_SINALIZADA → EM_ANDAMENTO`;
- `ARQUIVADA → NOVA`.

Todas foram rejeitadas conforme a máquina de estados definida.

**Validação técnica**

- `npx prisma validate` aprovado;
- geração do Prisma Client aprovada;
- `npm run build` do backend aprovado;
- `npx eslint src` aprovado;
- persistência do campo `status` e dos valores utilizados validada diretamente no PostgreSQL.

**Observação**

Os endpoints legados `/close` e `/archive` continuam preservados. Durante a validação foi identificada a possibilidade de existirem demandas arquivadas por esses endpoints com `archived = true` e `status = NOVA`. Isso decorre da ausência, ainda intencional, de convergência completa entre o fluxo legado e a nova máquina de estados.

Essa consolidação deverá ser tratada posteriormente, sem reabrir ou alterar o comportamento já validado neste incremento.

**Resultado**

O BL-03.4 foi concluído com a implementação e validação do fluxo operacional de status da demanda. As transições válidas, transições inválidas, regras de responsabilidade e restrições de arquivamento foram exercitadas com sucesso.

**Próximo incremento**

O próximo foco permanece na **consolidação das regras de alteração de urgência/prioridade**, seguido pela integração do histórico às alterações estruturais e pela validação consolidada das novas regras do domínio.

### BL-03.5 — Controle de alteração de urgência

**Status:** 🟢 Concluído

Implementado o controle de autorização para alteração da urgência das demandas.

#### Implementação

- Mantido `DemandUrgencyDto` com validação por `@IsEnum`.
- Alterações de `urgency` permitidas somente para `ADMIN` e `MANAGER`.
- `STAFF` recebe `403` ao tentar alterar a urgência.
- Edições normais da demanda continuam disponíveis para `STAFF`.
- Valores de urgência fora do enum são rejeitados pelo `ValidationPipe`.

#### Validações executadas

- `docker compose exec backend npx eslint src` → ✅
- `docker compose exec backend npm run build` → ✅
- `git diff --check` → ✅
- `MANAGER` alterando urgência → `200` ✅
- `STAFF` alterando urgência → `403` ✅
- `ADMIN` alterando urgência → `200` ✅
- `STAFF` alterando somente descrição → `200` ✅
- urgência inválida → `400` ✅

#### Resultado

O controle de urgência foi implementado sem interferir na edição normal das demandas.

**Próximo foco:** histórico das alterações estruturais da demanda.

---

## 2026-09-17

### BL-03.6 — Integração do histórico com alterações estruturais

#### Objetivo

Consolidar o histórico estrutural das demandas, registrando automaticamente as principais alterações realizadas e identificando o usuário responsável pela execução de cada ação.

#### Implementações

Foram realizadas as seguintes evoluções no histórico de Demand:

- criação do enum persistente `DemandHistoryType`;
- definição dos eventos:
  - `URGENCY_CHANGED`;
  - `STATUS_CHANGED`;
  - `RESPONSIBLE_ASSIGNED`;
  - `RESPONSIBLE_CHANGED`;
  - `RESPONSIBLE_REMOVED`;
  - `CLOSED`;
  - `ARCHIVED`;
- inclusão do campo `actorId` em `DemandHistory`;
- criação da relação `DemandHistory.actor` com `User`;
- criação da relação inversa `User.demandHistoryActions`;
- definição de `ON DELETE SET NULL` para a relação com o ator;
- criação de índice sobre `actorId`;
- propagação do usuário autenticado para as operações estruturais;
- integração do histórico às alterações de urgência, status, responsável, fechamento e arquivamento;
- inclusão dos dados públicos do ator no retorno da consulta da demanda.

#### Persistência

Foram criadas e aplicadas as migrations:

`20260917010344_add_demand_history_type`

`20260917221419_add_demand_history_actor`

O schema Prisma foi regenerado e o estado das migrations foi validado no container.

Resultado:

`Database schema is up to date!`

#### Regras de histórico

A alteração de urgência passou a gerar `URGENCY_CHANGED` somente quando o valor efetivamente é modificado.

A alteração de status gera `STATUS_CHANGED` com o usuário autenticado como ator.

As operações de responsável passaram a registrar:

- `RESPONSIBLE_ASSIGNED` para atribuição;
- `RESPONSIBLE_CHANGED` para troca;
- `RESPONSIBLE_REMOVED` para remoção.

Operações sem alteração efetiva não geram novos eventos.

As operações de fechamento e arquivamento passaram a registrar, respectivamente:

- `CLOSED`;
- `ARCHIVED`.

#### Identificação do ator

Cada novo evento estrutural recebe o `actorId` do usuário autenticado que executou a operação.

A consulta individual da demanda passou a retornar também os dados públicos do ator associado ao evento:

- `id`;
- `name`;
- `email`;
- `role`.

Registros históricos criados antes da introdução de `actorId` permanecem com `actorId = null`, pois não existe informação confiável para determinar retroativamente qual usuário realizou essas ações.

#### Validação funcional

Foram executados cenários consolidados utilizando a demanda de validação `DEM-000013`.

Foram validados com sucesso:

- `BAIXA → ALTA` gerando `URGENCY_CHANGED`;
- `NOVA → TRIAGEM` gerando `STATUS_CHANGED`;
- fechamento gerando `CLOSED`;
- arquivamento gerando `ARCHIVED`;
- atribuição de responsável gerando `RESPONSIBLE_ASSIGNED`;
- troca de responsável gerando `RESPONSIBLE_CHANGED`;
- remoção de responsável gerando `RESPONSIBLE_REMOVED`;
- retorno do `actorId` correto;
- retorno do objeto `actor` com os dados do usuário responsável pela ação;
- ausência de novo evento em operações sem alteração efetiva.

Os eventos gerados nas novas operações apresentaram o ator esperado, incluindo o usuário `ADMIN` utilizado nos cenários consolidados.

#### Validação técnica

Foram executados com sucesso:

- `docker compose exec backend npx prisma generate`;
- `docker compose exec backend npx prisma migrate status`;
- `docker compose exec backend npx eslint src`;
- `docker compose exec backend npm run build`;
- `git diff --check`.

Todos os comandos foram concluídos sem erros.

#### Resultado

O BL-03.6 foi concluído com sucesso.

O histórico de Demand está agora integrado às principais alterações estruturais do domínio e registra o ator responsável pelas novas ações.

A consulta da demanda também permite identificar quem executou cada alteração, mantendo os dados públicos do usuário associados ao evento.

A consolidação do histórico foi realizada sem atribuir atores artificialmente aos registros legados.

#### Observação sobre fechamento e arquivamento

A implementação atual registra os eventos `CLOSED` e `ARCHIVED`, porém a semântica definitiva do estado `CLOSED` ainda não está consolidada no domínio.

Os endpoints legados `/close` e `/archive` permanecem preservados e podem produzir combinações entre `status`, `closedAt` e `archived` que serão tratadas no próximo incremento de ciclo de vida.

A próxima evolução deverá introduzir a convergência explícita do fechamento e arquivamento com o estado `CLOSED`, incluindo a distinção entre conclusão sinalizada, fechamento validado e arquivamento.

## 2026-09-22

### BL-03.7 — Consolidação do fechamento e arquivamento com status `CLOSED`

#### Objetivo

Consolidar a distinção entre conclusão sinalizada, fechamento definitivo e arquivamento no ciclo de vida das demandas.

#### Implementação

Foi introduzido o estado persistente `CLOSED` na máquina de estados de Demand.

Foram atualizados:

* enum persistente `DemandStatus`;
* `DemandStatusDto`;
* mapa de transições válidas;
* validação de fechamento somente após `CONCLUSAO_SINALIZADA`;
* validação de arquivamento somente após `CLOSED`;
* persistência de `closedAt` na transição para `CLOSED`;
* persistência de `archived = true` na transição para `ARQUIVADA`;
* registro dos eventos históricos correspondentes.

A máquina de estados passou a representar:

`NOVA → TRIAGEM → RESPONSAVEL_ATRIBUIDO → EM_ANDAMENTO → CONCLUSAO_SINALIZADA → CLOSED → ARQUIVADA`

Também foi mantida a possibilidade de rejeição da conclusão:

`CONCLUSAO_SINALIZADA → EM_ANDAMENTO`

#### Persistência

Foi criada e aplicada a migration:

`20260922150139_add_closed_demand_status`

O Prisma Client foi regenerado e o banco permaneceu sincronizado.

#### Validação técnica

* `docker compose exec backend npm run build` → concluído com sucesso;
* `docker compose exec backend npx eslint src` → concluído sem erros;
* `git diff --check` → concluído sem apontamentos.

#### Resultado

O BL-03.7 foi concluído.

O domínio passa a possuir o estado explícito `CLOSED`, separando o fechamento definitivo do arquivamento.

Os endpoints legados de fechamento e arquivamento permanecem preservados para consolidação posterior, conforme previsto no requisito RN043.

### BL-03.8 — Regras de atribuição e início da demanda

#### Objetivo

Consolidar a separação entre atribuição de responsável e início efetivo da execução, fazendo com que essas operações respeitem as condições da máquina de estados.

#### Implementação

A atribuição inicial passou a exigir que a demanda esteja em `TRIAGEM` e ainda não possua responsável.

A atribuição:

`TRIAGEM → RESPONSAVEL_ATRIBUIDO`

passou a ocorrer de forma atômica com a definição do responsável.

A atribuição não inicia a execução da demanda. O início efetivo continua representado por:

`RESPONSAVEL_ATRIBUIDO → EM_ANDAMENTO`

e somente o responsável atual pode realizar essa transição.

A remoção do responsável passou a ser permitida somente em `RESPONSAVEL_ATRIBUIDO`, retornando a demanda para:

`RESPONSAVEL_ATRIBUIDO → TRIAGEM`

Também foi removida a possibilidade de alteração de `responsibleId` pelo `PATCH /api/demands/:id`, evitando que a operação genérica contorne as regras específicas de atribuição.

#### Validação funcional

Foram utilizados os cenários `DEM-000016` e `DEM-000017`.

Foram validados com sucesso:

* atribuição por `ADMIN`: `200 OK`;
* transição automática para `RESPONSAVEL_ATRIBUIDO`;
* confirmação de que a atribuição não inicia a execução;
* segunda atribuição rejeitada com `400 Bad Request`;
* início pelo responsável atual com `200 OK`;
* tentativa de início por outro usuário rejeitada com `403 Forbidden`;
* remoção em `RESPONSAVEL_ATRIBUIDO` com `200 OK`;
* retorno da demanda para `TRIAGEM` após remoção;
* tentativa de remoção durante `EM_ANDAMENTO` rejeitada com `400 Bad Request`;
* tentativa de alterar `responsibleId` pelo `PATCH /:id` rejeitada com `400 Bad Request`;
* tentativa de atribuição por `STAFF` rejeitada com `403 Forbidden`.

#### Histórico

A atribuição passou a registrar:

* `RESPONSIBLE_ASSIGNED`;
* `STATUS_CHANGED`.

A remoção passou a registrar:

* `RESPONSIBLE_REMOVED`;
* `STATUS_CHANGED`.

Os retornos das consultas das demandas confirmaram a persistência dos eventos com o ator autenticado.

#### Validação técnica

* `docker compose exec backend npm run build` → concluído com sucesso;
* `docker compose exec backend npx eslint src` → concluído sem erros;
* `git diff --check` → concluído sem apontamentos.

#### Resultado

O BL-03.8 foi concluído.

A atribuição, o início e a remoção do responsável estão agora submetidos às condições explícitas da máquina de estados, sem possibilidade de alteração do responsável pelo fluxo genérico de edição.

#### Próximo incremento

**BL-03.9 — Conclusão, validação e rejeição da demanda.**

---

### BL-03.9 — Conclusão, validação e rejeição da demanda

#### Objetivo

Implementar a conclusão operacional da demanda, diferenciando a sinalização de conclusão realizada pelo responsável da validação definitiva realizada por outro usuário autorizado, além de permitir a rejeição da conclusão com justificativa obrigatória.

#### Implementação

Foram implementados os fluxos específicos de conclusão:

* `PATCH /api/demands/:id/completion`;
* `PATCH /api/demands/:id/completion/approve`;
* `PATCH /api/demands/:id/completion/reject`.

A sinalização de conclusão passou a respeitar o papel do responsável atual:

* `STAFF` responsável sinaliza a conclusão e move a demanda de `EM_ANDAMENTO` para `CONCLUSAO_SINALIZADA`;
* `MANAGER` responsável pode confirmar diretamente a conclusão, movendo a demanda para `CLOSED`;
* `ADMIN` responsável pode confirmar diretamente a conclusão, movendo a demanda para `CLOSED`.

Para demandas em `CONCLUSAO_SINALIZADA` cujo responsável é `STAFF`:

* `MANAGER` ou `ADMIN` pode aprovar a conclusão;
* a aprovação move a demanda para `CLOSED`;
* a aprovação registra o evento `COMPLETION_APPROVED`;
* a aprovação também registra `STATUS_CHANGED` e `CLOSED`.

A rejeição da conclusão:

* é permitida para `MANAGER` ou `ADMIN`;
* retorna a demanda de `CONCLUSAO_SINALIZADA` para `EM_ANDAMENTO`;
* exige comentário obrigatório;
* registra o evento `COMPLETION_REJECTED` com o comentário informado;
* registra também `STATUS_CHANGED`.

O modelo `DemandHistory` foi evoluído para armazenar comentário opcional associado ao evento histórico.

Também foram adicionados ao enum persistente `DemandHistoryType` os eventos:

* `COMPLETION_APPROVED`;
* `COMPLETION_REJECTED`.

#### Consolidação das transições de conclusão

O endpoint genérico:

`PATCH /api/demands/:id/status`

deixou de permitir diretamente as transições relacionadas à conclusão:

* `EM_ANDAMENTO → CONCLUSAO_SINALIZADA`;
* `CONCLUSAO_SINALIZADA → CLOSED`;
* `CONCLUSAO_SINALIZADA → EM_ANDAMENTO`.

Essas transições devem ocorrer exclusivamente pelos endpoints específicos de conclusão, preservando as regras de autorização, validação e comentário obrigatório da rejeição.

#### Persistência

Foram criadas e aplicadas as migrations:

* `20260922192025_add_completion_history_types`;
* `20260922193112_add_demand_history_comment`.

O Prisma Client foi regenerado e o banco permaneceu sincronizado.

#### Validação funcional

Foram validados com sucesso:

* `STAFF` responsável sinalizando conclusão → `200 OK`;
* transição `EM_ANDAMENTO → CONCLUSAO_SINALIZADA`;
* `STAFF` sem permissão para aprovar a própria conclusão → `403 Forbidden`;
* `MANAGER` aprovando conclusão de `STAFF` → `200 OK`;
* transição para `CLOSED`;
* registro dos eventos `COMPLETION_APPROVED`, `STATUS_CHANGED` e `CLOSED`;
* `MANAGER` rejeitando conclusão de `STAFF` → `200 OK`;
* retorno para `EM_ANDAMENTO`;
* persistência do comentário da rejeição em `COMPLETION_REJECTED`;
* rejeição sem comentário → `400 Bad Request`;
* `MANAGER` responsável confirmando diretamente a conclusão → `200 OK`;
* `ADMIN` responsável confirmando diretamente a conclusão → `200 OK`;
* fechamento direto por responsável `MANAGER`/`ADMIN` sem necessidade de evento `COMPLETION_APPROVED`.

Também foram validadas as tentativas de contornar os fluxos específicos utilizando `PATCH /api/demands/:id/status`:

* `EM_ANDAMENTO → CONCLUSAO_SINALIZADA` → `400 Bad Request`;
* `CONCLUSAO_SINALIZADA → CLOSED` → `400 Bad Request`;
* `CONCLUSAO_SINALIZADA → EM_ANDAMENTO` → `400 Bad Request`.

As três tentativas retornaram a mensagem:

`A transição de conclusão deve ser realizada pelos endpoints específicos de conclusão.`

#### Validação técnica

Foram executados com sucesso:

* `docker compose exec backend npm run build`;
* `docker compose exec backend npx eslint src`;
* `git diff --check`.

O build foi concluído sem erros, o ESLint terminou sem apontamentos e o `git diff --check` não apresentou problemas.

#### Resultado

O BL-03.9 foi concluído.

O domínio de Demand possui agora fluxos explícitos para sinalização, validação e rejeição da conclusão, diferenciando a conclusão realizada por `STAFF` daquela realizada diretamente por `MANAGER` ou `ADMIN`.

A rejeição exige justificativa persistida no histórico, e as transições de conclusão não podem mais ser executadas pelo endpoint genérico de alteração de status.

#### Observação

Os endpoints legados `/close` e `/archive` permanecem preservados e ainda deverão ser reconciliados integralmente com a máquina de estados, conforme previsto na RN043.

#### Próximo incremento

**BL-03.9.4 — Convergência dos endpoints legados `/close` e `/archive` com a máquina de estados.**
