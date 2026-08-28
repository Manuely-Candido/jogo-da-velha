// src/App.jsx
import Game from './components/Game/Game';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente Raiz da Aplicação
 * Responsável apenas por renderizar o orquestrador do jogo (Game)
 */
export default function App() {
  return <Game />;
}
