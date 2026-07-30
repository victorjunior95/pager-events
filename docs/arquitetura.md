# Arquitetura do Sistema

**Projeto:** Pager
**Versão:** 1.0
**Status:** Versão inicial consolidada

---

# 1. Objetivo

Este documento descreve a arquitetura do sistema Pager, apresentando sua organização estrutural, os princípios arquiteturais adotados, os componentes que compõem a solução e as decisões técnicas que orientam sua implementação.

Seu objetivo é servir como referência para o desenvolvimento, manutenção e evolução do projeto, garantindo consistência entre os diferentes módulos da aplicação.

---

# 2. Visão Arquitetural

O Pager foi concebido como uma aplicação web modular voltada ao gerenciamento operacional de demandas durante eventos presenciais.

A solução é composta por uma aplicação cliente (Frontend), uma API (Backend) e uma camada de persistência responsável pelo armazenamento permanente das informações.

A comunicação entre cliente e servidor ocorre por meio de APIs REST para operações de negócio e WebSockets para sincronização de eventos em tempo real.

De forma conceitual, a arquitetura pode ser representada da seguinte maneira:

```text
Usuários
    │
    ▼
Frontend
    │
 REST API
    │
    ▼
Backend
    │
 Prisma ORM
    │
    ▼
PostgreSQL

      ▲
      │
WebSocket
```

---

# 3. Princípios Arquiteturais

O desenvolvimento do Pager seguirá os seguintes princípios:

## Modularidade

Cada contexto funcional será implementado como um módulo independente, concentrando suas responsabilidades e reduzindo o acoplamento entre diferentes partes da aplicação.

---

## Alta Coesão

Cada módulo deverá possuir responsabilidades claramente definidas, evitando concentração excessiva de funcionalidades em um mesmo componente.

---

## Baixo Acoplamento

A comunicação entre módulos deverá ocorrer exclusivamente por meio de contratos bem definidos, evitando dependências diretas desnecessárias.

---

## Evolução Incremental

A arquitetura deverá permitir a inclusão de novos módulos e funcionalidades sem necessidade de reestruturação significativa da aplicação.

---

## Separação de Responsabilidades

Cada camada da aplicação possuirá responsabilidades específicas, evitando mistura entre regras de negócio, infraestrutura e apresentação.

---

## Centralização das Regras de Negócio

As regras de negócio deverão ser implementadas exclusivamente no Backend.

O Frontend será responsável apenas pela apresentação das informações e interação com o usuário.

---

# 4. Organização da Solução

A solução será organizada em três grandes componentes.

## Frontend

Responsável pela interface do usuário.

* apresentação das informações;
* interação do usuário;
* comunicação com a API;
* comunicação WebSocket;
* gerenciamento do estado da interface.

---

## Backend

Responsável por toda a lógica da aplicação.

* autenticação;
* autorização;
* regras de negócio;
* validações;
* persistência;
* notificações;
* processamento das demandas.

---

## Banco de Dados

Responsável pelo armazenamento permanente dos dados da aplicação.

---

# 5. Arquitetura Física

A arquitetura física do projeto será composta pelos seguintes componentes tecnológicos.

| Camada          | Tecnologia     |
| --------------- | -------------- |
| Frontend        | React          |
| Backend         | NestJS         |
| ORM             | Prisma         |
| Banco de Dados  | PostgreSQL     |
| Tempo Real      | WebSocket      |
| Containerização | Docker Compose |

---

# 6. Arquitetura do Backend

O Backend adotará Arquitetura Modular utilizando a estrutura nativa do NestJS.

Cada módulo representará um contexto funcional do domínio da aplicação.

Os módulos inicialmente previstos são:

* Auth
* Users
* Areas
* Demands
* Comments
* History
* Notifications
* Observers

Cada módulo concentrará seus próprios componentes internos, como controladores, serviços, DTOs, entidades e repositórios, preservando encapsulamento e independência.

---

# 7. Arquitetura do Frontend

