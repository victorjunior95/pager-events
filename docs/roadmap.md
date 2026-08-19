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

### Status

⚪ Não iniciado

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
