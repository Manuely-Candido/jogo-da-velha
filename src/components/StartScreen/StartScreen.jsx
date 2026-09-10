import { useState } from 'react';
import styles from './StartScreen.module.css';

/**
 * Componente StartScreen (Tela Inicial)
 * 
 * Função: Exibir a tela de boas-vindas, permitir que o jogador selecione
 * o modo de partida (Única, Melhor de 3, Melhor de 5) e iniciar o jogo.
 * 
 * Props:
 * - onStartGame (function): Função enviada pelo Game que recebe o modo selecionado
 *   e altera o estado para mudar a tela.
 */
export default function StartScreen({ onStartGame }) {
  // Estado local para armazenar qual modo o jogador escolheu (Padrão: 1 partida)
  const [selectedMode, setSelectedMode] = useState(1);

  // Função interna acionada ao clicar em "Iniciar Jogo"
  function handleStart() {
    // Dispara a função do pai repassando o modo escolhido
    onStartGame(selectedMode);
  }

  return (
    <div className={styles.startScreen}>
      <h1 className={styles.startScreen__title}> Jogo da Velha</h1>
      <p className={styles.startScreen__welcome}>
        Seja bem-vindo(a)! Escolha o modo de jogo para começar a partida:
      </p>

      {/* Opções de Seleção de Modo */}
      <div className={styles.startScreen__modes}>
        <button
          type="button"
          className={`btn ${selectedMode === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedMode(1)}
        >
          Partida Única
        </button>

        <button
          type="button"
          className={`btn ${selectedMode === 3 ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedMode(3)}
        >
          Melhor de 3
        </button>

        <button
          type="button"
          className={`btn ${selectedMode === 5 ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedMode(5)}
        >
          Melhor de 5
        </button>
      </div>

      {/* Botão de Iniciar */}
      <button
        type="button"
        className="btn btn-success btn-lg mt-4 px-5"
        onClick={handleStart}
      >
         Iniciar Jogo
      </button>
    </div>
  );
}