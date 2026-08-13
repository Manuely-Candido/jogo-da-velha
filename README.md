# ❌⭕ Jogo da Velha (Tic-Tac-Toe) - Refatoração com React & Modern Front-End

> **Projeto Didático do Curso Técnico em Desenvolvimento de Sistemas**  
> **Orientação:** 

---

## 📋 Visão Geral

Esta aplicação consiste em um **Jogo da Velha (Tic-Tac-Toe)** interativo e responsivo desenvolvido com **React, Vite, Bootstrap e CSS Modules**.

O objetivo principal do projeto é **refatorar a versão básica** apresentada no [tutorial oficial do React](https://pt-br.react.dev/learn/tutorial-tic-tac-toe), evoluindo a estrutura do código monolítico para padrões modernos de arquitetura Front-end, Clean Code e responsividade.

### ✨ Principais Melhorias e Diferenciais da Versão Refatorada
- **Componentização Modular:** Separação rígida de responsabilidades entre componentes (`Game`, `Board`, `Square`, `StatusPanel`, `HistoryList`).
- **Arquitetura de Estilos:** Uso de **CSS Modules** combinados com variáveis CSS e metodologia **BEM (Block, Element, Modifier)** para evitar vazamento de escopo global.
- **Layout Responsivo:** Estruturação visual aprimorada com suporte ao **Bootstrap** para grid e utilitários.
- **Feedback Visual Claro:** Indicadores dedicados para turno atual, destaque de vitória, empates ("Velha") e navegação no histórico.
- **Gestão de Estado Imutável:** Manutenção limpa e previsível do estado com React Hooks (`useState`).

---

## 🎯 Objetivo

Refatorar a aplicação original do tutorial do React aplicando os conceitos estudados em aula:

- **Componentização e Reutilização:** Divisão do tabuleiro, botões e painéis em arquivos independentes.
- **Props e Estado (`useState`):** Elevação de estado (*lifting state up*) e garantia do princípio da imutabilidade no React.
- **Design System com CSS Modules:** Nomenclatura BEM (`.board__square--winner`, etc.) e variáveis globais para cores/tipografia.
- **Clean Code e Acessibilidade:** Nomes expressivos para funções e variáveis, HTML semântico e suporte a navegadores/dispositivos variados.

---

## 📜 Regras de Negócio

1. **Inicialização do Jogo:**
   - O tabuleiro inicia com um array de 9 posições vazias (`null`).
   - O primeiro jogador a jogar é sempre o símbolo **'X'**.
   - O histórico de jogadas e o contador de movimentos iniciam zerados.

2. **Interação Local (2 Jogadores):**
   - O jogo é disputado no mesmo dispositivo.
   - Alternância automática de turnos a cada jogada válida (`X` ➔ `O` ➔ `X`).

3. **Validação de Jogadas Inválidas:**
   - Uma jogada é bloqueada/ignorada se:
     - A célula selecionada já possuir um valor (`'X'` ou `'O'`).
     - A partida já tiver sido finalizada (por vitória ou empate).

4. **Determinação do Vencedor:**
   - A cada movimento, o estado é comparado contra 8 combinações vitoriosas (3 horizontais, 3 verticais e 2 diagonais).
   - O primeiro a alinhar 3 símbolos idênticos vence imediatamente.

5. **Critério de Empate ("Velha"):**
   - Ocorre quando todas as 9 posições estiverem preenchidas sem que haja um vencedor.
   - O painel exibe explicitamente o status de empate.

6. **Histórico de Jogadas & "Viagem no Tempo" (Time Travel):**
   - Armazenamento encadeado dos estados anteriores do tabuleiro no componente pai (`Game`).
   - Possibilidade de retornar a qualquer ponto da partida.
   - Caso uma nova jogada seja efetuada a partir de um ponto do histórico, as jogadas posteriores a ele são descartadas, criando uma nova linha temporal.

7. **Reinício do Jogo:**
   - Botão para reiniciar a partida a qualquer momento, restaurando o estado inicial do tabuleiro e limpando o histórico.

---

## ⚙️ Requisitos Funcionais

- [x] Permite iniciar e reiniciar uma partida.
- [x] Alterna automaticamente a vez entre os jogadores (`X` e `O`).
- [x] Impede jogadas sobre células já ocupadas ou após o fim da partida.
- [x] Detecta e exibe em tempo real vitórias e empates ("Velha").
- [x] Permite navegar no histórico de jogadas ("Time Travel").
- [x] Oferece layout responsivo para dispositivos móveis e desktop.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Descrição / Finalidade |
| :--- | :--- |
| **React (v18+)** | Biblioteca principal para construção da interface declarativa em componentes |
| **Vite** | Ferramenta de *build* e servidor de desenvolvimento ultra-rápido |
| **CSS Modules** | Escopamento local de estilos para evitar conflitos de CSS |
| **Bootstrap 5** | Framework para grid responsivo e alinhamento de layout |
| **JavaScript (ES6+)** | Lógica da aplicação e manipulação imutável de arrays/objetos |

---

## 📂 Estrutura de Pastas e Arquivos

```text
jogo-da-velha/
├── public/
├── src/
│   ├── assets/              # Imagens e ícones estáticos
│   ├── components/          # Componentes reutilizáveis da aplicação
│   │   ├── Board/
│   │   │   ├── Board.jsx
│   │   │   └── Board.module.css
│   │   ├── Square/
│   │   │   ├── Square.jsx
│   │   │   └── Square.module.css
│   │   ├── StatusPanel/
│   │   │   ├── StatusPanel.jsx
│   │   │   └── StatusPanel.module.css
│   │   └── HistoryList/
│   │       ├── HistoryList.jsx
│   │       └── HistoryList.module.css
│   ├── utils/               # Funções utilitárias e regras matemáticas
│   │   └── calculateWinner.js
│   ├── styles/              # Estilos globais e variáveis
│   │   ├── _variables.css
│   │   └── global.css
│   ├── App.jsx              # Componente principal (Game)
│   ├── main.jsx             # Ponto de entrada da aplicação React
│   └── App.module.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Ter o **Node.js** (versão 18 ou superior) e o **npm** ou **yarn** instalados na sua máquina.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/jogo-da-velha-react.git
   ```

2. **Acessar a pasta do projeto:**
   ```bash
   cd jogo-da-velha-react
   ```

3. **Instalar as dependências:**
   ```bash
   npm install
   ```

4. **Executar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acessar a aplicação:**
   Abra o navegador no endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 🧩 Componentes do Projeto

### `Game` (Componente Pai / Container)
- **Função:** Gerencia o estado global da partida (`history`, `currentMove`), controla a alternância de turnos e orquestra a renderização do tabuleiro e do histórico.

### `Board` (Tabuleiro)
- **Função:** Renderiza os 9 quadrados da grade utilizando o componente `Square` e gerencia as chamadas do evento de clique.

### `Square` (Célula / Botão)
- **Função:** Representa uma posição individual do tabuleiro (`X`, `O` ou vazio), disparando a função recebida via `props`.

### `StatusPanel` (Painel de Status)
- **Função:** Exibe informações claras sobre de quem é a vez, quem venceu a partida ou se houve empate.

### `HistoryList` (Histórico de Jogadas)
- **Função:** Renderiza a lista de botões que permite navegar ("viajar no tempo") pelas jogadas anteriores.

---

## 👨‍💻 Desenvolvimento e Estratégia de Refatoração

Durante o desenvolvimento deste projeto, adotamos a seguinte estratégia:

1. **Desmembramento do Código Monolítico:**
   O tutorial oficial fornece todo o código em um único arquivo. A primeira grande decisão foi isolar as responsabilidades em arquivos e pastas próprios.
2. **Adocação do CSS Modules com BEM:**
   Garantimos que nenhum estilo vazasse entre os componentes. Usamos classes no padrão `.bloco__elemento--modificador`.
3. **Abstração de Utilitários:**
   A função `calculateWinner` foi movida para uma pasta `utils/`, mantendo os componentes focados puramente em interface e renderização.

---

## 👩‍🏫 Orientação e Créditos

Desenvolvido como projeto prático do **Curso Técnico em Desenvolvimento de Sistemas**.

- **Aluna(o):** Manuely Cândido
- **Mentoria/Professora:**  — Professora Especialista em Front-end  
- **Referência:** Documentação Oficial do React — [Tutorial: Tic-Tac-Toe](https://pt-br.react.dev/learn/tutorial-tic-tac-toe)
