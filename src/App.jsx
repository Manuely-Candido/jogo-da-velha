// src/App.jsx
import Game from './components/Game/Game';
import './App.css'; // Estilos globais do fundo azul
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente Raiz da Aplicação
 * Responsável apenas por renderizar o orquestrador do jogo (Game)
 */
export default function App() {
  return (
  <div className="app-container">
      <Game />
  </div>
  );
}
