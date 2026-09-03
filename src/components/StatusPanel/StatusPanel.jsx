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


/**
 * Componente StatusPanel Refatorado
 * 
 * Função: Renderiza a interface do painel dividida em dois blocos (cards)
 * independentes para melhor distribuição visual e aproveitamento de espaço.
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
  // Verifica se o jogador do turno atual já gastou seu escudo
  const currentShieldUsed = isXNext ? xShieldUsed : oShieldUsed;

  return (
    <div className={styles.panelGroup}>

      {/* 1. CARD SUPERIOR: Turno Atual + Placar Geral */}
      <div className={styles.card}>
        {/* SEÇÃO 1: TURNO ATUAL */}
        <div className={styles.card__section}>
          <span className={styles.card__label}>TURNO ATUAL</span>
          <div className={styles.turnBox}>
            <div className={styles.turnBox__avatar}>
              {isXNext ? 'X' : 'O'}
            </div>
            <div className={styles.turnBox__info}>
              <strong>Jogador {isXNext ? 'X' : 'O'}</strong>
              <small>Sua vez</small>
            </div>
          </div>
        </div>


        {/* SEÇÃO 2: PLACAR */}
        <div className={styles.card__section}>
          <span className={styles.card__label}>PLACAR</span>
          <div className={styles.scoreList}>
            <div className={styles.scoreRow}>
              <div className={styles.scoreRow__player}>
                <span className={styles.scoreRow__symbolX}>X</span>
                <span>Vitórias</span>
              </div>
              <strong className={styles.scoreRow__value}>{xWins}</strong>
            </div>

            <div className={styles.scoreRow}>
              <div className={styles.scoreRow__player}>
                <span className={styles.scoreRow__symbolO}>O</span>
                <span>Vitórias</span>
              </div>
              <strong className={styles.scoreRow__value}>{oWins}</strong>
            </div>

            <div className={styles.scoreRow}>
              <div className={styles.scoreRow__player}>
                <span className={styles.scoreRow__symbolDraw}>=</span>
                <span>Empates</span>
              </div>
              <strong className={styles.scoreRow__value}>{draws}</strong>
            </div>
          </div>
        </div>

        {/* 2. CARD INFERIOR: Poder Especial (Escudo) + Ações */}
        <div className={styles.card}>
          <div className={styles.card__powers}>
            <span className="fw-bold text-uppercase text-secondary small">Poder Especial</span>

            {/* Botão de Ativação do Escudo */}
            <button
              className={`btn ${shieldActive ? 'btn-warning' : 'btn-outline-warning'} w-100 py-2 fw-semibold`}
              onClick={onActivateShield}
              disabled={isGameOver || currentShieldUsed}
            >
              {shieldActive ? '🛡️ Escudo Ativo! Clique no Tabuleiro' : '🛡️ Ativar Escudo'}
            </button>

            {/* Status de Disponibilidade do Escudo para cada jogador */}
            <div className={styles['card__power-info']}>
              <small>Jogador X: <strong>{xShieldUsed ? '❌ Usado' : '✅ Disponível'}</strong></small>
              <br />
              <small>Jogador O: <strong>{oShieldUsed ? '❌ Usado' : '✅ Disponível'}</strong></small>
            </div>
          </div>

          {/* Botão de Reiniciar a Partida */}
          <button
            className="btn btn-dark w-100 mt-2 py-2 fw-semibold"
            onClick={onReset}
          >
            🔄 Reiniciar Partida
          </button>
        </div>
      </div>
    </div>
  );
}