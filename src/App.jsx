import Navbar from "./components/navbar";
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap'
import { AuthProvider } from './context/AuthProvider';
import { getUserLocalStorage } from "./context/AuthProvider/util";

function App() {

  const user = getUserLocalStorage();

  // console.log(JSON.stringify(user?.token));

  if (user?.token) {

    // console.log("Verdadeiro: ", user?.token);
    return (

      <div className='App app'>

        <AuthProvider>

          <Navbar></Navbar>
          <Container className="my-3 px-4 py-4 bg-white rounded shadow-sm">
            <Outlet></Outlet>
          </Container>

        </AuthProvider>

      </div>

    )

  } else {

    // console.log("Falso ID ", user?.token);
    return (

      <div className='App'>
        <AuthProvider>

          <Container className="my-3 px-4 py-4 bg-white rounded shadow-sm">
            <Outlet></Outlet>
          </Container>
        </AuthProvider>

      </div>
    )
  }



}

export default App
