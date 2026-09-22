# Especificação de Requisitos

**Projeto:** Pager  
**Versão:** 1.0  
**Status:** Em evolução

---

# 1. Visão Geral

O Pager é um sistema web destinado ao gerenciamento operacional de demandas durante a execução de eventos presenciais.

Seu objetivo é centralizar a abertura, distribuição, acompanhamento e conclusão de demandas operacionais em tempo real, promovendo comunicação estruturada entre equipes, responsáveis e supervisores.

O sistema prioriza simplicidade operacional, rapidez no registro de ocorrências e rastreabilidade das ações executadas.

---

# 2. Objetivos

O Pager possui os seguintes objetivos:

- centralizar todas as demandas operacionais;
- permitir o acompanhamento em tempo real;
- reduzir comunicação informal;
- registrar histórico das ações;
- facilitar a coordenação operacional;
- gerar informações para análise posterior.

---

# 3. Escopo

O sistema contempla:

- cadastro de usuários;
- cadastro de áreas;
- abertura de demandas;
- distribuição de responsabilidades;
- atualização de andamento;
- comentários operacionais;
- notificações;
- acompanhamento em tempo real;
- arquivamento de demandas;
- indicadores operacionais.

---

# 4. Atores

## Staff/`STAFF`

Usuário operacional.

Responsável pela criação de demandas.

---

## Responsável/`MANAGER`

Usuário com atribuições de supervisão.

Executa a demanda atribuída.

Atualiza andamento.

Registra comentários.

---

## Supervisor/`ADMIN`

Usuário com atribuições administrativas.

Coordena toda a operação.

Distribui demandas.

Altera prioridades.

Confirma encerramentos.

---

# 5. Conceitos do Domínio

## Área

Representa qualquer unidade operacional do evento.

Exemplos:

- Infraestrutura
- Comunicação
- Produção
- Operação
- Segurança
- Recepção

### Tipos de Área

As áreas do Pager são classificadas em três tipos:

- `SETOR`: representa uma unidade ou setor operacional;
- `LOCAL`: representa uma localização física ou espaço do evento;
- `EQUIPE`: representa um agrupamento operacional de pessoas.

---

## Demanda

Representa uma necessidade operacional registrada durante o evento.

Toda demanda possui um status que representa sua etapa atual no ciclo operacional.

As mudanças de status obedecem a transições definidas pelo domínio e não podem ocorrer arbitrariamente.

---

## Comentário

Registro operacional realizado pelo responsável.

Em situações de rejeição de conclusão, o comentário também pode ser utilizado para registrar obrigatoriamente o motivo da rejeição e as informações que precisam ser complementadas.

---

## Histórico

Registro automático das alterações estruturais.

O histórico deve permitir identificar a alteração realizada e, quando disponível, o usuário que a executou.

```text
atribuição:
RESPONSIBLE_ASSIGNED
STATUS_CHANGED

início:
STATUS_CHANGED

sinalização:
STATUS_CHANGED

rejeição:
STATUS_CHANGED

fechamento:
STATUS_CHANGED
CLOSED

arquivamento:
STATUS_CHANGED
ARCHIVED
```

---

## Observador

Usuário que acompanha uma demanda.

---

## Notificação

Comunicação automática gerada pelo sistema.

---

# 6. Regras de Negócio

## RN001

Qualquer usuário autenticado pode criar demandas.

---

## RN002

Toda demanda inicia no status `NOVA`.

---

## RN003

Toda demanda possui exatamente um criador.

---

## RN004

Uma demanda possui no máximo um responsável ativo.

---

## RN005

Somente supervisores alteram urgência.

---

## RN006

Somente supervisores alteram responsável.

---

## RN007

Somente responsáveis registram comentários.

---

## RN008

Somente o responsável atual da demanda pode sinalizar sua conclusão.

---

## RN009

A confirmação definitiva de uma conclusão é realizada por um usuário com papel `MANAGER` ou `ADMIN`, quando a demanda estiver sob responsabilidade de `STAFF`.

---

## RN010

Toda alteração estrutural gera histórico.

---

## RN011

Notificações são automáticas.

---

## RN012

Todo usuário pertence a pelo menos uma área.

---

## RN013

Toda demanda pertence a pelo menos uma área.

---

## RN014

Somente usuários com papel `ADMIN` podem cadastrar usuários;

---

