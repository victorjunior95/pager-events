# Convenções de Desenvolvimento

**Projeto:** Pager  
**Versão:** 1.0  
**Status:** Em elaboração

---

# 1. Objetivo

Este documento estabelece as convenções oficiais de desenvolvimento do projeto **Pager**.

Seu objetivo é padronizar a implementação do sistema, garantindo consistência entre código, documentação, banco de dados e versionamento.

Todas as contribuições ao projeto devem seguir estas convenções.

---

# 2. Idioma

Cada parte do projeto possui um idioma definido.

| Elemento | Idioma |
|----------|---------|
| Interface do usuário | Português (pt-BR) |
| Código-fonte | Inglês |
| Banco de dados | Inglês |
| APIs | Inglês |
| Documentação técnica | Português |
| Comentários de código | Português (quando realmente necessários) |

Exemplos:

Frontend

```
Nova Demanda
```

Classe

```ts
DemandService
```

Tabela

```
demands
```

Campo

```
created_at
```

---

# 3. Estrutura do Projeto

```
pager/

backend/

frontend/

database/

docker/

scripts/

docs/
```

Cada diretório possui uma responsabilidade única.

---

# 4. Convenções de Nomenclatura

## Diretórios

Sempre utilizar:

```
kebab-case
```

Exemplo

```
auth-module

user-profile
```

---

## Arquivos

Sempre utilizar:

```
kebab-case
```

Exemplos

```
demand.service.ts

create-demand.dto.ts

user.controller.ts
```

---

## Classes

Sempre utilizar:

```
PascalCase
```

Exemplo

```ts
DemandService

UserController

NotificationGateway
```

---

## Interfaces

Sempre utilizar:

```
PascalCase
```

Sem prefixo "I".

Exemplo

```ts
UserRepository

DemandGateway
```

---

## Métodos

Sempre utilizar:

```
camelCase
```

```ts
createDemand()

updateStatus()

findById()
```

---

## Variáveis

Sempre utilizar:

```
camelCase
```

```ts
currentUser

createdDemand
```

---

## Constantes

Sempre utilizar:

```
UPPER_SNAKE_CASE
```

```ts
MAX_LOGIN_ATTEMPTS

JWT_SECRET
```

---

## Enum

Sempre utilizar:

```
PascalCase
```

Valores:

```
UPPER_SNAKE_CASE
```

Exemplo

```ts
enum DemandStatus {

    NEW,

    TRIAGE,

    IN_PROGRESS

}
```

---

# 5. Banco de Dados

## Tabelas

Sempre:

```
snake_case

plural
```

Exemplo

```
users

demands

notifications
```

---

## Colunas

Sempre:

```
snake_case
```

Exemplo

```
created_at

updated_at

responsible_id
```

---

## Chaves Primárias

Sempre:

```
id
```

Tipo:

```
UUID
```

---

## Chaves Estrangeiras

Sempre:

```
<entidade>_id
```

Exemplo

```
user_id

demand_id
```

---

# 6. Git

## Branch principal

```
main
```

---

## Desenvolvimento

```
develop
```

---

## Features

```
feature/nome-da-feature
```

---

## Correções

```
fix/nome-do-bug
```

---

# 7. Commits

Seguir o padrão Conventional Commits.

Exemplos

```
feat:

fix:

docs:

refactor:

test:

style:

chore:
```

---

# 8. Formatação

Ferramentas oficiais

- ESLint
- Prettier

Não serão aceitas formatações manuais conflitantes.

---

# 9. Princípios Gerais

O desenvolvimento seguirá os seguintes princípios:

- simplicidade acima de complexidade;
- legibilidade acima de otimizações prematuras;
- baixo acoplamento;
- alta coesão;
- documentação sempre atualizada;
- código limpo;
- implementação incremental;
- nenhuma funcionalidade parcialmente concluída será considerada finalizada.

---

# 10. Atualização deste Documento

Este documento poderá ser atualizado durante o desenvolvimento.

Toda alteração deverá ser registrada no Diário de Implementação e, quando representar uma decisão arquitetural relevante, também deverá originar um ADR.