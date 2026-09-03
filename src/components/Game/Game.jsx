import { useState } from 'react';
import Board from '../Board/Board';
import StatusPanel from '../StatusPanel/StatusPanel';
import HistoryList from '../HistoryList/HistoryList';
import styles from './Game.module.css';
// import styles from './App.module.css'; // ou o CSS Module de layout do Game

/**
 * Função Auxiliar: calculateWinner
 * Avalia se há uma trinca vitoriosa no tabuleiro (3 símbolos idênticos).
 * Nota: Marcadores de escudo ('🛡️') não contam para a trinca!
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6],          // Diagonais
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Verifica se a célula possui valor e se todas as 3 são iguais (excluindo o escudo puro)
    if (
      squares[a] &&
      squares[a] !== '🛡️' &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
    // Retorna tanto o símbolo do vencedor quanto os 3 índices vitoriosos
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default function Game() {
  // 1. Estado do Histórico: Matriz que guarda o tabuleiro de cada rodada
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // 2. Estado do Movimento Atual: Índice do histórico em que estamos no momento
  const [currentMove, setCurrentMove] = useState(0);

  // 3. Estados dos Escudos
  const [shieldActive, setShieldActive] = useState(false); // Flag de intenção do poder
  const [xShieldUsed, setXShieldUsed] = useState(false);     // Se X já gastou seu escudo
  const [oShieldUsed, setOShieldUsed] = useState(false);     // Se O já gastou seu escudo
  const [protectedSquare, setProtectedSquare] = useState(null); // Índice da célula imune

  // 4. Estados do Placar de Vitórias
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  // Derivações de Estado (Valores calculados durante a renderização)
  const isXNext = currentMove % 2 === 0; // Turnos pares são do X, ímpares do O[cite: 1]
  const currentSquares = history[currentMove]; // Tabuleiro do momento atual[cite: 1]
  
  // Identifica o vencedor e a linha vitoriosa (array com os 3 índices)
  const winningInfo = calculateWinner(currentSquares);
  const winner = winningInfo ? winningInfo.winner : null;
  const winningLine = winningInfo ? winningInfo.line : [];
  
  // Verifica se o tabuleiro está cheio sem vencedores (Empate / Velha)[cite: 1]
  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const isGameOver = Boolean(winner || isDraw);

  // Definição dinâmica do texto de status para o StatusPanel
  let statusText = '';
  if (winner) {
    statusText = `🏆 Vencedor: Jogador ${winner}!`;
  } else if (isDraw) {
    statusText = '👵 Empate! Deu Velha!';
  } else {
    statusText = `Turno atual: Jogador ${isXNext ? 'X' : 'O'}`;
  }

  /**
   * Manipulador: Ativação do Poder de Escudo
   */
  function handleActivateShield() {
    // Alterna a intenção de usar o escudo para a próxima jogada
    setShieldActive(!shieldActive);
  }

  /**
   * Manipulador: Realização de Jogada (Disparado quando uma célula é clicada)
   */
  function handlePlay(i) {
    // REGRA DE SEGURANÇA: Cancela a jogada se o jogo acabou, se a célula já tá ocupada
    // ou se a célula clicada está sob efeito do Escudo de proteção do oponente!
    if (isGameOver || currentSquares[i] !== null || protectedSquare === i) {
      return;
    }

    // Cria uma cópia imutável do tabuleiro atual
    const nextSquares = currentSquares.slice();
    let nextProtectedSquare = null;

    if (shieldActive) {
      // Aplica a mecânica do Escudo
      nextSquares[i] = '🛡️';
      nextProtectedSquare = i; // Define a célula atual como imune

      // Consome o poder único do jogador corrente
      if (isXNext) {
        setXShieldUsed(true);
      } else {
        setOShieldUsed(true);
      }
      setShieldActive(false); // Reseta o botão de intenção do escudo
    } else {
      // Jogada normal de preenchimento ('X' ou 'O')
      nextSquares[i] = isXNext ? 'X' : 'O';
    }

    // Atualiza a posição imune (reseta a proteção na rodada seguinte se não usou escudo)
    setProtectedSquare(nextProtectedSquare);

    // Trunca o histórico caso o jogador tenha feito uma viagem no tempo e jogado a partir dali
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // --- ATUALIZAÇÃO DO PLACAR ---
    const newWinningInfo = calculateWinner(nextSquares);
    const newWinner = newWinningInfo ? newWinningInfo.winner : null;
    const newIsDraw = !newWinner && nextSquares.every((sq) => sq !== null);

    if (newWinner === 'X') {
      setXWins((prev) => prev + 1);
    } else if (newWinner === 'O') {
      setOWins((prev) => prev + 1);
    } else if (newIsDraw) {
      setDraws((prev) => prev + 1);
    }
  }

  /**
   * Manipulador: Viagem no Tempo (Time Travel)
   */
  function handleJumpTo(nextMove) {
    setCurrentMove(nextMove);
    // Ao voltar no tempo, removemos a proteção do escudo no tabuleiro
    setProtectedSquare(null);
    setShieldActive(false);
  }

  /**
   * Manipulador: Reiniciar Partida
   */
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShieldActive(false);
    setXShieldUsed(false);
    setOShieldUsed(false);
    setProtectedSquare(null);
  }

  return (
    <div className={styles.gameCard}>
    <h1 className={styles.gameCard__title}>Jogo da Velha com Poder Especial</h1>
   
    <div className="row justify-content-center align-items-start g-4">
      {/* Coluna Esquerda (Mais estreita: col-md-3) com 2 containers empilhados */}
      <div className="col-12 col-md-3 d-flex flex-column gap-3">
        <StatusPanel
          statusText={statusText}
          onActivateShield={handleActivateShield}
          shieldActive={shieldActive}
          xShieldUsed={xShieldUsed}
          oShieldUsed={oShieldUsed}
          isXNext={isXNext}
          isGameOver={isGameOver}
          onReset={handleReset}
          xWins={xWins}
          oWins={oWins}
          draws={draws}
        />
      </div>

      {/* Coluna Central (Maior destaque: col-md-6) */}
      <div className="col-12 col-md-6 d-flex justify-content-center">
        <Board
          squares={currentSquares}
          onPlay={handlePlay}
          protectedSquare={protectedSquare}
          winningLine={winningLine}
        />
      </div>

      {/* Coluna Direita (Histórico: col-md-3) */}
      <div className="col-12 col-md-3 d-flex justify-content-center">
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