# Especificação de Requisitos

**Projeto:** Pager  
**Versão:** 1.0  
**Status:** Em elaboração

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

## Staff

Responsável pela criação de demandas.

---

## Responsável

Executa a demanda atribuída.

Atualiza andamento.

Registra comentários.

---

## Supervisor

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

---

## Demanda

Representa uma necessidade operacional registrada durante o evento.

---

## Comentário

Registro operacional realizado pelo responsável.

---

## Histórico

Registro automático das alterações estruturais.

---

## Observador

Usuário que acompanha uma demanda.

---

## Notificação

Comunicação automática gerada pelo sistema.

---

# 6. Regras de Negócio

- qualquer usuário pode criar uma demanda;
- toda demanda nasce como Nova;
- somente supervisores atribuem responsáveis;
- somente supervisores alteram urgência;
- somente responsáveis registram comentários;
- somente responsáveis sinalizam conclusão;
- somente supervisores encerram definitivamente uma demanda;
- alterações estruturais geram histórico;
- notificações são automáticas.

---

# 7. Fluxo Operacional

Nova

↓

Triagem

↓

Responsável atribuído

↓

Em andamento

↓

Conclusão sinalizada

↓

Arquivada

---

# 8. Requisitos Funcionais

## RF001

Cadastrar usuários.

---

## RF002

Cadastrar áreas.

---

## RF003

Criar demanda.

---

## RF004

Editar demanda.

---

## RF005

Atribuir responsável.

---

## RF006

Atualizar andamento.

---

## RF007

Registrar comentários.

---

## RF008

Visualizar histórico.

---

## RF009

Receber notificações.

---

## RF010

Arquivar demanda.

---

## RF011

Consultar indicadores.

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

Arquivar demanda.

UC005

Consultar painel.

---

# 11. Restrições

- somente usuários autenticados podem utilizar o sistema;
- toda demanda pertence a pelo menos uma área;
- todo usuário pertence a pelo menos uma área;
- comentários não podem ser alterados após publicação.

---

# 12. Fora do Escopo

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

# 13. Evoluções Futuras

O projeto poderá incorporar futuramente:

- dashboard analítico;
- aplicativo móvel;
- integração com calendários;
- autenticação corporativa;
- exportação de relatórios;
- integrações com plataformas externas.