# Pager

> Sistema web para gerenciamento operacional de demandas em tempo real durante eventos presenciais.

---

# Visão Geral

O **Pager** é uma plataforma desenvolvida para apoiar a coordenação operacional de eventos, permitindo o registro, acompanhamento e gerenciamento de demandas em tempo real.

Seu objetivo é centralizar a comunicação operacional entre equipes, responsáveis e supervisores, oferecendo rastreabilidade, visibilidade do andamento das atividades e apoio à tomada de decisão durante a execução do evento.

O desenvolvimento do projeto é orientado por documentação, arquitetura modular e evolução incremental, garantindo consistência entre os requisitos do domínio, as decisões arquiteturais e a implementação do software.

---

Estado Atual

Fundação Técnica

████████░░

45%

---

# Objetivos do Projeto

* Centralizar a gestão operacional de demandas.
* Permitir acompanhamento em tempo real das atividades.
* Registrar histórico completo das ações realizadas.
* Facilitar a comunicação entre equipes durante eventos.
* Disponibilizar indicadores para apoio à supervisão operacional.
* Manter uma arquitetura preparada para evolução contínua.

---

# Arquitetura da Solução

O Pager é composto por três componentes principais:

* **Frontend**: interface web responsável pela interação com os usuários.
* **Backend**: API responsável pelas regras de negócio, autenticação, autorização e processamento das demandas.
* **Banco de Dados**: persistência das informações da aplicação.

A comunicação entre os componentes ocorre por meio de APIs REST e WebSockets, conforme definido na arquitetura do projeto.

---

# Estrutura do Projeto

```text
pager/
│
├── backend/
├── frontend/
├── database/
├── docker/
├── scripts/
├── docs/
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

# Documentação

Toda a documentação oficial do projeto encontra-se no diretório `docs/`.

| Documento        | Finalidade                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| `conventions.md` | Convenções de desenvolvimento adotadas pelo projeto.                           |
| `requisitos.md`  | Especificação funcional do domínio, regras de negócio e requisitos do sistema. |
| `arquitetura.md` | Organização arquitetural da solução e decisões estruturais.                    |
| `workflow.md`    | Processo oficial de desenvolvimento adotado pelo projeto.                      |
| `roadmap.md`     | Planejamento incremental das implementações.                                   |
| `diario.md`      | Registro histórico da evolução do desenvolvimento.                             |
| `adr/`           | Architecture Decision Records (ADRs).                                          |
| `diagrams/`      | Diagramas técnicos utilizados na documentação.                                 |
| `assets/`        | Recursos gráficos utilizados pela documentação.                                |

A leitura da documentação deve seguir, preferencialmente, a seguinte ordem:

1. `conventions.md` [link](./docs/conventions.md)
2. `requisitos.md` [link](./docs/requisitos.md)
3. `arquitetura.md` [link](./docs/arquitetura.md)
4. `workflow.md` [link](./docs/workflow.md)
5. `roadmap.md` [link](./docs/roadmap.md)
6. `diario.md` [link](./docs/diario.md)

---

# Fluxo de Desenvolvimento

O desenvolvimento do Pager segue um processo incremental e orientado por documentação.

Cada ciclo de implementação é conduzido conforme o workflow oficial do projeto:

1. Selecionar o próximo bloco do roadmap.
2. Avaliar impactos arquiteturais.
3. Registrar um ADR, quando necessário.
4. Implementar a funcionalidade.
5. Executar testes.
6. Atualizar a documentação correspondente.
7. Registrar a implementação em `diario.md`.
8. Atualizar o progresso em `roadmap.md`.
9. Iniciar o próximo ciclo de desenvolvimento.

---

# Estado Atual do Projeto

O projeto encontra-se em fase de **Fundação**, com a documentação estruturante consolidada e a preparação da infraestrutura técnica em andamento.

A evolução das funcionalidades é acompanhada pelo `roadmap.md`.

---

# Princípios do Projeto

O desenvolvimento do Pager é guiado pelos seguintes princípios:

* desenvolvimento incremental;
* organização por domínio;
* arquitetura modular;
* separação clara de responsabilidades;
* baixo acoplamento e alta coesão;
* documentação como parte integrante da implementação;
* decisões arquiteturais registradas e rastreáveis;
* foco em simplicidade, consistência e manutenibilidade.

---

# Licença

A licença do projeto será definida futuramente.
