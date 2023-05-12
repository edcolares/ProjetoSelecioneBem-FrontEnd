import Navbar from "./components/navbar";
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap'

function App() {

  return (
    <div className='App'>

      <Navbar></Navbar>

      <Container className="my-3 px-4 py-4 bg-white rounded shadow-sm">

        <Outlet></Outlet>

      </Container>

    </div>

  )
}

export default App
