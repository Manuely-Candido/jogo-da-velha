import Square from '../Square/Square';
import styles from './Board.module.css';

/**
 * Componente Board (Tabuleiro)
 * 
 * Função: Renderizar o grid 3x3 do Jogo da Velha composto por 9 posições (Square),
 * repassando o estado de cada célula e interceptando as ações de clique do usuário.
 * 
 * Props:
 * - squares (array): Array com 9 posições contendo os valores do tabuleiro.
 * - onPlay (function): Função enviada pelo Game para atualizar o estado do tabuleiro.
 * - protectedSquare (number | null): Índice da célula que está protegida pelo Escudo no momento.
 */
export default function Board({ squares, onPlay, protectedSquare, winningLine = [] }) {

  // Função interna que trata o clique em um quadrado específico
  function handleClick(i) {
    // Repassa a intenção de jogada no índice 'i' para o componente pai (Game)
    onPlay(i);
  }

  return (
    <div className={styles.board}>
      {/* Linha 1 */}
      <div className={styles.board__row}>
        <Square 
          value={squares[0]} 
          onSquareClick={() => handleClick(0)} 
          isProtected={protectedSquare === 0}
          isWinningSquare={winningLine.includes(0)} // <-- True se a posição 0 estiver na trinca
        />
        <Square 
          value={squares[1]} 
          onSquareClick={() => handleClick(1)} 
          isProtected={protectedSquare === 1}
          isWinningSquare={winningLine.includes(1)}
        />
        <Square 
          value={squares[2]} 
          onSquareClick={() => handleClick(2)} 
          isProtected={protectedSquare === 2}
          isWinningSquare={winningLine.includes(2)}
        />
      </div>

      {/* Linha 2 */}
      <div className={styles.board__row}>
        <Square 
          value={squares[3]} 
          onSquareClick={() => handleClick(3)} 
          isProtected={protectedSquare === 3}
          isWinningSquare={winningLine.includes(3)}
        />
        <Square 
          value={squares[4]} 
          onSquareClick={() => handleClick(4)} 
          isProtected={protectedSquare === 4}
          isWinningSquare={winningLine.includes(4)}
        />
        <Square 
          value={squares[5]} 
          onSquareClick={() => handleClick(5)} 
          isProtected={protectedSquare === 5}
          isWinningSquare={winningLine.includes(5)}
        />
      </div>

      {/* Linha 3 */}
      <div className={styles.board__row}>
        <Square 
          value={squares[6]} 
          onSquareClick={() => handleClick(6)} 
          isProtected={protectedSquare === 6}
          isWinningSquare={winningLine.includes(6)}
        />
        <Square 
          value={squares[7]} 
          onSquareClick={() => handleClick(7)} 
          isProtected={protectedSquare === 7}
          isWinningSquare={winningLine.includes(7)}
        />
        <Square 
          value={squares[8]} 
          onSquareClick={() => handleClick(8)} 
          isProtected={protectedSquare === 8}
          isWinningSquare={winningLine.includes(8)}
        />
      </div>
    </div>
  );
}