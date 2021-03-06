import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <section className="h-screen">
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </section>
  );
}

export default App;
