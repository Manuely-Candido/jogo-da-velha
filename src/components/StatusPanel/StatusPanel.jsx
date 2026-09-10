import styles from './StatusPanel.module.css';

/**
 * Componente StatusPanel
 * 
 * Exibe o status da rodada (Turno ou Vitória/Empate),
 * o Placar Geral em formato de lista vertical e os controles do Poder Especial.
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
      {/* 1. TOPO: Alterna entre a mensagem de Fim de Jogo e o Turno Atual */}
      {isGameOver ? (
        <div className="w-100 p-3 bg-success text-white rounded-3 text-center shadow-sm fw-bold">
          {statusText}
        </div>
      ) : (
        <div className="w-100">
          <small className="text-uppercase text-muted fw-bold d-block mb-1 fs-7">
            TURNO ATUAL
          </small>
          <div className="d-flex align-items-center p-3 bg-light rounded-3 border">
            <div 
              className="rounded-circle bg-white border border-primary text-primary d-flex align-items-center justify-content-center me-3 shadow-sm"
              style={{ width: '42px', height: '42px', fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              {isXNext ? 'X' : 'O'}
            </div>
            <div className="text-start">
              <strong className="d-block text-primary fs-6">Jogador {isXNext ? 'X' : 'O'}</strong>
              <small className="text-muted fs-7">Sua vez</small>
            </div>
          </div>
        </div>
      )}

      {/* 2. PLACAR EM LISTA VERTICAL (Exatamente como o do seu print!) */}
      <div className="w-100 p-3 bg-light rounded-3 border my-3">
        <small className="text-uppercase text-muted fw-bold d-block mb-3 fs-7">
          PLACAR
        </small>
        
        <div className="d-flex flex-column gap-2">
          {/* Linha Jogador X */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <strong className="text-primary fs-6" style={{ width: '15px' }}>X</strong>
              <span className="text-secondary small">Vitórias</span>
            </div>
            <strong className="text-primary fs-6">{xWins}</strong>
          </div>

          {/* Linha Jogador O */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <strong className="text-danger fs-6" style={{ width: '15px' }}>O</strong>
              <span className="text-secondary small">Vitórias</span>
            </div>
            <strong className="text-primary fs-6">{oWins}</strong>
          </div>

          {/* Linha Empates */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <strong className="text-secondary fs-6" style={{ width: '15px' }}>=</strong>
              <span className="text-secondary small">Empates</span>
            </div>
            <strong className="text-primary fs-6">{draws}</strong>
          </div>
        </div>
      </div>

      {/* 3. PODER ESPECIAL (ESCUDO) */}
      <div className="w-100">
        <small className="text-uppercase text-muted fw-bold d-block mb-1 fs-7">
          PODER ESPECIAL
        </small>
        <button
          type="button"
          className={`btn ${shieldActive ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2 py-2 fw-semibold`}
          onClick={onActivateShield}
          disabled={isGameOver || currentShieldUsed}
        >
          {shieldActive ? '🛡️ Escudo Pronto!' : '🛡️ Ativar Escudo'}
        </button>
        <div className="small text-muted ps-1">
          <div>Jogador X: {xShieldUsed ? '❌ Usado' : '✅ Disponível'}</div>
          <div>Jogador O: {oShieldUsed ? '❌ Usado' : '✅ Disponível'}</div>
        </div>
      </div>

      {/* 4. BOTÃO DE REINICIAR */}
      <button
        type="button"
        className="btn btn-dark w-100 mt-3 py-2 fw-semibold"
        onClick={onReset}
      >
        🔄 Reiniciar Partida
      </button>
    </div>
  );
}