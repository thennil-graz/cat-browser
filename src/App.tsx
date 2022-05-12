import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home'
import './App.css';
import Cat from './components/Cat';
import { BreedProvier } from './components/BreedContext';

function App() {
  return (
    <BreedProvier>
      <div className="App">
        <BrowserRouter>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>
                <NavLink to="/">Cat Browser</NavLink>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/?breed=:breedId" element={<Home />} />
            <Route path="/:catId" element={<Cat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BreedProvier>
  );
}
export default App;
