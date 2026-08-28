import styles from './StatusPanel.module.css';

/**
 * Componente StatusPanel
 * 
 * Função: Exibir a situação atual da partida (turno atual, vencedor ou empate)
 * e fornecer os controles de ação para ativação do Escudo e reinício do jogo.
 * 
 * Props:
 * - statusText (string): Mensagem de status informando a vez ou resultado.
 * - onActivateShield (function): Disparada ao clicar para ativar o Escudo.
 * - shieldActive (boolean): Indica se a intenção de usar o escudo está ligada para a próxima jogada.
 * - xShieldUsed (boolean): Indica se o jogador X já gastou seu escudo.
 * - oShieldUsed (boolean): Indica se o jogador O já gastou seu escudo.
 * - isXNext (boolean): Indica se a vez é do Jogador X.
 * - isGameOver (boolean): Indica se a partida terminou.
 * - onReset (function): Função para reiniciar o jogo.
 */
export default function StatusPanel({
  statusText,
  onActivateShield,
  shieldActive,
  xShieldUsed,
  oShieldUsed,
  isXNext,
  isGameOver,
  onReset,
  xWins = 0,
  oWins = 0,
  draws = 0
}) {
  // Verifica se o jogador atual já gastou seu único escudo
  const currentShieldUsed = isXNext ? xShieldUsed : oShieldUsed;

  return (
    <div className={styles.panel}>
      {/* Exibição do Status da Partida */}
      <h2 className={styles.panel__status}>{statusText}</h2>

      {/* Placar de Vitórias */}
      <div className="w-100 p-2 bg-light rounded text-center border">
        <h6 className="m-0 mb-1 fw-bold">🏆 Placar Geral</h6>
        <div className="d-flex justify-content-between text-muted small px-2">
          <span>X: <strong>{xWins}</strong></span>
          <span>Empates: <strong>{draws}</strong></span>
          <span>O: <strong>{oWins}</strong></span>
        </div>
      </div>

      {/* Controles de Poder Especial (Escudo) */}
      <div className={styles.panel__powers}>
        <button 
          className={`btn ${shieldActive ? 'btn-warning' : 'btn-outline-warning'} w-100`}
          onClick={onActivateShield}
          disabled={isGameOver || currentShieldUsed}
        >
          {shieldActive ? '🛡️ Escudo Pronto! Clique na Célula' : '🛡️ Ativar Escudo'}
        </button>

        <div className={styles['panel__power-info']}>
          <p className="m-0">Escudo X: {xShieldUsed ? '❌ Usado' : '✅ Disponível'}</p>
          <p className="m-0">Escudo O: {oShieldUsed ? '❌ Usado' : '✅ Disponível'}</p>
        </div>
      </div>

      {/* Botão de Reiniciar Partida */}
      <button 
        className="btn btn-secondary w-100 mt-2" 
        onClick={onReset}
      >
        🔄 Reiniciar Partida
      </button>
    </div>
  );
}