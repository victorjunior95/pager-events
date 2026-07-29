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

## RN001

Qualquer usuário autenticado pode criar demandas.

---

## RN002

Toda demanda inicia no status Nova.

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

Somente responsáveis sinalizam conclusão.

---

## RN009

Somente supervisores encerram definitivamente uma demanda.

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

---

### RF009

Editar demanda.

---

### RF010

Atualizar responsável.

---

### RF011

Alterar urgência.

---

### RF012

Alterar status.

---

### RF013

Arquivar demanda.

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