## RN015

Somente usuários com papel `ADMIN` podem editar usuários;

---

## RN016

Somente usuários com papel `ADMIN` podem desativar usuários;

---

## RN017

Somente usuários com papel `ADMIN` podem alterar o papel de outro usuário;

---

## RN018

O papel do próprio usuário não pode ser alterado pelo próprio usuário;

---

## RN019

O email do usuário é imutável após o cadastro;

---

## RN020

O próprio usuário pode alterar seu nome;

---

## RN021

O próprio usuário pode alterar sua senha;

---

## RN022

O próprio usuário não pode alterar suas áreas;

---

## RN023

Todo usuário deve possuir pelo menos uma área;

---

## RN024

Um usuário pode estar associado a múltiplas áreas;

---

## RN025

A associação entre usuários e áreas é persistente;

---

## RN026

A desativação de um usuário é lógica, não física;

---

## RN027

Usuários desativados não podem realizar autenticação;

---

## RN028

A tentativa de autenticação de um usuário desativado deve informar que o usuário não está ativo e orientá-lo a procurar um administrador caso tenha dúvidas.

---

## RN029

Um `ADMIN` não pode ser desativado quando ele for o único administrador ativo do sistema.

---

## RN030

A atribuição de um responsável a uma demanda sem responsável deve alterar automaticamente seu status para `RESPONSAVEL_ATRIBUIDO`, quando a demanda estiver em uma etapa compatível com essa transição.

---

## RN031

A atribuição de um responsável não significa o início da execução da demanda. A transição para `EM_ANDAMENTO` representa o início efetivo do tratamento operacional.

---

## RN032

O ciclo de vida das demandas utiliza exclusivamente os seguintes estados:

- `NOVA`;
- `TRIAGEM`;
- `RESPONSAVEL_ATRIBUIDO`;
- `EM_ANDAMENTO`;
- `CONCLUSAO_SINALIZADA`;
- `CLOSED`;
- `ARQUIVADA`.

---

## RN033

Somente transições válidas da máquina de estados podem alterar o status de uma demanda.

---

## RN034

Uma demanda em `EM_ANDAMENTO` pode ter sua conclusão sinalizada somente pelo seu responsável atual, passando para `CONCLUSAO_SINALIZADA`.

---

## RN035

Quando o responsável for `STAFF`, uma demanda em `CONCLUSAO_SINALIZADA` deverá ser validada por `MANAGER` ou `ADMIN`.

---

## RN036

A rejeição de uma conclusão sinalizada por `STAFF` deve retornar a demanda para `EM_ANDAMENTO` e exigir comentário obrigatório descrevendo o motivo da rejeição ou as informações que precisam ser complementadas.

---

## RN037

A aprovação de uma conclusão sinalizada por `STAFF` deve alterar o status da demanda para `CLOSED`.

---

## RN038

Quando o responsável atual for `MANAGER` ou `ADMIN`, não será necessária uma etapa adicional de validação por outro usuário. A conclusão poderá ser confirmada diretamente, produzindo o fechamento da demanda.

---

## RN039

O fechamento definitivo de uma demanda é representado pelo estado `CLOSED`.

---

## RN040

Uma demanda somente poderá ser arquivada após seu fechamento definitivo.

---

## RN041

No fluxo de conclusão de uma demanda cujo responsável seja `MANAGER` ou `ADMIN`, o fechamento e o arquivamento poderão ocorrer como uma operação composta, desde que o fechamento em `CLOSED` seja respeitado como etapa de domínio.

---

## RN042

Uma demanda em `ARQUIVADA` não pode retornar para estados operacionais por meio das transições ordinárias.

---

## RN043

Os endpoints legados de fechamento e arquivamento devem respeitar as mesmas regras da máquina de estados e não podem produzir combinações de status, fechamento e arquivamento incompatíveis com o ciclo de vida definido.

---

# 7. Fluxo Operacional

```text
NOVA
  │
  ▼
TRIAGEM
  │
  ▼
RESPONSAVEL_ATRIBUIDO
  │
  ▼
EM_ANDAMENTO ◀ ───────────────────────────────────┐
  │                                               │
  ▼                                               │
CONCLUSAO_SINALIZADA ───── rejeitada ─────────────┘
  │
  └────────────── aprovada ───────────────► CLOSED
                                             │
                                             ▼
                                         ARQUIVADA
```

