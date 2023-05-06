import Navbar from "./components/navbar";
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap'
import './css/style.css';


function App() {

  return (
    <div className='App'>

      {/* Foi inserido a Navbar antes mesmo do container, pois é nesta posição pra ficar
      Minuto: 18:20 do vídeo matheus battisti */}

      <Navbar></Navbar>

      <Container className="my-3 p-5 bg-white rounded shadow-sm">

        <Outlet></Outlet>

      </Container>

    </div>

  )
}

export default App
