import styles from './GameModeSelector.module.css';

/**
 * Componente GameModeSelector
 * 
 * Função: Exibir os botões de seleção de modo de jogo (Partida Única, Melhor de 3, Melhor de 5)
 * e permitir que o jogador selecione a meta de vitórias da série.
 * 
 * Props:
 * - selectedMode (number): O modo atualmente selecionado (1, 3 ou 5).
 * - onSelectMode (function): Função enviada pelo Game para atualizar o modo no estado principal.
 * - disabled (boolean): Bloqueia a alteração do modo caso a série/partida já tenha começado.
 */
export default function GameModeSelector({ selectedMode, onSelectMode, disabled }) {
  // Lista dos modos disponíveis no jogo
  const modes = [
    { label: 'Partida Única', value: 1, winsNeeded: 1 },
    { label: 'Melhor de 3', value: 3, winsNeeded: 2 },
    { label: 'Melhor de 5', value: 5, winsNeeded: 3 },
  ];

  return (
    <div className={styles.selector}>
      <h3 className={styles.selector__title}>⚙️ Modo de Jogo</h3>
      <div className={styles.selector__buttons}>
        {modes.map((mode) => {
          // Verifica se este botão é o modo selecionado atualmente
          const isSelected = selectedMode === mode.value;

          // Define as classes dinamicamente via CSS Modules
          const buttonClass = `${styles.selector__button} ${
            isSelected ? styles['selector__button--active'] : ''
          }`;

          return (
            <button
              key={mode.value}
              className={buttonClass}
              onClick={() => onSelectMode(mode.value)}
              disabled={disabled} // Impede mudar de modo no meio da série
            >
              {mode.label}
            </button>
          );
        })}
      </div>
      <p className={styles.selector__info}>
        {selectedMode === 1
          ? '🎯 Vence quem ganhar a partida atual.'
          : `🏆 Vence quem alcançar ${Math.ceil(selectedMode / 2)} vitórias primeiro.`}
      </p>
    </div>
  );
}