---

## 7.1 Estados da Demanda

`NOVA`

Demanda recém-criada e ainda não encaminhada para tratamento.

`TRIAGEM`

Demanda em avaliação e distribuição operacional.

`RESPONSAVEL_ATRIBUIDO`

Demanda que possui responsável definido, mas ainda não foi iniciada.

`EM_ANDAMENTO`

Demanda cujo tratamento operacional está em execução.

`CONCLUSAO_SINALIZADA`

O responsável informou que considera o atendimento concluído, aguardando a confirmação necessária.

`CLOSED`

Demanda definitivamente encerrada.

`ARQUIVADA`

Demanda encerrada e retirada da operação corrente, permanecendo disponível para consulta histórica.

---

## 7.2 Transições Válidas

As transições ordinárias do ciclo de vida são:

| Estado atual            | Próximo estado          | Condição                                     |
| ----------------------- | ----------------------- | -------------------------------------------- |
| `NOVA`                  | `TRIAGEM`               | encaminhamento para triagem                  |
| `TRIAGEM`               | `RESPONSAVEL_ATRIBUIDO` | atribuição de responsável                    |
| `RESPONSAVEL_ATRIBUIDO` | `EM_ANDAMENTO`          | início do tratamento                         |
| `EM_ANDAMENTO`          | `CONCLUSAO_SINALIZADA`  | sinalização pelo responsável               |
| `CONCLUSAO_SINALIZADA`  | `EM_ANDAMENTO`          | rejeição da conclusão                          |
| `CONCLUSAO_SINALIZADA`  | `CLOSED`                | aprovação da conclusão                         |
| `CLOSED`                | `ARQUIVADA`             | arquivamento                                 |

Quando o responsável for `MANAGER` ou `ADMIN`, a confirmação da conclusão poderá executar de forma composta as etapas:

`CONCLUSAO_SINALIZADA → CLOSED → ARQUIVADA`

---

## 7.3 Regras de Transição

Não é permitido:

- pular diretamente de NOVA para EM_ANDAMENTO;
- pular diretamente de TRIAGEM para EM_ANDAMENTO sem responsável;
- arquivar uma demanda que não esteja fechada;
- fechar uma demanda sem que sua conclusão tenha sido sinalizada, exceto quando a própria operação de confirmação representar explicitamente a conclusão sinalizada e o fechamento no mesmo fluxo autorizado;
- alterar arbitrariamente o status por meio de um valor que não represente uma transição válida;
- reabrir uma demanda arquivada por meio das transições ordinárias.

A substituição de um responsável existente não deve, por si só, reiniciar o ciclo da demanda. Por exemplo, uma demanda em EM_ANDAMENTO que tenha seu responsável substituído permanece em EM_ANDAMENTO, salvo se outra regra de domínio determinar uma transição diferente.

---

# 8. Requisitos Funcionais

## 8.1 Autenticação

### RF001

Autenticar usuário.

---

### RF002

Encerrar sessão.

---

## 8.2 Usuários

### RF003

Cadastrar usuário.

---

### RF004

Editar usuário.

---

### RF005

Desativar usuário.

---

## 8.3 Áreas

### RF006

Cadastrar área.

---

### RF007

Editar área.

---

## 8.4 Demandas

### RF008

Criar demanda.

A demanda deverá ser criada no status `NOVA`.

---

### RF009

Editar demanda.

---

### RF010

Atualizar responsável.

Permitir a atribuição, substituição e remoção do responsável conforme as regras de autorização.

A atribuição inicial de um responsável deverá produzir automaticamente a transição para `RESPONSAVEL_ATRIBUIDO`, quando aplicável.

A substituição de um responsável existente não deverá, por si só, reiniciar o ciclo operacional da demanda.

---

### RF011

Alterar urgência.

---

### RF012

Alterar status.

Permitir somente transições de status válidas segundo a máquina de estados da demanda e as regras de autorização correspondentes.

A alteração de status deve respeitar as condições de entrada e saída de cada estado.

---

### RF013

Arquivar demanda.

Permitir o arquivamento de uma demanda somente após seu fechamento definitivo.

O arquivamento deverá produzir a transição para `ARQUIVADA` e preservar o histórico da alteração.

---

## 8.5 Comentários

### RF014

Registrar comentário.

---

### RF015

Consultar comentários.

