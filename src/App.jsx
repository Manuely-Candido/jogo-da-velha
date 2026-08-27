import { useState } from 'react';
// Importação dos nossos componentes modulares e reutilizáveis
import Board from './components/Board/Board';
import StatusPanel from './components/StatusPanel/StatusPanel';
import HistoryList from './components/HistoryList/HistoryList';

// Importação do CSS do Bootstrap para o layout de grid
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Função Auxiliar: calculateWinner
 * Percorre as 8 combinações possíveis de vitória.
 * O marcador de Escudo ('🛡️') é ignorado na contagem da trinca vitoriosa.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Valida se a célula tem um valor, se não é um escudo, e se as 3 posições são idênticas
    if (
      squares[a] &&
      squares[a] !== '🛡️' &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]; // Retorna o vencedor ('X' ou 'O')
    }
  }
  return null;
}

export default function App() {
  // 1. Histórico de estados do tabuleiro (inicia com 9 posições vazias)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // 2. Índice da jogada atual
  const [currentMove, setCurrentMove] = useState(0);

  // 3. Controle da intenção de uso do Escudo para o próximo clique
  const [shieldActive, setShieldActive] = useState(false);

  // 4. Controle de uso único do Escudo por jogador
  const [xShieldUsed, setXShieldUsed] = useState(false);
  const [oShieldUsed, setOShieldUsed] = useState(false);

  // Variáveis Derivadas (calculadas dinamicamente a cada renderização)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const isGameOver = Boolean(winner) || isDraw;

  // Descobre qual célula possui um Escudo no tabuleiro exibido no momento (se houver)
  const protectedSquare = currentSquares.findIndex((square) => square === '🛡️');

  /**
   * Trata o clique do jogador sobre uma célula 'i'
   */
  function handlePlay(i) {
    // Impedimentos: partida finalizada ou célula já ocupada por símbolo
    if (isGameOver || currentSquares[i] === 'X' || currentSquares[i] === 'O') {
      return;
    }

    // Regra do Escudo: impede o adversário de clicar na célula protegida
    if (protectedSquare === i) {
      alert('Esta célula está sob proteção do Escudo! Escolha outra posição.');
      return;
    }

    // Cria cópia imutável do tabuleiro atual
    const nextSquares = currentSquares.slice();

    // Executa jogada com Escudo
    if (shieldActive) {
      nextSquares[i] = '🛡️';
      setShieldActive(false); // Consome a intenção de ativação

      // Registra que o jogador do turno usou o seu único poder
      if (xIsNext) {
        setXShieldUsed(true);
      } else {
        setOShieldUsed(true);
      }
    } else {
      // Jogada convencional
      nextSquares[i] = xIsNext ? 'X' : 'O';
    }

    // Atualiza o histórico de jogadas
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * Alterna a intenção do botão de Escudo no painel
   */
  function handleActivateShield() {
    setShieldActive(!shieldActive);
  }

  /**
   * Função para navegação no histórico (Time Travel)
   */
  function handleJumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /**
   * Reseta a partida para o estado de origem
   */
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShieldActive(false);
    setXShieldUsed(false);
    setOShieldUsed(false);
  }

  // Definição da mensagem exibida no painel
  let statusText = '';
  if (winner) {
    statusText = `🏆 Vencedor: Jogador ${winner}!`;
  } else if (isDraw) {
    statusText = '🤝 Empate (Deu Velha)!';
  } else {
    statusText = `Turno atual: Jogador ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🎮 Jogo da Velha com Poder Especial</h1>

      <div className="row justify-content-center g-4">
        {/* Painel de Status e Ações */}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <StatusPanel
            statusText={statusText}
            onActivateShield={handleActivateShield}
            shieldActive={shieldActive}
            xShieldUsed={xShieldUsed}
            oShieldUsed={oShieldUsed}
            isXNext={xIsNext}
            isGameOver={isGameOver}
            onReset={handleReset}
          />
        </div>

        {/* Tabuleiro do Jogo */}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <Board
            squares={currentSquares}
            onPlay={handlePlay}
            protectedSquare={protectedSquare}
          />
        </div>

        {/* Histórico de Jogadas (Time Travel) */}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <HistoryList
            history={history}
            currentMove={currentMove}
            onJumpTo={handleJumpTo}
          />
        </div>
      </div>
    </div>
  );
}
