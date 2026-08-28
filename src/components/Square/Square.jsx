import styles from './Square.module.css';

/**
 * Componente Square (Quadrado/Célula)
 * 
 * Função: Renderizar uma célula individual do tabuleiro do Jogo da Velha,
 * exibindo o valor atual ('X', 'O', '🛡️' ou null) e reagindo ao clique do usuário.
 * 
 * Props:
 * - value (string | null): Conteúdo exibido dentro do botão.
 * - onSquareClick (function): Função executada ao clicar na célula (elevação de estado).
 * - isProtected (boolean): Indica se a célula está sob proteção do Escudo.
 */
export default function Square({ value, onSquareClick, isProtected, isWinningSquare }) {
  // Define dinamicamente as classes de estilo usando CSS Modules
  const squareClasses = `${styles.square} ${isProtected ? styles['square--protected'] : ''} ${isWinningSquare ? styles['square--winning'] : ''}`.trim();

  return (
    <button 
      className={squareClasses} 
      onClick={onSquareClick}
      aria-label="Célula do tabuleiro"
    >
      {value}
    </button>
  );
}