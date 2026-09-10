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
  const currentShieldUsed = isXNext ? xShieldUsed : oShieldUsed;

  return (
    <div className={styles.panel}>
      {/* 1. SE O JOGO ACABOU: Mostra a faixa com o statusText (Vencedor / Empate / Campeão) */}
      {isGameOver ? (
        <div className="w-100 p-3 bg-success text-white rounded text-center shadow-sm fw-bold fs-5">
          {statusText}
        </div>
      ) : (
        /* 2. SE O JOGO ESTÁ ROLANDO: Mostra o cartão do Turno Atual que você já criou */
        <div className={styles.panel__turn}>
          <small className="text-uppercase text-muted fw-bold d-block mb-1">TURNO ATUAL</small>
          <div className="d-flex align-items-center p-2 bg-light rounded border">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px', fontWeight: 'bold' }}>
              {isXNext ? 'X' : 'O'}
            </div>
            <div className="text-start">
              <strong className="d-block text-primary">Jogador {isXNext ? 'X' : 'O'}</strong>
              <small className="text-muted">Sua vez</small>
            </div>
          </div>
        </div>
      )}

      {/* PLACAR SÉRIE */}
      <div className="w-100 p-2 bg-light rounded border text-center my-2">
        <small className="text-uppercase text-muted fw-bold d-block mb-1">PLACAR</small>
        <div className="d-flex justify-content-around fw-bold">
          <span className="text-primary">X Vitórias: {xWins}</span>
          <span className="text-danger">O Vitórias: {oWins}</span>
          <span className="text-secondary">Empates: {draws}</span>
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
  );
}