---

## 8.6 Histórico

### RF016

Registrar histórico.

As alterações estruturais de status, urgência e responsável deverão ser registradas automaticamente.

Os eventos de fechamento e arquivamento também deverão ser registrados.

---

### RF017

Consultar histórico.

---

## 8.7 Observadores

### RF018

Adicionar observador.

---

### RF019

Remover observador.

---

### RF020

Gerenciar notificações.

---

## 8.8 Indicadores

### RF021

Consultar painel.

---

### RF022

Consultar métricas.

---

## 8.9 Conclusão e Encerramento

### RF023

Sinalizar conclusão.

Permitir que o responsável atual sinalize a conclusão da demanda, alterando o status para `CONCLUSAO_SINALIZADA`.

---

### RF024

Validar conclusão.

Permitir que `MANAGER` ou `ADMIN` validem uma conclusão sinalizada por `STAFF`, podendo:

rejeitar a conclusão, retornando a demanda para `EM_ANDAMENTO` mediante comentário obrigatório;

aprovar a conclusão, alterando a demanda para `CLOSED`.

Quando o responsável for `MANAGER` ou `ADMIN`, a confirmação poderá ocorrer sem uma segunda validação por outro usuário.

---

# 9. Requisitos Não Funcionais

O sistema deverá:

- possuir interface responsiva;
- operar em tempo real;
- registrar auditoria das alterações;
- suportar múltiplos usuários simultaneamente;
- possuir autenticação;
- possuir autorização baseada em perfis;
- permitir expansão modular.

---

# 10. Casos de Uso

UC001

Criar demanda.

UC002

Atribuir responsável.

UC003

Atualizar andamento.

UC004

Encerrar e Arquivar demanda.

UC005

Consultar painel.

---

## UC004 — Encerrar e arquivar demanda

O encerramento de uma demanda segue o ciclo:

```text
CONCLUSAO_SINALIZADA

↓

validação, quando necessária

↓

CLOSED

↓

ARQUIVADA
```

Para demandas sob responsabilidade de `MANAGER` ou `ADMIN`, o fechamento e o arquivamento poderão ser executados como uma operação composta, respeitando as regras de domínio e o registro histórico das etapas.

---

# 11. Princípios do Produto

O desenvolvimento do Pager seguirá os seguintes princípios:

- Operação em primeiro lugar.

O sistema deve priorizar rapidez e eficiência operacional em detrimento de funcionalidades secundárias.

- Simplicidade de uso.

As tarefas mais frequentes devem exigir o menor número possível de interações.

- Informação atualizada.

Os usuários devem visualizar o estado mais recente da operação, minimizando atrasos na comunicação.

- Rastreabilidade.

Toda ação relevante realizada no sistema deve ser passível de auditoria.

- Consistência.

A informação deve existir em um único local, evitando duplicidade de registros.

- Evolução incremental.

Novas funcionalidades deverão preservar compatibilidade com o modelo de domínio existente sempre que possível.

---

# 12. Premissas Operacionais

O Pager foi concebido considerando as seguintes premissas:

- O sistema será utilizado durante a execução de eventos presenciais.

- Todos os usuários serão previamente cadastrados.

- Todo usuário pertence a uma ou mais áreas.

- Toda demanda possui exatamente um criador.

- Uma demanda pode possuir apenas um responsável ativo por vez.

- A supervisão possui visão completa da operação.

- Atualizações operacionais serão registradas pelos responsáveis.

- Demandas permanecem disponíveis para consulta mesmo após arquivadas.

- O sistema deve permanecer operacional durante todo o período do evento.

---

# 13. Restrições

- somente usuários autenticados podem utilizar o sistema;
- toda demanda pertence a pelo menos uma área;
- todo usuário pertence a pelo menos uma área;
- comentários não podem ser alterados após publicação.

---

# 14. Fora do Escopo

Nesta versão inicial não fazem parte do sistema:

- aplicativo mobile;
- integração com WhatsApp;
- integração com e-mail;
- geolocalização;
- anexos em demandas;
- chatbot;
- relatórios avançados;
- automações baseadas em IA.

---

# 15. Evoluções Futuras

O projeto poderá incorporar futuramente:

- dashboard analítico;
- aplicativo móvel;
- integração com calendários;
- autenticação corporativa;
- exportação de relatórios;
- integrações com plataformas externas.