O Frontend será organizado de forma híbrida, separando componentes reutilizáveis da implementação específica dos módulos do sistema.

Estrutura prevista:

```text
src/

pages/
layouts/
components/
hooks/
services/
contexts/
modules/
shared/
```

## pages

Define as páginas acessíveis pelo usuário.

## layouts

Define os layouts compartilhados entre páginas.

## components

Componentes reutilizáveis em toda a aplicação.

## hooks

Hooks customizados.

## services

Comunicação com APIs e demais serviços externos.

## contexts

Gerenciamento de estados globais.

## modules

Implementação das funcionalidades específicas do domínio.

## shared

Tipos, constantes, utilitários e recursos compartilhados.

---

# 8. Comunicação entre Componentes

## REST

Todas as operações de negócio serão realizadas por meio de APIs REST.

Exemplos:

* autenticação;
* gerenciamento de usuários;
* gerenciamento de áreas;
* criação de demandas;
* consultas;
* indicadores.

---

## WebSocket

Eventos em tempo real serão transmitidos utilizando WebSocket.

Exemplos:

* novas demandas;
* atualização de status;
* novos comentários;
* notificações;
* alteração de responsáveis.

---

# 9. Persistência

A persistência será realizada utilizando PostgreSQL através do Prisma ORM.

Todos os modelos serão definidos de forma centralizada no schema do Prisma.

As migrações serão controladas pelo próprio Prisma.

Todos os identificadores primários utilizarão UUID.

---

# 10. Segurança

O sistema utilizará autenticação baseada em JWT.

A autorização será implementada utilizando RBAC (Role-Based Access Control).

Papéis previstos:

* Staff
* Responsável
* Supervisor

Todas as validações de autorização ocorrerão exclusivamente no Backend.

O Frontend poderá ocultar funcionalidades conforme o perfil do usuário apenas para melhorar a experiência de uso, nunca como mecanismo de segurança.

---

# 11. Estratégia de Tempo Real

O Pager utilizará WebSocket para sincronização dos eventos operacionais durante a execução dos eventos presenciais.

O uso de WebSocket será restrito às operações que exigem atualização imediata da interface.

Operações de consulta e manutenção permanecerão utilizando REST.

---

# 12. Estrutura do Repositório

```text
pager/

backend/
frontend/
database/
docker/
scripts/
docs/

.env.example
docker-compose.yml
```

## docs

Documentação oficial do projeto.

## backend

Código da API.

## frontend

Código da interface.

## database

Scripts relacionados ao banco de dados.

## docker

Arquivos de containerização.

## scripts

Scripts auxiliares de desenvolvimento.

---

# 13. Estratégia de Escalabilidade

A arquitetura foi concebida para permitir crescimento incremental.

Novos módulos poderão ser incorporados sem necessidade de alterações estruturais nos módulos existentes.

A separação entre Frontend, Backend e Banco de Dados também permite evolução independente de cada componente.

---

# 14. Diretrizes Arquiteturais

As seguintes diretrizes deverão ser preservadas durante toda a evolução do projeto:

* organização por domínio;
* modularidade;
* baixo acoplamento;
* alta coesão;
* separação clara de responsabilidades;
* regras de negócio centralizadas no Backend;
* comunicação REST para operações de negócio;
* WebSocket apenas para eventos em tempo real;
* utilização de UUID como identificador primário;
* desenvolvimento incremental orientado por módulos.

---

# 15. Relação com a Documentação do Projeto

Este documento complementa os demais artefatos da documentação do Pager.

* **`requisitos.md`** define o comportamento esperado do sistema e as regras do domínio.
* **`arquitetura.md`** descreve como o sistema está organizado tecnicamente.
* **`roadmap.md`** estabelece a ordem planejada de implementação.
* **`diario.md`** registra a evolução histórica do desenvolvimento.
* **ADRs** documentam decisões arquiteturais específicas que complementam este documento quando necessário.

Este documento deverá ser atualizado apenas quando houver mudanças estruturais na arquitetura da solução.
