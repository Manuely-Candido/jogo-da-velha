import { useState } from 'react';
import Board from '../Board/Board';
import StatusPanel from '../StatusPanel/StatusPanel';
import HistoryList from '../HistoryList/HistoryList';
import StartScreen from '../StartScreen/StartScreen'; // <-- 1. Importamos a Tela Inicial

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
    if (
      squares[a] &&
      squares[a] !== '🛡️' &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default function Game() {
  // 0. Estado de Navegação da Tela ('menu' ou 'playing')
  const [screen, setScreen] = useState('menu');

  // 1. Estado do Modo de Jogo e Regra de Vitórias
  const [gameMode, setGameMode] = useState(1); 
  const targetWins = Math.ceil(gameMode / 2); 

  // 2. Estado do Histórico e Movimento Atual
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // 3. Estados dos Escudos
  const [shieldActive, setShieldActive] = useState(false);
  const [xShieldUsed, setXShieldUsed] = useState(false);
  const [oShieldUsed, setOShieldUsed] = useState(false);
  const [protectedSquare, setProtectedSquare] = useState(null);

  // 4. Estados do Placar Geral
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  // Derivações de Estado
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winningInfo = calculateWinner(currentSquares);
  const winner = winningInfo ? winningInfo.winner : null;
  const winningLine = winningInfo ? winningInfo.line : [];

  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const isMatchOver = Boolean(winner || isDraw);

  // Verifica se a série teve um grande campeão
  const seriesWinner = xWins >= targetWins ? 'X' : oWins >= targetWins ? 'O' : null;
  const isSeriesOver = Boolean(seriesWinner);

  // Texto dinâmico de status
  let statusText = '';
  if (seriesWinner) {
    statusText = `🏆 CAMPEÃO DA SÉRIE: JOGADOR ${seriesWinner}! 🎉`;
  } else if (winner) {
    statusText = `🎉 Rodada Vencida por: Jogador ${winner}!`;
  } else if (isDraw) {
    statusText = '👵 Empate na rodada! Deu Velha!';
  } else {
    statusText = `Turno atual: Jogador ${isXNext ? 'X' : 'O'}`;
  }

  /**
   * Manipulador: Início da Partida vindo da StartScreen
   */
  function handleStartGame(selectedMode) {
    setGameMode(selectedMode);
    handleResetAll();   // Reinicia placares
    setScreen('playing'); // Alterna para a tela do jogo!
  }

  /**
   * Manipulador: Voltar para o Menu Inicial
   */
  function handleBackToMenu() {
    handleResetAll();
    setScreen('menu');
  }

  /**
   * Manipulador: Ativação do Poder de Escudo
   */
  function handleActivateShield() {
    setShieldActive(!shieldActive);
  }

  /**
   * Manipulador: Realização de Jogada
   */
  function handlePlay(i) {
    if (isSeriesOver || isMatchOver || currentSquares[i] !== null || protectedSquare === i) {
      return;
    }

    const nextSquares = currentSquares.slice();
    let nextProtectedSquare = null;

    if (shieldActive) {
      nextSquares[i] = '🛡️';
      nextProtectedSquare = i;
      if (isXNext) {
        setXShieldUsed(true);
      } else {
        setOShieldUsed(true);
      }
      setShieldActive(false);
    } else {
      nextSquares[i] = isXNext ? 'X' : 'O';
    }

    setProtectedSquare(nextProtectedSquare);

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Avaliação de Placar
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
    setProtectedSquare(null);
    setShieldActive(false);
  }

  /**
   * Manipulador: Próxima Rodada
   */
  function handleNextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShieldActive(false);
    setXShieldUsed(false);
    setOShieldUsed(false);
    setProtectedSquare(null);
  }

  /**
   * Manipulador: Reiniciar Série Completa
   */
  function handleResetAll() {
    handleNextRound();
    setXWins(0);
    setOWins(0);
    setDraws(0);
  }

  // --- RENDERIZAÇÃO CONDICIONAL DE TELAS ---

  // 1. Exibe a Tela Inicial se estiver no estado 'menu'
  if (screen === 'menu') {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  // 2. Exibe o Tabuleiro e Painéis se estiver no estado 'playing'
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary btn-sm" onClick={handleBackToMenu}>
          ⬅️ Voltar ao Menu
        </button>
        <h1 className="text-center mb-4 mt-3 mt-md-0">🎮 Jogo da Velha com Poder Especial</h1>
        <div style={{ width: '100px' }}></div> {/* Espaçador visual */}
      </div>

      <div className="row justify-content-center align-items-start g-4">
        {/* Painel de Status */}
        <div className="col-12 col-lg-4 d-flex justify-content-center">
          <StatusPanel
            statusText={statusText}
            onActivateShield={handleActivateShield}
            shieldActive={shieldActive}
            xShieldUsed={xShieldUsed}
            oShieldUsed={oShieldUsed}
            isXNext={isXNext}
            isGameOver={isMatchOver || isSeriesOver}
            onReset={isSeriesOver ? handleResetAll : handleNextRound}
            xWins={xWins}
            oWins={oWins}
            draws={draws}
          />
        </div>

        {/* Tabuleiro */}
        <div className="col-12 col-lg-4 d-flex justify-content-center">
          <Board
            squares={currentSquares}
            onPlay={handlePlay}
            protectedSquare={protectedSquare}
            winningLine={winningLine}
          />
        </div>

        {/* Histórico */}
        <div className="col-12 col-lg-4 d-flex justify-content-center">
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