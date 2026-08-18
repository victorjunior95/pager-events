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
