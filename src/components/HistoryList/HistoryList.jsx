import styles from './HistoryList.module.css';

/**
 * Componente HistoryList (Histórico de Jogadas)
 * 
 * Função: Exibir a lista de movimentos da partida através de uma lista ordenada (<ol>),
 * permitindo ao jogador retornar a qualquer momento do jogo (Viagem no Tempo).
 * 
 * Props:
 * - history (array): Array contendo os estados anteriores do tabuleiro.
 * - currentMove (number): Índice do movimento atualmente selecionado.
 * - onJumpTo (function): Função executada ao clicar no botão de um movimento anterior.
 */
export default function HistoryList({ history, currentMove, onJumpTo }) {
  return (
    <div className={styles.history}>
      <h3 className={styles.history__title}>📜 Histórico de Jogadas</h3>
      
      <ol className={styles.history__list}>
        {history.map((_, move) => {
          // Define a descrição textual dependendo da posição do movimento
          const description = move > 0 ? `Ir para a jogada #${move}` : 'Ir para o início do jogo';
          const isCurrent = move === currentMove;

          return (
            <li key={move} className={styles.history__item}>
              <button
                className={`btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-outline-secondary'} ${styles.history__button} w-100`}
                onClick={() => onJumpTo(move)}
              >
                {isCurrent ? `📍 Você está na jogada #${move}` : description}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}