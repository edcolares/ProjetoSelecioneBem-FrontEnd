import Navbar from "./components/navbar";
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      {/* Foi inserido a Navbar antes mesmo do container, pois é nesta posição pra ficar
      Minuto: 18:20 do vídeo matheus battisti */}
      <Navbar></Navbar>
      <main className='container'>
        <Outlet></Outlet>
      </main>
    </div>


  )
}

export default App
