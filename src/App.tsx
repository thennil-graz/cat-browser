import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home'
import './App.css';
import Cat from './components/Cat';

function App() {
  return (
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
          <Route path="/:id" element={<Cat />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}
export default App;
