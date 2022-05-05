import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Cat Browser</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Home />
        </Container>
      </div>
    </BrowserRouter>

  );
}

export default App;
